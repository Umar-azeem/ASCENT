"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import apiRequest from "./utils/api";

const heroSlides = [
  {
    id: 1,
    image: "/pnim.png",
    buttonText: "Shop Summer",
    buttonLink: "/products?category=summer",
    gradient: "from-orange-400 via-pink-500 to-purple-600",
  },
  {
    id: 2,
    image: "/by.png",
    buttonText: "Explore Denim",
    buttonLink: "/products?category=denim",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
  },
  {
    id: 3,
    image: "/childrn.png",
    buttonText: "Shop Kids",
    buttonLink: "/products?category=kids",
    gradient: "from-green-400 via-blue-500 to-purple-600",
  },
  {
    id: 4,
    image: "/fif.png",
    buttonText: "Shop Sale",
    buttonLink: "/products?sale=true",
    gradient: "from-red-500 via-pink-500 to-orange-500",
  },
];

const categories = [
  {
    name: "Men",
    description: "Classic & Modern",
    image: "https://res.cloudinary.com/ddrib9bsp/image/upload/v1773744197/new6_rlomku.png",
    href: "/products?category=men",
    color: "from-blue-500 to-indigo-500",
    items: "1,800+ Items",
  },
  {
    name: "Kids",
    description: "Fun & Comfortable",
    image: "https://res.cloudinary.com/ddrib9bsp/image/upload/v1773744192/new4_tqgmpz.png",
    href: "/products?category=kids",
    color: "from-green-500 to-emerald-500",
    items: "1,200+ Items",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [menProducts, setMenProducts] = useState<any[]>([]);
  const [kidsProducts, setKidsProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log(data);
        if (Array.isArray(data)) {
          setMenProducts(
            data.filter((p: any) => p.gender?.toLowerCase() === "men"),
          );
          setKidsProducts(
            data.filter((p: any) => p.gender?.toLowerCase() === "kids"),
          );
        } else {
          console.error("API did not return an array:", data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProductCard = (product: any) => (
    <Link key={product._id} href={`/products/${product._id}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-[#f5f3f0] aspect-[3/4]">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-[#c41e3a] text-white text-xs font-semibold px-2 py-1 tracking-wide">
              -{product.discount}% OFF
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          {/* ADD TO CART pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#1a1a1a] text-xs font-semibold px-5 py-2 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-md">
            ADD TO CART
          </div>
        </div>
        {/* Product Info */}
        <div className="pt-3 pb-1 space-y-1">
          <p className="text-[10px] tracking-[0.15em] text-[#999] uppercase font-medium">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-1 group-hover:text-[#c41e3a] transition-colors">
            {product.name}
          </h3>
          {product.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-[#e8b84b] text-[#e8b84b]"
                      : "text-[#ddd]"
                  }`}
                />
              ))}
              <span className="text-[10px] text-[#999] ml-1">
                ({product.reviews || 0})
              </span>
            </div>
          )}
          <p className="text-sm font-bold text-[#1a1a1a]">
            Rs. {product.price?.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="min-h-screen bg-white font-['Cormorant_Garamond',Georgia,serif]">
      {/* Announcement Bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 text-xs tracking-[0.2em] uppercase font-medium">
        Free Delivery on Orders Above Rs. 2,500 &nbsp;|&nbsp; Cash on Delivery
        Available
      </div>

      {/* Hero Slider */}
      <section className="relative h-[75vh] md:h-[88vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt="slide image"
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Slide CTA */}
        <div className="relative z-10 h-full flex items-end pb-16 md:pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={heroSlides[currentSlide].buttonLink}
                className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] text-xs tracking-[0.2em] uppercase font-bold px-8 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
              >
                {heroSlides[currentSlide].buttonText}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-white text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-3.5 hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="absolute bottom-6 right-8 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-[2px] transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/50 text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/50 text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-[#e8e4df] bg-[#faf9f7]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e8e4df]">
            {[
              { icon: Users, value: "50K+", label: "Happy Customers" },
              { icon: TrendingUp, value: "5K+", label: "Products" },
              { icon: Award, value: "4.9★", label: "Avg Rating" },
              { icon: Truck, value: "24H", label: "Fast Delivery" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="py-5 text-center">
                <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] tracking-tight">
                  {value}
                </p>
                <p className="text-[10px] tracking-[0.15em] text-[#888] uppercase mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#999] uppercase mb-2">
                Explore
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] tracking-tight">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] text-[#1a1a1a] uppercase font-semibold hover:text-[#c41e3a] transition-colors"
            >
              All Collections <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <div className="group relative overflow-hidden aspect-[4/3] bg-[#f5f3f0]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover bg-slate-800 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <p className="text-[10px] tracking-[0.2em] text-white/70 uppercase mb-1">
                      {category.items}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-white uppercase font-semibold border-b border-white pb-0.5 group-hover:border-[#e8b84b] group-hover:text-[#e8b84b] transition-colors">
                      Shop Now <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-12">
        <hr className="border-[#e8e4df]" />
      </div>

      {/* Men Products */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#999] uppercase mb-2">
                Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] tracking-tight">
                Men's Collection
              </h2>
            </div>
            <Link
              href="/products?category=men"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] text-[#1a1a1a] uppercase font-semibold hover:text-[#c41e3a] transition-colors"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 text-[#888] py-20">
              <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm tracking-[0.1em]">
                Loading collection...
              </span>
            </div>
          ) : menProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {menProducts.map(renderProductCard)}
            </div>
          ) : (
            <p className="text-center text-[#888] py-20 text-sm tracking-wide">
              No men products found.
            </p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase font-bold px-10 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
            >
              View All Products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Kids Products */}
      <section className="py-16 md:py-20 bg-[#faf9f7]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#999] uppercase mb-2">
                New Arrivals
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] tracking-tight">
                Kids' Collection
              </h2>
            </div>
            <Link
              href="/products?category=kids"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] text-[#1a1a1a] uppercase font-semibold hover:text-[#c41e3a] transition-colors"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 text-[#888] py-20">
              <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm tracking-[0.1em]">
                Loading collection...
              </span>
            </div>
          ) : kidsProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {kidsProducts.map(renderProductCard)}
            </div>
          ) : (
            <p className="text-center text-[#888] py-20 text-sm tracking-wide">
              No kids products found.
            </p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase font-bold px-10 py-3.5 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
            >
              View All Products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 border-t border-[#e8e4df] bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4df]">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "Free shipping on orders over Rs. 2,500 nationwide",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "100% secure with SSL encryption & COD available",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Customer support via WhatsApp & Email anytime",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-5 px-8 py-8 group"
              >
                <div className="flex-shrink-0 w-10 h-10 border border-[#1a1a1a] flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors duration-300">
                  <Icon className="h-4 w-4 text-[#1a1a1a] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a1a1a] tracking-wide uppercase mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
