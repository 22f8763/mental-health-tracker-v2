 import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import mongoose from "mongoose"

// Optional: Define a schema and model if not already done
const journalEntrySchema = new mongoose.Schema({
  entry: String,
  analysis: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Prevent model overwrite on hot reload
const JournalEntry = mongoose.models.JournalEntry || mongoose.model("JournalEntry", journalEntrySchema)

export async function POST(req: Request) {
  try {
    const { entry, analysis } = await req.json()

    if (!entry || !analysis) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    await connectToDatabase()

    const newEntry = new JournalEntry({
      entry,
      analysis,
      createdAt: new Date(),
    })

    const result = await newEntry.save()

    return NextResponse.json({ success: true, id: result._id })
  } catch (err) {
    console.error("Error saving entry:", err)
    return NextResponse.json({ error: "Failed to save entry" }, { status: 500 })
  }
}
