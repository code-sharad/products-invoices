import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

export function InvoiceTemplate2({
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
            <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">INVOICE</h1>
                        <p className="opacity-90">{invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-xl">Inventory Manager Inc.</p>
                        <p className="opacity-90">123 Business Street</p>
                        <p className="opacity-90">City, State 12345</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 border-b pb-2">Bill To:</h3>
                    <p className="font-bold text-lg">{customerName}</p>
                    <p>{customerEmail}</p>
                    <p className="whitespace-pre-line mt-2">{customerAddress}</p>
                </div>
                <div className="border p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2 border-b pb-2">Invoice Details:</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Invoice Date:</span>
                            <span className="font-medium">{invoiceDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Due Date:</span>
                            <span className="font-medium">{invoiceDate}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t mt-2">
                            <span>Amount Due:</span>
                            <span className="text-lg">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="font-medium">Item</TableHead>
                            <TableHead className="text-right font-medium">Quantity</TableHead>
                            <TableHead className="text-right font-medium">Price</TableHead>
                            <TableHead className="text-right font-medium">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={item.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className="font-normal">
                                        {item.quantity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
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
                <div className="w-1/3 space-y-2 border p-4 rounded-lg shadow-sm">
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
                        <span className="text-lg">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg text-center">
                <p className="font-medium">Thank you for your business! Payment is due within 30 days.</p>
                <p className="text-muted-foreground mt-1">Please make checks payable to: Inventory Manager Inc.</p>
            </div>
        </div>
    )
}

