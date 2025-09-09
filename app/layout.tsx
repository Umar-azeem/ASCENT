import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TopMarquee } from "@/components/top-marquee"
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ascent Garment - Fashion for Everyone",
  description: "Premium fashion collection for  Men and Kids",
    generator: 'umar.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
         <TopMarquee /> 
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
            <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  )
}
