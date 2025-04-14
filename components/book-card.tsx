"use client"

import { formatDistanceToNow } from "date-fns"
import { Book, BookOpen, Hash, Calendar, Tag, Package, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Book as BookType } from "@/lib/types"

interface BookCardProps {
  book: BookType
  showActions?: boolean
  isAdmin?: boolean
  onRemove?: (id: string) => void
}

export function BookCard({ book, showActions = false, isAdmin = false, onRemove }: BookCardProps) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(book._id)
    }
  }

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-950 text-white hover:border-zinc-700 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold line-clamp-1">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Book className="h-4 w-4 mt-0.5 text-zinc-500" />
            <span className="text-zinc-300">{book.author}</span>
          </div>

          <div className="flex items-start gap-2">
            <Hash className="h-4 w-4 mt-0.5 text-zinc-500" />
            <span className="text-zinc-300">{book.isbn}</span>
          </div>

          <div className="flex items-start gap-2">
            <Tag className="h-4 w-4 mt-0.5 text-zinc-500" />
            <Badge variant="outline" className="bg-zinc-900 text-emerald-400 border-emerald-800 hover:bg-zinc-800">
              {book.genre}
            </Badge>
          </div>

          <div className="flex items-start gap-2">
            <Package className="h-4 w-4 mt-0.5 text-zinc-500" />
            <span className="text-zinc-300">{book.quantity} copies available</span>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-zinc-500" />
            <span className="text-zinc-400 text-sm">
              Added {formatDistanceToNow(new Date(book.addedDate), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="pt-2">
          {isAdmin ? (
            <Button variant="destructive" size="sm" className="w-full" onClick={handleRemove}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full text-zinc-400 border-zinc-700 hover:bg-zinc-800"
              disabled
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Only librarians can edit the books
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
