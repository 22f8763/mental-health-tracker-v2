// app/api/save-user/route.ts
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email } = await req.json()

  try {
    await connectToDatabase()

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 })
    }

    const newUser = new User({ name, email })
    await newUser.save()

    return NextResponse.json({ message: 'User saved successfully' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error saving user' }, { status: 500 })
  }
}

