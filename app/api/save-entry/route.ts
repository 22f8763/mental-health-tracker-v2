// app/api/save-entry/route.ts
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { entry, analysis } = await req.json()

    if (!entry || !analysis) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("mental-health")
    const collection = db.collection("journal-entries")

    const result = await collection.insertOne({
      entry,
      analysis,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (err) {
    console.error("Error saving entry:", err)
    return NextResponse.json({ error: "Failed to save entry" }, { status: 500 })
  }
}
