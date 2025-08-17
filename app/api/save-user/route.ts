 import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is not defined in environment variables");
}

// Cache connection in dev
let cached = (global as any).mongooseConn || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: "mental-health-db" });
  }
  cached.conn = await cached.promise;
  (global as any).mongooseConn = cached;
  return cached.conn;
}

// Inline schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: Request) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    return NextResponse.json(
      { message: "User saved successfully", user },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error saving user" }, { status: 500 });
  }
}
