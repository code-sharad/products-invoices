import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type InvoiceItem = {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
}

interface InvoiceTemplateProps {
    invoiceNumber: string
    invoiceDate: string
    customerName: string
    customerEmail: string
    customerAddress: string
    items: InvoiceItem[]
    subtotal: number
    tax: number
    total: number
}

export function InvoiceTemplate1({
    invoiceNumber,
    invoiceDate,
    customerName,
    customerEmail,
    customerAddress,
    items,
    subtotal,
    tax,
    total,
}: InvoiceTemplateProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">INVOICE</h1>
                    <p className="text-muted-foreground">{invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold">Inventory Manager Inc.</p>
                    <p className="text-muted-foreground">123 Business Street</p>
                    <p className="text-muted-foreground">City, State 12345</p>
                    <p className="text-muted-foreground">contact@example.com</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Bill To:</h3>
                    <p className="font-medium">{customerName}</p>
                    <p>{customerEmail}</p>
                    <p className="whitespace-pre-line">{customerAddress}</p>
                </div>
                <div className="text-right">
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span className="font-semibold">Invoice Date:</span>
                            <span>{invoiceDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Due Date:</span>
                            <span>{invoiceDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="font-semibold">Item</TableHead>
                            <TableHead className="text-right font-semibold">Quantity</TableHead>
                            <TableHead className="text-right font-semibold">Price</TableHead>
                            <TableHead className="text-right font-semibold">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                    No items added to the invoice yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <p className="text-center text-muted-foreground">Thank you for your business!</p>
            </div>
        </div>
    )
}

