"use client";
import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1TPaPU2MCd/?mibextid=wwXIfr",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ascentgarments92?utm_source=ig_web_button_share_sheet&igsh=YXZoZ3R6d2Q3Y3Zk",
      color: "hover:text-pink-600",
    },

    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@ascentgarments?si=gpuojEJ4-UeMsQCE",
      color: "hover:text-red-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/03127693006",
      color: "hover:text-green-600",
    },
  ];
  const quickLinks = [
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/return" },
    { name: "FAQ", href: "/faq" },
    { name: "Review", href: "/review" },
     { name: "Contact us", href: "/contact" },
    { name: "About Us", href: "/about" },
     { name: "Sizing", href: "/size" },
  ];
  const categories = [
    { name: "Men's Fashion" },
    { name: "Kids Fashion" },
    { name: "Sale Items" },
  ];
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      // Create WhatsApp message for admin notification
      const whatsappMessage = `New Newsletter Subscription from Footer:
      
Email: ${email}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`;

      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      alert("Thank you for subscribing to our newsletter!");
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-24 h-24 bg-gradient-to-br rounded-lg flex items-center justify-center">
                <Image
                  src="ascyR.png"
                  alt="Logo"
                  width={300}
                  height={300}
                />
              </div>
              {/* <div>
                <h1 className="font-bold text-lg">S</h1>
                <p className="text-xs text-muted-foreground">Garment</p>
              </div> */}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for quality fashion. We offer the latest
              trends in clothing for kids, women, and men with unbeatable prices
              and exceptional service.
            </p>
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+923127693006</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>ascentgarments92@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Faisalabad</span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Categories */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter & Social */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Stay Connected</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Subscribe
              </Button>
            </form>
            {/* Social Media Links */}
            <div className="space-y-3">
              <h5 className="font-medium text-sm">Follow Us</h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-gray-800 rounded-lg transition-colors ${social.color} hover:bg-gray-700`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-800" />
      {/* Bottom Footer */}
      <div className="container mx-auto px-1 md:px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center md:space-y-2 space-y-0">
          <div className="text-sm gap-2 hidden md:flex text-gray-400">
            ©{currentYear} Ascent All rights reserved.
          </div>
          <div className="hidden md:flex flex-wrap gap-6 text-sm">
            <Link
              href=""
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href=""
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            {/* <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link> */}
          </div>
          <div className="flex justify-between md:justify-normal items-center space-x-1 md:space-x-4">
            <span className="text-sm text-gray-400 pl-4 md:pl-0">Powered by</span>
            <div className="flex ">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br rounded-lg flex items-center justify-center">
              <Image
                src="ascyR.png"
                alt="Logo"
                width={300}
                height={300}
              />
            </div>
            {/* <div>
              <h1 className="font-bold text-lg">SCENT</h1>
              <p className="text-xs text-muted-foreground">Garment</p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
