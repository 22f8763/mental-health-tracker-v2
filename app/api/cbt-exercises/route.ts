// app/api/cbt-exercises/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { CBTExercise } from '@/models/CBTExercise';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    const entry = await CBTExercise.create(data);

    return NextResponse.json({
      success: true,
      message: 'CBT exercise saved successfully',
      id: entry._id
    });
  } catch (error) {
    console.error('Error saving CBT exercise:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save CBT exercise' },
      { status: 500 }
    );
  }
}
