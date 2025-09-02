"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import apiRequest from "../utils/api";
import Update from "./update";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  images: string[];
  variants: {
    colors: string[];
    sizes: string[];
    ageCategory?: string;
  };
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const ADMIN_PASSWORD = "admin123"; // In production, this should be handled securely

  useEffect(() => {
    const authStatus = localStorage.getItem("dashboard-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem("dashboard-auth", "authenticated");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    localStorage.removeItem("dashboard-auth");
    setPassword("");
  };

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Classic Cotton T-Shirt",
      description: "Comfortable cotton t-shirt perfect for everyday wear",
      price: 29.99,
      category: "clothing",
      gender: "unisex",
      images: ["/placeholder.svg?height=300&width=300&text=T-Shirt"],
      variants: {
        colors: ["Red", "Blue", "Black", "White"],
        sizes: ["S", "M", "L", "XL", "2XL"],
      },
    },
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    gender: "",
    images: [],
    variants: {
      colors: [],
      sizes: [],
    },
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setNewProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...imageUrls],
      }));
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
    if (currentImageIndex >= (newProduct.images?.length || 1) - 1) {
      setCurrentImageIndex(0);
    }
  };
  const nextImage = () => {
    if (newProduct.images && newProduct.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % newProduct.images!.length);
    }
  };
  const prevImage = () => {
    if (newProduct.images && newProduct.images.length > 0) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + newProduct.images!.length) % newProduct.images!.length
      );
    }
  };
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const addColor = () => {
    if (newColor && !newProduct.variants?.colors?.includes(newColor)) {
      setNewProduct((prev: any) => ({
        ...prev,
        variants: {
          ...prev.variants,
          colors: [...(prev.variants?.colors || []), newColor],
        },
      }));
      setNewColor("");
    }
  };

  const addSize = () => {
    if (newSize && !newProduct.variants?.sizes?.includes(newSize)) {
      setNewProduct((prev: any) => ({
        ...prev,
        variants: {
          ...prev.variants,
          sizes: [...(prev.variants?.sizes || []), newSize],
        },
      }));
      setNewSize("");
    }
  };

  const removeColor = (color: string) => {
    setNewProduct((prev: any) => ({
      ...prev,
      variants: {
        ...prev.variants,
        colors: prev.variants?.colors?.filter((c: any) => c !== color) || [],
      },
    }));
  };

  const removeSize = (size: string) => {
    setNewProduct((prev: any) => ({
      ...prev,
      variants: {
        ...prev.variants,
        sizes: prev.variants?.sizes?.filter((s: any) => s !== size) || [],
      },
    }));
  };

  const addProduct = async () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.category &&
      newProduct.gender
    ) {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description || "");
      formData.append("price", String(newProduct.price));
      formData.append("category", newProduct.category);
      formData.append("gender", newProduct.gender);
      formData.append("colors", (newProduct.variants?.colors || []).join(","));
      formData.append("sizes", (newProduct.variants?.sizes || []).join(","));

      imageFiles.forEach((file) => {
        formData.append("image", file);
      });

      try {
        const data = await apiRequest("/api/products", {
          method: "POST",
          body: formData,
        });
        console.log("Uploaded product:", data);
        setProducts((prev) => [...prev, data]);
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          category: "",
          gender: "",
          images: [],
          variants: { colors: [], sizes: [] },
        });
        setImageFiles([]);
        setCurrentImageIndex(0);
        alert("Product added successfully");
      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to add product. Check console.");
      }
    }
  };

  if (showLogin || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            {/* <div className="mt-4 text-sm text-gray-600 text-center">
              Demo password: admin123
            </div> */}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-2xl font-bold">Product Dashboard</h1>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/products">View Frontend</Link>
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 md:px-4 py:4 md:py-8">
        <Tabs defaultValue="add-product" className="space-y-6">
          <TabsList>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="manage-products">Manage Products</TabsTrigger>
          </TabsList>

          <TabsContent value="add-product">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Create a new product with variants and categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          price: Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Product Images</Label>

                  {/* Image Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload product images
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB each
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4 bg-transparent"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Choose Images
                      </Button>
                    </div>
                  </div>

                  {/* Image Preview Slider */}
                  {newProduct.images && newProduct.images.length > 0 && (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="aspect-square bg-white rounded-lg border overflow-hidden">
                          <img
                            src={
                              newProduct.images[currentImageIndex] ||
                              "/placeholder.svg"
                            }
                            alt={`Product image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {newProduct.images.length > 1 && (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent"
                              onClick={prevImage}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
                              onClick={nextImage}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => removeImage(currentImageIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Image Thumbnails */}
                      {newProduct.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                          {newProduct.images.map((image, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                                currentImageIndex === index
                                  ? "border-blue-500"
                                  : "border-gray-200"
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="text-sm text-gray-500 text-center">
                        {currentImageIndex + 1} of {newProduct.images.length}{" "}
                        images
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) =>
                        setNewProduct((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home & Living</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={newProduct.gender}
                      onValueChange={(value) =>
                        setNewProduct((prev) => ({ ...prev, gender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="men">Men</SelectItem>
                        {/* <SelectItem value="women">Women</SelectItem> */}
                        <SelectItem value="kids">Kids</SelectItem>
                        {/* <SelectItem value="unisex">Unisex</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Colors</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        placeholder="Add color"
                        onKeyPress={(e) => e.key === "Enter" && addColor()}
                      />
                      <Button onClick={addColor} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.variants?.colors?.map((color) => (
                        <Badge
                          key={color}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {color}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeColor(color)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sizes</Label>
                    <div className="flex gap-2">
                      <Select value={newSize} onValueChange={setNewSize}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="2XL">2XL</SelectItem>
                          <SelectItem value="3XL">3XL</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={addSize} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.variants?.sizes?.map((size) => (
                        <Badge
                          key={size}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {size}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeSize(size)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={addProduct} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-products">
            <Update />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
