"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Share2, Heart, ShoppingCart, Star, ChevronDown, ChevronUp, Truck, RotateCcw, Shield } from "lucide-react"
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
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await apiRequest(`/api/products/${productId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

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
    if (!product) return
    const message = `Hi! I'm interested in ordering:\n\nProduct: ${product.name}\nColor: ${selectedColor}\nSize: ${selectedSize}\nPrice: Rs.${product.price}\n\nView Image: ${product.images[0] || "No image available"}`
    const whatsappUrl = `https://wa.me/923127693006?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = () => {
    if (!product) return
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Product link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-[0.2em] text-[#888] uppercase">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-white">
        <p className="text-sm text-[#888] mb-6 tracking-wide">{error || "Product not found"}</p>
        <Link
          href="/products"
          className="text-xs tracking-[0.2em] uppercase font-bold border-b border-[#1a1a1a] pb-0.5 hover:text-[#c41e3a] hover:border-[#c41e3a] transition-colors"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const ratingFull = Math.floor(product.rating || 0)

  return (
    <div className="min-h-screen bg-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#e8e4df]">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link
            href="/products"
            className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a] hover:text-[#c41e3a] transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f3f0] rounded-full transition-colors"
            >
              <Share2 className="h-4 w-4 text-[#1a1a1a]" />
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f3f0] rounded-full transition-colors"
            >
              <Heart className={`h-4 w-4 transition-colors ${wishlist ? "fill-[#c41e3a] text-[#c41e3a]" : "text-[#1a1a1a]"}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 xl:gap-16">

          {/* ─── LEFT: Images ─── */}
          <div className="flex flex-col-reverse md:flex-row gap-3">

            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-[72px] shrink-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-16 md:w-full aspect-square border-[1.5px] overflow-hidden transition-all duration-200 ${
                    selectedImage === index
                      ? "border-[#1a1a1a]"
                      : "border-[#e8e4df] hover:border-[#aaa]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-[#f5f3f0] overflow-hidden aspect-[3/4]">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-white text-[#1a1a1a] text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1.5">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Details ─── */}
          <div className="flex flex-col gap-6 lg:pt-2">

            {/* Name & Badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase font-medium">{product.gender}</span>
                {product.variants?.ageCategory && (
                  <>
                    <span className="text-[#ccc]">·</span>
                    <span className="text-[10px] tracking-[0.2em] text-[#999] uppercase font-medium">{product.variants.ageCategory}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < ratingFull
                            ? "fill-[#e8b84b] text-[#e8b84b]"
                            : "text-[#ddd]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#888]">
                    {product.rating} · {product.reviews} reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-3xl font-bold text-[#1a1a1a] tracking-tight">
                Rs. {product.price?.toLocaleString()}
              </div>
              <p className="text-[10px] tracking-[0.1em] text-[#aaa] mt-1">Inclusive of all taxes</p>
            </div>

            {/* Divider */}
            <hr className="border-[#e8e4df]" />

            {/* Colors */}
            {product.variants?.colors && product.variants.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold tracking-[0.15em] text-[#1a1a1a] uppercase">
                    Color
                  </p>
                  <p className="text-xs text-[#888] tracking-wide">{selectedColor}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium border transition-all duration-200 ${
                        selectedColor === color
                          ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                          : "bg-white text-[#1a1a1a] border-[#ddd] hover:border-[#1a1a1a]"
                      }`}
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
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold tracking-[0.15em] text-[#1a1a1a] uppercase">Size</p>
                  <p className="text-xs text-[#888] tracking-wide">{selectedSize}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-bold tracking-wide border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                          : "bg-white text-[#1a1a1a] border-[#ddd] hover:border-[#1a1a1a]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-1">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb959] text-white text-xs tracking-[0.2em] uppercase font-bold py-4 transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="flex items-center justify-center gap-2 border border-[#ddd] hover:border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.15em] uppercase font-bold py-3.5 transition-all duration-200"
                >
                  <Heart className={`h-3.5 w-3.5 ${wishlist ? "fill-[#c41e3a] text-[#c41e3a]" : ""}`} />
                  Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 border border-[#ddd] hover:border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.15em] uppercase font-bold py-3.5 transition-all duration-200">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Delivery Info Strip */}
            <div className="grid grid-cols-3 border border-[#e8e4df]">
              {[
                { icon: Truck, text: "Fast Delivery" },
                { icon: RotateCcw, text: "Easy Returns" },
                { icon: Shield, text: "Secure Pay" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 py-4 border-r last:border-r-0 border-[#e8e4df]">
                  <Icon className="h-4 w-4 text-[#888]" />
                  <span className="text-[10px] tracking-[0.1em] text-[#888] uppercase">{text}</span>
                </div>
              ))}
            </div>

            {/* Description Accordion */}
            <div className="border-t border-[#e8e4df]">
              <button
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full flex items-center justify-between py-4 text-xs tracking-[0.2em] text-[#1a1a1a] uppercase font-bold hover:text-[#c41e3a] transition-colors"
              >
                Product Details
                {detailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {detailsOpen && (
                <div className="pb-4 space-y-3 text-sm text-[#555] leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-2">
                    {["High-quality materials", "Multiple color options", "Various sizes available", "Fast delivery", "Easy returns"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#777]">
                        <span className="w-1 h-1 rounded-full bg-[#888] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}