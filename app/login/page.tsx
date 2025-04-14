"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple authentication for demo purposes
    // In a real app, you would validate against a database
    if ((username === "root" && password === "root") || (username === "user" && password === "user")) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)
      router.push("/rack")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <BookOpen className="h-10 w-10 text-emerald-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your credentials to access the library portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
