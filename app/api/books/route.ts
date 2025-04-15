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

export async function POST(bookMap: Map<string, any>) {
  try {
    // Validate book data from the Map
    if (
      !bookMap.get("title") ||
      !bookMap.get("author") ||
      !bookMap.get("isbn") ||
      !bookMap.get("genre") ||
      !bookMap.get("quantity")
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Convert the Map to an object for database insertion
    const bookObject = Object.fromEntries(bookMap);

    const result = await db.collection("books").insertOne({
      ...bookObject,
      addedDate: bookObject.addedDate || new Date().toISOString(),
    });

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...bookObject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}
