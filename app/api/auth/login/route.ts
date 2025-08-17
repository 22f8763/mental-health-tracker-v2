import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import rateLimit from '@/lib/rate-limit';

const prisma = new PrismaClient();

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max users per second
});

// Helper function to handle errors
function handleError(message: string, status: number) {
  console.error(`Login Error (${status}):`, message);
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return handleError('Email and password are required', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleError('Please enter a valid email address', 400);
    }

    // Apply rate limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    try {
      await limiter.check(10, ip); // 10 requests per minute per IP
    } catch (error) {
      return handleError('Too many login attempts. Please try again later.', 429);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Simulate delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('User not found:', email);
      return handleError('Invalid email or password', 401);
    }
    
    console.log('User found, checking password...');

    // Check if account is locked
    if (user.failedLoginAttempts >= 5) {
      const lastFailedAttempt = user.lastFailedLogin || new Date(0);
      const lockoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
      
      if (Date.now() - lastFailedAttempt.getTime() < lockoutDuration) {
        return NextResponse.json(
          { 
            message: 'Account locked. Please try again later.' 
          },
          { status: 429 }
        );
      } else {
        // Reset failed attempts if lockout period has passed
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            failedLoginAttempts: 0,
            lastFailedLogin: null 
          },
        });
      }
    }

    // Verify password
    let isPasswordValid = false;
    try {
      isPasswordValid = await compare(password, user.password);
    } catch (error) {
      console.error('Password comparison error:', error);
      return handleError('An error occurred during login', 500);
    }

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      // Increment failed login attempts
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            failedLoginAttempts: { increment: 1 },
            lastFailedLogin: new Date() 
          },
        });
      } catch (error) {
        console.error('Failed to update failed login attempts:', error);
      }

      return handleError('Invalid email or password', 401);
    }

    // Reset failed login attempts and update last login
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          failedLoginAttempts: 0,
          lastFailedLogin: null,
          lastLogin: new Date()
        },
      });
      console.log('Login successful for user:', user.id);
    } catch (error) {
      console.error('Failed to update user login info:', error);
      // Continue with login even if update fails
    }

    // Create JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return handleError('Server configuration error', 500);
    }

    try {
      const token = sign(
        { 
          userId: user.id, 
          email: user.email,
          name: user.name,
          role: user.role || 'user'
        },
        jwtSecret,
        { expiresIn: '1d' }
      );

      // Set secure HTTP-only cookie
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 24 * 60 * 60, // 1 day
        path: '/',
      };

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'user'
      };

      const response = NextResponse.json(
        { 
          message: 'Login successful',
          user: userData
        },
        { status: 200 }
      );

      // Set the cookie
      response.cookies.set('token', token, cookieOptions);

      // Add security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'same-origin');
      response.headers.set('Content-Security-Policy', "default-src 'self'");

      return response;
    } catch (error) {
      console.error('Token generation error:', error);
      return handleError('Failed to create authentication token', 500);
    }
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.message === 'Rate limit exceeded') {
      return handleError('Too many requests. Please try again later.', 429);
    }
    
    return handleError('An error occurred during login. Please try again.', 500);
  }
}
