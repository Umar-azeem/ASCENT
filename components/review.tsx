import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Star } from 'lucide-react'

function Review() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "/placeholder.svg?height=80&width=80&text=Sarah",
      rating: 5,
      comment:
        "StyleHub has completely transformed my wardrobe! The quality is exceptional and the styles are always on-trend.",
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      image: "/placeholder.svg?height=80&width=80&text=Michael",
      rating: 5,
      comment: "Perfect fit every time. Their men's collection is sophisticated and the customer service is outstanding.",
    },
    {
      name: "Emma Davis",
      role: "Mom of Two",
      image: "/placeholder.svg?height=80&width=80&text=Emma",
      rating: 5,
      comment: "Love shopping here for my kids! Durable, comfortable, and they actually want to wear these clothes.",
    },
  ]
  return (
    <>
   <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Review