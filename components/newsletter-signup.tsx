"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email) {
      // In a real app, you'd send this to your email service
      // For demo, we'll just show success message
      setIsSubscribed(true)

      // Create WhatsApp message for admin notification
      const whatsappMessage = `New Newsletter Subscription:
      
Email: ${email}
Date: ${new Date().toLocaleDateString()}`

      const whatsappUrl = `https://wa.me/+923127693006?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, "_blank")

      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated with Ascent Garments</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fashion
              tips.
            </p>
            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  🎉 Thank you for subscribing! You'll receive our latest updates soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
