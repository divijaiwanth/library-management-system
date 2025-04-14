"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: Record<string, any>) => void
  initialFilters: Record<string, any>
}

export function FilterDialog({ isOpen, onClose, onApplyFilters, initialFilters }: FilterDialogProps) {
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({
    title: false,
    author: false,
    isbn: false,
    genre: false,
    quantity: false,
    addedDate: false,
  })

  const [filters, setFilters] = useState<Record<string, any>>({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    minQuantity: "",
    maxQuantity: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    // Set selected fields based on initialFilters
    const fields: Record<string, boolean> = {
      title: !!initialFilters.title,
      author: !!initialFilters.author,
      isbn: !!initialFilters.isbn,
      genre: !!initialFilters.genre,
      quantity: !!initialFilters.minQuantity || !!initialFilters.maxQuantity,
      addedDate: !!initialFilters.startDate || !!initialFilters.endDate,
    }

    setSelectedFields(fields)

    // Set filter values based on initialFilters
    setFilters({
      title: initialFilters.title || "",
      author: initialFilters.author || "",
      isbn: initialFilters.isbn || "",
      genre: initialFilters.genre || "",
      minQuantity: initialFilters.minQuantity || "",
      maxQuantity: initialFilters.maxQuantity || "",
      startDate: initialFilters.startDate || "",
      endDate: initialFilters.endDate || "",
    })
  }, [initialFilters])

  const handleFieldToggle = (field: string) => {
    setSelectedFields({
      ...selectedFields,
      [field]: !selectedFields[field],
    })
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleApply = () => {
    const activeFilters: Record<string, any> = {}

    if (selectedFields.title && filters.title) {
      activeFilters.title = filters.title
    }

    if (selectedFields.author && filters.author) {
      activeFilters.author = filters.author
    }

    if (selectedFields.isbn && filters.isbn) {
      activeFilters.isbn = filters.isbn
    }

    if (selectedFields.genre && filters.genre) {
      activeFilters.genre = filters.genre
    }

    if (selectedFields.quantity) {
      if (filters.minQuantity) {
        activeFilters.minQuantity = Number.parseInt(filters.minQuantity)
      }
      if (filters.maxQuantity) {
        activeFilters.maxQuantity = Number.parseInt(filters.maxQuantity)
      }
    }

    if (selectedFields.addedDate) {
      if (filters.startDate) {
        activeFilters.startDate = filters.startDate
      }
      if (filters.endDate) {
        activeFilters.endDate = filters.endDate
      }
    }

    onApplyFilters(activeFilters)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white backdrop-blur-lg bg-opacity-90">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Filter Books</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-400">Select fields to filter by:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="title-filter"
                  checked={selectedFields.title}
                  onCheckedChange={() => handleFieldToggle("title")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="title-filter" className="text-zinc-300">
                  Title
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="author-filter"
                  checked={selectedFields.author}
                  onCheckedChange={() => handleFieldToggle("author")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="author-filter" className="text-zinc-300">
                  Author
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isbn-filter"
                  checked={selectedFields.isbn}
                  onCheckedChange={() => handleFieldToggle("isbn")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="isbn-filter" className="text-zinc-300">
                  ISBN
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="genre-filter"
                  checked={selectedFields.genre}
                  onCheckedChange={() => handleFieldToggle("genre")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="genre-filter" className="text-zinc-300">
                  Genre
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quantity-filter"
                  checked={selectedFields.quantity}
                  onCheckedChange={() => handleFieldToggle("quantity")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="quantity-filter" className="text-zinc-300">
                  Quantity
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="date-filter"
                  checked={selectedFields.addedDate}
                  onCheckedChange={() => handleFieldToggle("addedDate")}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="date-filter" className="text-zinc-300">
                  Added Date
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedFields.title && (
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-300">
                  Title contains
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {selectedFields.author && (
              <div className="space-y-2">
                <Label htmlFor="author" className="text-zinc-300">
                  Author contains
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={filters.author}
                  onChange={handleFilterChange}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {selectedFields.isbn && (
              <div className="space-y-2">
                <Label htmlFor="isbn" className="text-zinc-300">
                  ISBN contains
                </Label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={filters.isbn}
                  onChange={handleFilterChange}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {selectedFields.genre && (
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-zinc-300">
                  Genre contains
                </Label>
                <Input
                  id="genre"
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {selectedFields.quantity && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minQuantity" className="text-zinc-300">
                    Min Quantity
                  </Label>
                  <Input
                    id="minQuantity"
                    name="minQuantity"
                    type="number"
                    min="0"
                    value={filters.minQuantity}
                    onChange={handleFilterChange}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxQuantity" className="text-zinc-300">
                    Max Quantity
                  </Label>
                  <Input
                    id="maxQuantity"
                    name="maxQuantity"
                    type="number"
                    min="0"
                    value={filters.maxQuantity}
                    onChange={handleFilterChange}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              </div>
            )}

            {selectedFields.addedDate && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-zinc-300">
                    From Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-zinc-300">
                    To Date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleApply} className="bg-emerald-600 hover:bg-emerald-700">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
