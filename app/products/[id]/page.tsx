"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Share2, Heart, ShoppingCart } from "lucide-react"
import apiRequest from "@/app/utils/api"

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

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await apiRequest(`/api/products/${productId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        // Apply defaults
        const withDefaults: Product = {
          ...data,
          rating: data.rating || 4.5,
          reviews: data.reviews || Math.floor(Math.random() * 200) + 1,
          variants: data.variants || { colors: [], sizes: [] },
        }

        setProduct(withDefaults)
        setSelectedColor(withDefaults.variants?.colors[0] || "")
        setSelectedSize(withDefaults.variants?.sizes[0] || "")
      } catch (err) {
        console.error("Failed to fetch product:", err)
        setError("Product not found")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleWhatsAppOrder = () => {
    if (!product) return;

    const message = `Hi! I'm interested in ordering:

Product: ${product.name}
Color: ${selectedColor}
Size: ${selectedSize}
Price: $${product.price}

View Image: ${product.images[0] || 'No image available'}
`;

    const whatsappUrl = `https://wa.me/923127693006?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };


  const handleShare = () => {
    if (!product) return
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Product link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <svg
          className="animate-spin h-6 w-6 text-gray-500 mr-2"
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
        Loading product...
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-lg">{error || "Product not found"}</p>
        <Button asChild className="mt-4">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square border rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={150} height={150} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex gap-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <Badge variant="outline">{product.gender}</Badge>
                </div>
              </div>
              {product.variants?.ageCategory && (
                <Badge variant="secondary" className="mb-4">
                  {product.variants.ageCategory}
                </Badge>
              )}
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            <div className="text-4xl font-bold text-green-600">Rs.{product.price}</div>

            {/* Colors */}
            {product.variants?.colors && product.variants.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg ${selectedColor === color ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.variants?.sizes && product.variants.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${selectedSize === size ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <Button onClick={handleWhatsAppOrder} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High-quality materials</li>
                  <li>• Multiple color options</li>
                  <li>• Various sizes available</li>
                  <li>• Fast delivery</li>
                  <li>• Easy returns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
