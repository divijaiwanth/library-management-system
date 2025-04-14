import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title")
    const author = searchParams.get("author")
    const isbn = searchParams.get("isbn")
    const genre = searchParams.get("genre")

    // Build query based on provided parameters
    const query: Record<string, any> = {}

    if (title) {
      query.title = { $regex: title, $options: "i" }
    }

    if (author) {
      query.author = { $regex: author, $options: "i" }
    }

    if (isbn) {
      query.isbn = { $regex: isbn, $options: "i" }
    }

    if (genre) {
      query.genre = { $regex: genre, $options: "i" }
    }

    // If no search parameters provided, return empty array
    if (Object.keys(query).length === 0) {
      return NextResponse.json([])
    }

    const { db } = await connectToDatabase()
    const books = await db.collection("books").find(query).toArray()

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error searching books:", error)
    return NextResponse.json({ error: "Failed to search books" }, { status: 500 })
  }
}
