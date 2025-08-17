 import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import JournalModel from '../../models/Journal';

export async function POST(req: Request) {
  try {
    const { prompt, userEmail } = await req.json();

    // Input validation
    if (!prompt || prompt.trim().length < 5) {
      return NextResponse.json(
        { message: 'Please provide a valid journal entry.' },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found');
      return NextResponse.json(
        { message: 'AI service temporarily unavailable.' },
        { status: 500 }
      );
    }

    // ✅ SPEED OPTIMIZATION: Parallel execution
    const [geminiResponse, dbConnection] = await Promise.allSettled([
      // Fetch AI response
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a compassionate mental health companion. Analyze this journal entry and provide a supportive, insightful response in 2-3 short paragraphs. Focus on emotions, patterns, and gentle encouragement. Keep it concise but meaningful:\n\n"${prompt.trim()}"`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 300, // Limit response length for faster generation
            },
          }),
        }
      ),
      // Connect to database in parallel
      connectToDatabase()
    ]);

    // Handle Gemini API response
    if (geminiResponse.status === 'rejected') {
      console.error('Gemini API failed:', geminiResponse.reason);
      return NextResponse.json(
        { message: 'AI analysis temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    const geminiData = await geminiResponse.value.json();

    // Extract AI response with better error handling
    let aiReply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiReply) {
      console.error('No AI response received:', geminiData);
      aiReply = "I understand you're sharing something important. While I can't analyze this specific entry right now, remember that journaling itself is a valuable practice for mental wellness. Keep writing and expressing your thoughts.";
    }

    // Clean up the AI response
    aiReply = aiReply.trim();

    // ✅ SPEED OPTIMIZATION: Non-blocking database save
    // Save to database asynchronously (don't wait for it)
    if (dbConnection.status === 'fulfilled') {
      // Don't await this - let it run in background
      JournalModel.create({
        prompt: prompt.trim(),
        aiReply,
        userEmail: userEmail || 'anonymous',
        createdAt: new Date(),
        metadata: {
          promptLength: prompt.trim().length,
          responseLength: aiReply.length,
          model: 'gemini-2.0-flash'
        }
      }).catch(error => {
        console.error('Database save failed (non-blocking):', error);
        // Don't fail the request if DB save fails
      });
    } else {
      console.warn('Database connection failed, skipping save:', dbConnection.reason);
    }

    // Return response immediately
    return NextResponse.json({ 
      message: aiReply,
      metadata: {
        responseTime: Date.now(),
        wordCount: aiReply.split(' ').length
      }
    });

  } catch (error) {
    console.error('API route error:', error);
    
    // Return helpful error message based on error type
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { message: 'Unable to connect to AI service. Please check your connection and try again.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Something went wrong. Please try again in a moment.' },
      { status: 500 }
    );
  }
}

// ✅ SPEED OPTIMIZATION: Add caching headers for static responses
export async function GET() {
  return NextResponse.json(
    { message: 'Journal Analysis API is running' },
    { 
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    }
  );
}