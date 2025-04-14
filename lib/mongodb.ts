import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://divijaiwanth:Achieve%40500@librarydb.7zdup1v.mongodb.net/?retryWrites=true&w=majority&appName=libraryDB"
const MONGODB_DB = process.env.MONGODB_DB || "libraryDB"

// Check if we have a cached connection
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no cached connection, create a new one
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  if (!MONGODB_DB) {
    throw new Error("Please define the MONGODB_DB environment variable")
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(MONGODB_DB)

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}
