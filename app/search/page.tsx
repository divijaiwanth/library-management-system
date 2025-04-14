"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookCard } from "@/components/book-card"
import type { Book } from "@/lib/types"

export default function Search() {
  const [query, setQuery] = useState("")
  const [searchBy, setSearchBy] = useState("title")
  const [results, setResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/books/search?${searchBy}=${query}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error searching books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Search Books</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-white"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
              <option value="genre">Genre</option>
            </select>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((book) => (
                <BookCard key={book._id} book={book} showActions={false} />
              ))}
            </div>
          ) : (
            query && <p className="text-center text-zinc-400 my-12">No books found matching your search criteria.</p>
          )}
        </div>
      )}
    </div>
  )
}
