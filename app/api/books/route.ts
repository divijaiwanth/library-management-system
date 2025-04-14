import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const books = await db.collection("books").find({}).toArray()

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const book = await request.json()

    // Validate book data
    if (!book.title || !book.author || !book.isbn || !book.genre || !book.quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("books").insertOne({
      ...book,
      addedDate: book.addedDate || new Date().toISOString(),
    })

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...book,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding book:", error)
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}
