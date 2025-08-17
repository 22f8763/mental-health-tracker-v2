"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

type User = {
  id: string;
  email: string;
  name: string;
  // Add other user fields as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const decoded = jwtDecode<{ userId: string; email: string; name: string; exp: number }>(token);
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            logout();
            return;
          }

          setUser({
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Set cookie with appropriate expiration
      const cookieOptions = {
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember me is checked
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
      };

      setCookie('token', data.token, cookieOptions);
      
      const decoded = jwtDecode<{ userId: string; email: string; name: string }>(data.token);
      setUser({
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Auto-login after registration
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear all auth cookies
    deleteCookie('token', { path: '/' });
    // Clear any other auth-related cookies
    
    // Clear user state
    setUser(null);
    
    // Redirect to login page
    router.push('/login');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        register, 
        logout, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
