"use client";
import { useState, useEffect } from "react";
import apiRequest from "../utils/api";

interface Product {
  _id: string;
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

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await apiRequest("/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("Fetched products:", data); 
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="p-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 mb-4 rounded">
          <h2 className="font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Gender: {product.gender}</p>
          <p>Colors: {product.variants?.colors?.join(", ") || "N/A"}</p>
          <p>Sizes: {product.variants?.sizes?.join(", ") || "N/A"}</p>

          {product.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name}
                  className="w-16 h-16 object-cover border rounded"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
