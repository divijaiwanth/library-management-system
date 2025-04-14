"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  // Don't show navbar on login page
  if (pathname === "/login") return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-500" />
          <span className="text-lg font-bold text-white">Library Portal</span>
        </Link>

        {isLoggedIn && (
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                pathname === "/" ? "text-emerald-500" : "text-zinc-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                pathname === "/search" ? "text-emerald-500" : "text-zinc-400"
              }`}
            >
              Search
            </Link>
            <Link
              href="/rack"
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                pathname === "/rack" ? "text-emerald-500" : "text-zinc-400"
              }`}
            >
              Rack
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
