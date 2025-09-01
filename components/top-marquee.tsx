"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function TopMarquee() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 relative overflow-hidden">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="mx-8">🎉 Welcome to StyleHub - Your Fashion Destination!</span>
          <span className="mx-8">🔥 New Collection 2024 Now Available</span>
          <span className="mx-8">💫 Up to 50% Off on Selected Items</span>
          <span className="mx-8">📱 Order via WhatsApp for Quick Service</span>
        </div>
      </div>


      {/* <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button> */}

      {/* <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
          padding-left: 100%;
        }
        
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style> */}
    </div>
  )
}
