 import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import JournalModel from '../../models/Journal'; // relative path based on where you are
 // We will create this next

export async function POST(req: Request) {
  try {
    const { prompt, userEmail } = await req.json(); // Also receive user info

    const geminiApiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
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
                  text: `Analyze the user's mood and give a supportive response in simple language:\n"${prompt}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await response.json();

    const aiReply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Sorry, something went wrong with the analysis.';

    // ✅ Connect to MongoDB
    await connectToDatabase();

    // ✅ Save to MongoDB
    await JournalModel.create({
      prompt,
      aiReply,
      userEmail: userEmail || 'anonymous',
      createdAt: new Date(),
    });

    return NextResponse.json({ message: aiReply });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Sorry, something went wrong with the analysis.' },
      { status: 500 }
    );
  }
}
