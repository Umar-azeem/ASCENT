  "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Users,
  TrendingUp,
} from "lucide-react"
import apiRequest from "./utils/api"


const heroSlides = [
  {
    id: 1,
    // title: "Summer Collection 2024",
    // subtitle: "Discover the Latest Trends",
    // description:
    //   "Embrace the season with our vibrant summer collection featuring breathable fabrics and stunning designs",
    image: "/pnim.png",
    buttonText: "Shop Summer",
    buttonLink: "/products?category=summer",
    gradient: "from-orange-400 via-pink-500 to-purple-600",
  },
  {
    id: 2,
    // title: "Premium Denim",
    // subtitle: "Crafted for Comfort",
    // description: "Experience unmatched quality with our premium denim collection, designed for the modern lifestyle",
    image: "/by.png",
    buttonText: "Explore Denim",
    buttonLink: "/products?category=denim",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
  },
  {
    id: 3,
    // title: "Kids Fashion",
    // subtitle: "Fun Meets Style",
    // description: "Adorable and comfortable clothing that lets kids be kids while looking absolutely fantastic",
    image: "/childrn.png",
    buttonText: "Shop Kids",
    buttonLink: "/products?category=kids",
    gradient: "from-green-400 via-blue-500 to-purple-600",
  },
  {
    id: 4,
    // title: "Exclusive Sale",
    // subtitle: "Up to 70% Off",
    // description: "Don't miss out on our biggest sale of the year with incredible discounts on premium fashion",
    image: "/fif.png",
    buttonText: "Shop Sale",
    buttonLink: "/products?sale=true",
    gradient: "from-red-500 via-pink-500 to-orange-500",
  },
]


const categories = [

  {
    name: "Men",
    description: "Classic & Modern",
    image: "/bd.png",
    href: "/products?category=men",
    color: "from-blue-500 to-indigo-500",
    items: "1,800+ Items",
  },
  {
    name: "Kids",
    description: "Fun & Comfortable",
     image: "/kd.png",
    href: "/products?category=kids",
    color: "from-green-500 to-emerald-500",
    items: "1,200+ Items",
  },
]


export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [menProducts, setMenProducts] = useState<any[]>([])
  const [kidsProducts, setKidsProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  // Fetch products and filter by gender
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        console.log("Fetched products:", data)

        setMenProducts(data.filter((p: any) => p.gender?.toLowerCase() === "men"))
        setKidsProducts(data.filter((p: any) => p.gender?.toLowerCase() === "kids"))
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const renderProductCard = (product: any) => (
    <Card
      key={product._id}
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <Link href={`/products/${product._id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.discount && (
            <div className="absolute top-3 left-3">
              <Badge variant="destructive" className="bg-red-500">
                -{product.discount}%
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              {product.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Badge variant="outline" className="capitalize text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />
              <Image
                src={slide.image || "/placeholder.svg"}
                alt='slide image'
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
        {/* Slide Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <div className="space-y-6 animate-fade-in">
                {/* <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {heroSlides[currentSlide]}
                </Badge> */}
                {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  {heroSlides[currentSlide].title}
                </h1> */}
                {/* <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  {heroSlides[currentSlide].description}
                </p> */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100">
                    <Link href={heroSlides[currentSlide].buttonLink}>
                      {heroSlides[currentSlide].buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                    asChild
                  >
                    <Link href="/products">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Collection
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Arrow Controls */}
        {/* <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button> */}
      </section>

      {/* Categories Section */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated collections designed for every style, occasion, and personality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0  ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white transform group-hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                        <p className="text-lg opacity-90 mb-2">{category.description}</p>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {category.items}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Men Products */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Men Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked favorites from our latest collection, loved by thousands of customers worldwide
            </p>
          </div>
          <section className="py-4 bg-white">
            <div className="container mx-auto px-4">
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
                  <span>Loading men products...</span>
                </div>
              ) : menProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {menProducts.map(renderProductCard)}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-12">No men products found.</p>
              )}
            </div>
          </section>


          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* kids Products */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Kids Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked favorites from our latest collection, loved by thousands of customers worldwide
            </p>
          </div>

          <section className="py-4 bg-white">
            <div className="container mx-auto px-4">
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
              ) : kidsProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {kidsProducts.map(renderProductCard)}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-12">No kids products found.</p>
              )}
            </div>
          </section>


          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">5K+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">24H</div>
              <div className="text-gray-600">Fast Delivery</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors duration-300">
                <Truck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold">Free Shipping</h3>
              <p className="text-gray-600 text-lg">Free shipping on orders over $50 worldwide</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors duration-300">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold">Secure Payment</h3>
              <p className="text-gray-600 text-lg">100% secure payment with SSL encryption</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors duration-300">
                <Headphones className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold">24/7 Support</h3>
              <p className="text-gray-600 text-lg">Customer support via WhatsApp & Email</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
