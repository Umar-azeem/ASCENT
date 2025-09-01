"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import apiRequest from "../utils/api"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  gender: string
  images: string[]
  rating?: number
  reviews?: number
  variants?: {
    colors: string[]
    sizes: string[]
    ageCategory?: string
  }
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)

  const categories = ["all", "kids", "women", "men"]

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        // Add default rating/reviews if not present
        const withDefaults = data.map((p: Product) => ({
          ...p,
          rating: p.rating || 4.5,
          reviews: p.reviews || Math.floor(Math.random() * 200) + 1,
          variants: p.variants || { colors: [], sizes: [] },
        }))

        setProducts(withDefaults)
        setFilteredProducts(withDefaults)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Sync category filter from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase())
    }
  }, [categoryParam])

  // Apply filters & sorting
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.gender?.toLowerCase() === selectedCategory)
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, sortBy, products])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === "all"
              ? "All Products"
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}'s Collection`}
          </h1>
          <p className="text-gray-600">Discover our premium fashion collection</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-600 py-12">
              <svg
                className="animate-spin h-6 w-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Loading kids products...</span>
            </div>
          ) : (
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>

        {/* Products */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {!loading &&
            filteredProducts.map((product) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/products/${product._id}`}>
                  <div className={viewMode === "list" ? "flex" : ""}>
                    <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                      <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className={`w-full object-cover ${viewMode === "list" ? "h-48" : "h-64"}`}
                      />
                    </div>
                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                          <Badge variant="outline" className="ml-2 flex-shrink-0 capitalize">
                            {product.gender}
                          </Badge>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600 ml-1">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {product.variants && (
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">
                              Colors: {product.variants.colors?.slice(0, 3).join(", ") || "N/A"}
                              {product.variants.colors && product.variants.colors.length > 3 &&
                                ` +${product.variants.colors.length - 3} more`}
                            </div>
                            <div className="text-xs text-gray-500">
                              Sizes: {product.variants.sizes?.slice(0, 4).join(", ") || "N/A"}
                              {product.variants.sizes && product.variants.sizes.length > 4 &&
                                ` +${product.variants.sizes.length - 4} more`}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-2xl font-bold text-green-600">${product.price}</span>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))}
        </div>

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
