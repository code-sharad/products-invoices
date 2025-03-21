import { DatePicker } from '@/components/date-range'
import { ProductTable } from '@/components/inventory/ProductTable'
import InvoiceSummary from '@/components/invoice/InvoiceSummary'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Separator } from '@/components/ui/separator'
import { ArrowDown, ArrowUp, ChevronUpIcon, Search } from 'lucide-react'
import { SquarePen, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'


const initialProducts = [
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

function Invoice() {
    return (
        <div className=''>
            <h1>Invoide</h1>
            {/* <InvoiceSummary/> */}
            <div className='flex gap-4 flex-wrap'>
                <Card className=''>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Invoice Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-4'>
                            <div >
                                <Label className='my-2'>Customer Name</Label>
                                <Input />
                            </div>
                            <div >
                                <Label className='my-2'>Customer Email</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='my-2'>Customer Address</Label>
                                <Input />
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <div className='flex w-96 flex-col gap-2'>
                                    <Label># Invoice Number</Label>
                                    <Input />
                                </div>
                                <div className='flex  flex-col gap-2'>
                                    <Label>Invoice Date</Label>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex gap-2 justify-between'>
                        <CardTitle>Product Details</CardTitle>
                        <Button className='w-32 py-4'>Add</Button>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className='flex gap-4 flex-wrap'>
                                <div>
                                    <h2 className='font-medium mb-2'>Product</h2>
                                    <div>
                                        <Popover>
                                            <PopoverTrigger className='border p-2 rounded-md w-56 text-left pl-4 text-sm font-medium'>select product... <div className='inline-flex gap-4 '><ChevronUpIconj/> <ArrowDown/></div></PopoverTrigger>
                                            <PopoverContent>
                                                <Command>
                                                    <CommandInput placeholder="Type a command or search..." />
                                                    <CommandList>
                                                        <CommandEmpty>No results found.</CommandEmpty>
                                                        <CommandGroup heading="Suggestions">
                                                            <CommandItem>Calendar</CommandItem>
                                                            <CommandItem>Search Emoji</CommandItem>
                                                            <CommandItem>Calculator</CommandItem>
                                                        </CommandGroup>
                                                        <CommandSeparator />
                                                        <CommandGroup heading="Settings">
                                                            <CommandItem>Profile</CommandItem>
                                                            <CommandItem>Billing</CommandItem>
                                                            <CommandItem>Settings</CommandItem>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>

                                            </PopoverContent>
                                        </Popover>

                                    </div>
                                </div>
                                <div className=''>
                                    <h2 className='font-semibold mb-2'>Quantity</h2>
                                    <div className='flex gap-2'>
                                        <Button variant="outline">-</Button>
                                        <Input defaultValue={0} className='w-16' type='number' />
                                        <Button variant="outline">+</Button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <Label>Price</Label>
                                    <Input type='number' />
                                </div>
                            </div>
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6 p-6">Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialProducts.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium pl-6 p-6 text-[16px]">{product.name}</TableCell>
                                                <TableCell>
                                                    <span className="border rounded-2xl text-black font-medium text-sm px-2 py-1">
                                                        {product.category}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-[16px] ">{product.quantity}</TableCell>
                                                <TableCell className="text-start text-[16px]">₹{product.price}</TableCell>
                                                <TableCell className="flex gap-2">
                                                   
                                                    <button
                                                        // onClick={() => onDelete(product.name)}
                                                        className="hover:rounded-md hover:bg-red-100 px-4 py-2"
                                                    >
                                                        <Trash2 width={16} />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Invoice