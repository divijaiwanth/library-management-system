"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/book-card"
import { AddBookDialog } from "@/components/add-book-dialog"
import { FilterDialog } from "@/components/filter-dialog"
import type { Book } from "@/lib/types"
import { GET, POST } from "../api/books/route"

export default function Rack() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const storedUsername = localStorage.getItem("username") || ""

    setIsLoggedIn(loggedIn)
    setUsername(storedUsername)

    if (!loggedIn) {
      router.push("/login")
    } else {
      fetchBooks()
    }
  }, [router])

  const fetchBooks = async () => {
    setIsLoading(true)
    try {
      const response = await GET();
      const data = await response.json()
      setBooks(data)
      setFilteredBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBook = async (newBook: Omit<Book, "_id">) => {
    try {
      // Convert the newBook object to a Map
      const bookMap = new Map(Object.entries(newBook));
  
      // Pass the Map to the POST function
      const response = await POST(bookMap);
  
      if (response.ok) {
        fetchBooks();
        setIsAddDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleRemoveBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchBooks()
      }
    } catch (error) {
      console.error("Error removing book:", error)
    }
  }

  const applyFilters = (filters: Record<string, any>) => {
    setActiveFilters(filters)

    let result = [...books]

    // Apply text filters
    if (filters.title) {
      result = result.filter((book) => book.title.toLowerCase().includes(filters.title.toLowerCase()))
    }

    if (filters.author) {
      result = result.filter((book) => book.author.toLowerCase().includes(filters.author.toLowerCase()))
    }

    if (filters.isbn) {
      result = result.filter((book) => book.isbn.toLowerCase().includes(filters.isbn.toLowerCase()))
    }

    if (filters.genre) {
      result = result.filter((book) => book.genre.toLowerCase().includes(filters.genre.toLowerCase()))
    }

    // Apply quantity filter
    if (filters.minQuantity !== undefined) {
      result = result.filter((book) => book.quantity >= filters.minQuantity)
    }

    if (filters.maxQuantity !== undefined) {
      result = result.filter((book) => book.quantity <= filters.maxQuantity)
    }

    // Apply date filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate)
      result = result.filter((book) => new Date(book.addedDate) >= startDate)
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate)
      result = result.filter((book) => new Date(book.addedDate) <= endDate)
    }

    setFilteredBooks(result)
    setIsFilterDialogOpen(false)
  }

  const clearFilters = () => {
    setActiveFilters({})
    setFilteredBooks(books)
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Book Rack</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFilterDialogOpen(true)}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {Object.keys(activeFilters).length > 0 && (
              <span className="ml-2 bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">
                {Object.keys(activeFilters).length}
              </span>
            )}
          </Button>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            disabled={username !== "root"}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-6 flex items-center">
          <span className="text-zinc-400 mr-2">Active filters:</span>
          <Button variant="link" onClick={clearFilters} className="text-emerald-500 hover:text-emerald-400 p-0 h-auto">
            Clear all
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  showActions={true}
                  isAdmin={username === "root"}
                  onRemove={handleRemoveBook}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-400 my-12">
              {books.length > 0
                ? "No books match the current filters."
                : "No books in the library yet. Add some books to get started!"}
            </p>
          )}
        </div>
      )}

      <AddBookDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAddBook={handleAddBook} />

      <FilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApplyFilters={applyFilters}
        initialFilters={activeFilters}
      />
    </div>
  )
}
