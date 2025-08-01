 import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mental-health-db";

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is not defined in environment variables");
}

declare global {
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global.mongooseConn || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "mental-health-db",
    });
  }

  cached.conn = await cached.promise;
  global.mongooseConn = cached;
  return cached.conn;
}
