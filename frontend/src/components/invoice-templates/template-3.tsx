import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

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

export function InvoiceTemplate3({
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
        <div className="space-y-6 font-serif">
            <div className="flex flex-col items-center text-center border-b pb-6">
                <h1 className="text-3xl font-bold tracking-tight">INVOICE</h1>
                <p className="text-muted-foreground">{invoiceNumber}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-lg border-b mb-3 pb-1">From</h3>
                    <p className="font-bold">Inventory Manager Inc.</p>
                    <p>123 Business Street</p>
                    <p>City, State 12345</p>
                    <p>contact@example.com</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg border-b mb-3 pb-1">To</h3>
                    <p className="font-bold">{customerName}</p>
                    <p>{customerEmail}</p>
                    <p className="whitespace-pre-line">{customerAddress}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-lg border-b mb-3 pb-1">Invoice Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Invoice Date:</span>
                            <span>{invoiceDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Due Date:</span>
                            <span>{invoiceDate}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg border-b mb-3 pb-1">Payment Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Payment Method:</span>
                            <span>Bank Transfer</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Account:</span>
                            <span>XXXX-XXXX-XXXX-1234</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg border-b mb-4 pb-1">Invoice Items</h3>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-serif font-semibold">Description</TableHead>
                            <TableHead className="text-right font-serif font-semibold">Quantity</TableHead>
                            <TableHead className="text-right font-serif font-semibold">Unit Price</TableHead>
                            <TableHead className="text-right font-serif font-semibold">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id} className="border-b">
                                <TableCell>{item.name}</TableCell>
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
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Due:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6 text-center">
                <p className="font-medium">Thank you for your business!</p>
                <p className="text-muted-foreground mt-1">
                    If you have any questions about this invoice, please contact us at support@example.com
                </p>
            </div>
        </div>
    )
}

