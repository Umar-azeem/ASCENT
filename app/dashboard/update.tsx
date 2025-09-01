"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiRequest from "../utils/api";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const Update = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [editProduct, setEditProduct] = useState<any>(null);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const [deleteProductName, setDeleteProductName] = useState<string>("");

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await apiRequest("/api/products", { method: "GET" });
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products", err);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Open delete dialog
    const confirmDelete = (id: string, name: string) => {
        setDeleteProductId(id);
        setDeleteProductName(name);
        setDeleteDialogOpen(true);
    };

    // Delete product
    const handleDelete = async () => {
        if (!deleteProductId) return;
        try {
            await apiRequest(`/api/products/${deleteProductId}`, { method: "DELETE" });
            setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));
            toast.success(`"${deleteProductName}" deleted successfully`);
        } catch (err) {
            console.error("Failed to delete product", err);
            toast.error(`Failed to delete "${deleteProductName}"`);
        } finally {
            setDeleteDialogOpen(false);
            setDeleteProductId(null);
            setDeleteProductName("");
        }
    };

    // Open edit dialog
    const handleEdit = async (id: string) => {
        try {
            const product = await apiRequest(`/api/products/${id}`, { method: "GET" });
            setEditProduct(product);
            setEditDialogOpen(true);
        } catch (err) {
            console.error("Failed to fetch product", err);
            toast.error("Failed to load product for editing");
        }
    };

    // Save product changes
    const handleSaveEdit = async () => {
        try {
            await apiRequest(`/api/products/${editProduct._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editProduct.name,
                    description: editProduct.description,
                    price: editProduct.price,
                    category: editProduct.category,
                    gender: editProduct.gender,
                }),
            });
            toast.success("Product updated successfully");
            setEditDialogOpen(false);
            fetchProducts();
        } catch (err) {
            console.error("Failed to update product", err);
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="p-2 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Products</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 text-gray-600 py-3 md:py-12">
                            <svg
                                className="animate-spin h-6 w-6 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            <span>Loading kids products...</span>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid gap-4">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="border rounded-lg p-2 md:p-4 flex justify-between items-start"
                                >
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-xs md:text-sm text-gray-600">{product.description}</p>
                                        <p className="text-md md:text-lg font-bold text-green-600">
                                            ${product.price}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge>{product.category}</Badge>
                                            <Badge>{product.gender}</Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(product._id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => confirmDelete(product._id, product.name)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No products found.</p>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{deleteProductName}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Update product details below.</DialogDescription>
                    </DialogHeader>

                    {editProduct && (
                        <div className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={editProduct.name}
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input
                                    value={editProduct.description}
                                    onChange={(e) =>
                                        setEditProduct({
                                            ...editProduct,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) =>
                                        setEditProduct({
                                            ...editProduct,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Category</Label>
                                <Input
                                    value={editProduct.category}
                                    onChange={(e) =>
                                        setEditProduct({
                                            ...editProduct,
                                            category: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Gender</Label>
                                <Input
                                    value={editProduct.gender}
                                    onChange={(e) =>
                                        setEditProduct({
                                            ...editProduct,
                                            gender: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Update;
