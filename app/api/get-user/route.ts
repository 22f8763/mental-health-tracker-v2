 import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is not defined in environment variables");
}

// Cache connection
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ name: user.name, email: user.email }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}
