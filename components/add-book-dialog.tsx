"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Book } from "@/lib/types"

interface AddBookDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddBook: (book: Omit<Book, "_id">) => void
}

export function AddBookDialog({ isOpen, onClose, onAddBook }: AddBookDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    quantity: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number.parseInt(value) || 0 : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newBook = {
      ...formData,
      addedDate: new Date().toISOString(),
    }

    onAddBook(newBook)

    // Reset form
    setFormData({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      quantity: 1,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-300">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-zinc-300">
              Author
            </Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn" className="text-zinc-300">
              ISBN
            </Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-zinc-300">
              Genre
            </Label>
            <Input
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-zinc-300">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white"
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
