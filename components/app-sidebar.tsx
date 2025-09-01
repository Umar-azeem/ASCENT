"use client"

import { Baby, Users, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const categories = [
  {
    title: "Kids",
    url: "/products?category=kids",
    icon: Baby,
    description: "Fashion for children",
  },
  {
    title: "Women",
    url: "/products?category=women",
    icon: Users,
    description: "Women's collection",
  },
  {
    title: "Men",
    url: "/products?category=men",
    icon: User,
    description: "Men's collection",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">StyleHub</h1>
            <p className="text-xs text-muted-foreground">Fashion Store</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const isActive =
                  pathname.includes(category.url.split("?")[0]) && pathname.includes(category.title.toLowerCase())

                return (
                  <SidebarMenuItem key={category.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="h-12">
                      <Link href={category.url}>
                        <category.icon className="h-5 w-5" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{category.title}</span>
                          <span className="text-xs text-muted-foreground">{category.description}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
