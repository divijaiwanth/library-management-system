import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, BookMarked, Shield } from "lucide-react"

export default function About() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">About Library Management System</h1>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          <p className="text-zinc-300 leading-relaxed">
            Our Library Management System is a comprehensive solution designed to help librarians and users efficiently
            manage and access the library's collection. With features like book searching, filtering, and management, it
            streamlines the process of maintaining a library catalog.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <Search className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-medium text-white">Advanced Search</h3>
              </div>
              <p className="text-zinc-400">
                Search for books by title, author, ISBN, or genre with our powerful search functionality.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <BookMarked className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-medium text-white">Book Management</h3>
              </div>
              <p className="text-zinc-400">Add, remove, and update books in the library collection with ease.</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-medium text-white">Book Rack</h3>
              </div>
              <p className="text-zinc-400">View all books in the library with comprehensive filtering options.</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-medium text-white">User Access Control</h3>
              </div>
              <p className="text-zinc-400">
                Different access levels for librarians and regular users to ensure proper management.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
          <p className="text-zinc-300 leading-relaxed">
            To get started with the Library Management System, simply sign in with your credentials. If you're a
            librarian (root user), you'll have access to additional features like adding and removing books.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Sign In</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
