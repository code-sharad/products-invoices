"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define product type
type Product = {
    id: string
    name: string
    quantity: number
    price: number
    category: string
}

// Sample data
const initialProducts: Product[] = [
    {
        id: "1",
        name: "Laptop",
        quantity: 10,
        price: 999.99,
        category: "Electronics",
    },
    {
        id: "2",
        name: "Office Chair",
        quantity: 25,
        price: 199.99,
        category: "Furniture",
    },
    {
        id: "3",
        name: "Wireless Mouse",
        quantity: 50,
        price: 29.99,
        category: "Electronics",
    },
    {
        id: "4",
        name: "Desk Lamp",
        quantity: 15,
        price: 49.99,
        category: "Lighting",
    },
    {
        id: "5",
        name: "Notebook",
        quantity: 100,
        price: 4.99,
        category: "Stationery",
    },
]

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        quantity: 0,
        price: 0,
        category: "",
    })

    // Add new product
    const handleAddProduct = () => {
        const product = {
            id: Math.random().toString(36).substring(2, 9),
            ...newProduct,
        }
        setProducts([...products, product])
        setNewProduct({ name: "", quantity: 0, price: 0, category: "" })
        setIsAddDialogOpen(false)
    }

    // Edit product
    const handleEditProduct = () => {
        if (currentProduct) {
            setProducts(products.map((product) => (product.id === currentProduct.id ? currentProduct : product)))
            setIsEditDialogOpen(false)
            setCurrentProduct(null)
        }
    }

    // Delete product
    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((product) => product.id !== id))
    }

    // Open edit dialog
    const openEditDialog = (product: Product) => {
        setCurrentProduct(product)
        setIsEditDialogOpen(true)
    }

    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>Add a new product to your inventory.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    placeholder="Product name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={newProduct.quantity}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            quantity: Number.parseInt(e.target.value) || 0,
                                        })
                                    }
                                    placeholder="Quantity"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price: Number.parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    placeholder="Price"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Stationery">Stationery</SelectItem>
                                        <SelectItem value="Lighting">Lighting</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddProduct}>Add Product</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{product.category}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{product.quantity}</TableCell>
                                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Make changes to the product details.</DialogDescription>
                    </DialogHeader>
                    {currentProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={currentProduct.name}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-quantity">Quantity</Label>
                                <Input
                                    id="edit-quantity"
                                    type="number"
                                    value={currentProduct.quantity}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            quantity: Number.parseInt(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-price">Price</Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    step="0.01"
                                    value={currentProduct.price}
                                    onChange={(e) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            price: Number.parseFloat(e.target.value) || 0,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select
                                    defaultValue={currentProduct.category}
                                    onValueChange={(value) =>
                                        setCurrentProduct({
                                            ...currentProduct,
                                            category: value,
                                        })
                                    }
                                >
                                    <SelectTrigger id="edit-category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Stationery">Stationery</SelectItem>
                                        <SelectItem value="Lighting">Lighting</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditProduct}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

