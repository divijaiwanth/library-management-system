import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="space-y-6 max-w-3xl">
          <BookOpen className="h-16 w-16 mx-auto text-emerald-500" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
            Library Management Portal
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-zinc-400">
            Explore and manage your books with our comprehensive library management system. Search, filter, and organize
            your collection with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">Sign In</Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-500 hover:bg-emerald-950 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
