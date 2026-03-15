// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  Settings,
  Menu,
  Baby,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type SimpleSub = { name: string; href: string };
type Group = { name: string; items: SimpleSub[] };
type Category = {
  title: string;
  url: string;
  icon: any;
  description: string;
  groups?: Group[];          // we use groups for Men & Kids
  subcategories?: SimpleSub[]; // not used now, kept for flexibility
};

// Shared grouped items for Men & Kids
const summerItems: SimpleSub[] = [
  { name: "Tracksuit", href: "/products?season=summer&type=tracksuit" },
  { name: "T-shirts", href: "/products?season=summer&type=tshirts" },
  { name: "Polo Shirt", href: "/products?season=summer&type=polo" },
  { name: "Trousers", href: "/products?season=summer&type=trousers" },
  { name: "Shorts", href: "/products?season=summer&type=shorts" },
];

const winterItems: SimpleSub[] = [
  { name: "Tracksuit", href: "/products?season=winter&type=tracksuit" },
  { name: "Hood", href: "/products?season=winter&type=hood" },
  { name: "Hoodie", href: "/products?season=winter&type=hoodie" },
];

const categories: Category[] = [
  {
    title: "Men’s Collection",
    url: "/products?category=men",
    icon: UserIcon,
    description: "Men’s collection",
    groups: [
      { name: "Summer", items: summerItems.map(i => ({ ...i, href: i.href + "&category=men" })) },
      { name: "Winter", items: winterItems.map(i => ({ ...i, href: i.href + "&category=men" })) },
    ],
  },
  {
    title: "Kids",
    url: "/products?category=kids",
    icon: Baby,
    description: "Fashion for kids",
    groups: [
      { name: "Summer", items: summerItems.map(i => ({ ...i, href: i.href + "&category=kids" })) },
      { name: "Winter", items: winterItems.map(i => ({ ...i, href: i.href + "&category=kids" })) },
    ],
  },
  // Women removed on both desktop and mobile as requested
];



export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const isActive = (cat: Category) => {
    const base = cat.url.split("?")[0]; // "/products"
    return pathname.startsWith(base);
  };

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Scrollable mobile drawer */}
      <SheetContent
        side="left"
        className="w-80 p-0"
      >
        <div className="h-full overflow-y-auto px-4 pb-6 pt-4"> 
          <div className="flex flex-col space-y-1">
            <Link href="/" className="flex items-center space-x-2 px-2">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                <Image src="/ascR.png" alt="Logo" width={300} height={300} />
              </div>
              {/* <div>
                <h1 className="font-bold text-lg">SCENT</h1>
                <p className="text-xs text-muted-foreground">Garment</p>
              </div> */}
            </Link>

           

            {/* Mobile categories with groups */}
            <div className="space-y-4">
              {categories.map((category) => {
                const active = isActive(category);
                return (
                  <div key={category.title} className="space-y-2">
                    <Link
                      href={category.url}
                      className={`flex items-center space-x-3 px-2 py-3 rounded-lg transition-colors ${
                        active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <category.icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{category.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.description}
                        </div>
                      </div>
                    </Link>

                    <div className="ml-8 space-y-3">
                      {category.groups?.map((group) => (
                        <div key={group.name}>
                          <div className="text-sm font-semibold mt-2 mb-1">
                            {group.name}
                          </div>
                          <div className="space-y-1">
                            {group.items.map((sub) => (
                              <Link
                                key={sub.name + sub.href}
                                href={sub.href}
                                className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: mobile menu + logo + desktop nav */}
          <div className="flex items-center space-x-4">
            <MobileNav />

            <Link href="/" className="flex items-center  space-x-2">
              <div className="w-full px-10 md:px-2 rounded-lg flex items-center justify-center ">
                <Image src="/ascR.png" alt="Logo" width={100} height={100} />
              </div>
              {/* <div>
                <h1 className="font-bold text-lg">SCENT</h1>
                <p className="text-xs text-muted-foreground">Garment</p>
              </div> */}
            </Link>

            {/* Desktop nav (Women removed) */}
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                {categories.map((category) => {
                  const active = isActive(category);
                  return (
                    <NavigationMenuItem key={category.title}>
                      <NavigationMenuTrigger
                        className={active ? "bg-blue-50 text-blue-600" : ""}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[560px] gap-4 p-4">
                          {/* Card to parent category */}
                          <div className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                href={category.url}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              >
                                <category.icon className="h-6 w-6" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {category.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {category.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </div>

                          {/* Grouped lists */}
                          <div className="grid grid-cols-2 gap-4">
                            {category.groups?.map((group) => (
                              <div key={group.name}>
                                <div className="text-sm font-semibold mb-2">
                                  {group.name}
                                </div>
                                <div className="grid gap-1">
                                  {group.items.map((sub) => (
                                    <NavigationMenuLink key={sub.name + sub.href} asChild>
                                      <Link
                                        href={sub.href}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      >
                                        <div className="text-sm font-medium leading-none">
                                          {sub.name}
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center: search (desktop) */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right: user */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Settings className="mr-2 h-4 w-4" />
                  Owner Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
