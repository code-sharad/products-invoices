"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
} from "lucide-react";

import { format, parseISO } from "date-fns";

// Define invoice type
type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  template: "template1" | "template2" | "template3";
};

// Sample data
const sampleInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2023-001",
    date: "2023-03-15",
    dueDate: "2023-04-15",
    customerName: "Acme Corporation",
    customerEmail: "billing@acme.com",
    customerAddress: "123 Main St\nSuite 400\nNew York, NY 10001",
    items: [
      {
        id: "item1",
        productId: "1",
        name: "Laptop",
        price: 999.99,
        quantity: 5,
      },
      {
        id: "item2",
        productId: "3",
        name: "Wireless Mouse",
        price: 29.99,
        quantity: 10,
      },
    ],
    subtotal: 5299.85,
    tax: 529.99,
    total: 5829.84,
    template: "template1",
  },
  {
    id: "2",
    invoiceNumber: "INV-2023-002",
    date: "2023-04-02",
    dueDate: "2023-05-02",
    customerName: "TechStart Inc.",
    customerEmail: "accounts@techstart.io",
    customerAddress: "456 Innovation Ave\nSan Francisco, CA 94107",
    items: [
      {
        id: "item1",
        productId: "7",
        name: "Monitor",
        price: 249.99,
        quantity: 3,
      },
    ],
    subtotal: 749.97,
    tax: 75.0,
    total: 824.97,
    template: "template2",
  },
  {
    id: "3",
    invoiceNumber: "INV-2023-003",
    date: "2023-05-10",
    dueDate: "2023-06-10",
    customerName: "Global Services LLC",
    customerEmail: "finance@globalservices.com",
    customerAddress: "789 Enterprise Blvd\nChicago, IL 60601",
    items: [
      {
        id: "item1",
        productId: "2",
        name: "Office Chair",
        price: 199.99,
        quantity: 8,
      },
      {
        id: "item2",
        productId: "8",
        name: "Desk",
        price: 299.99,
        quantity: 4,
      },
    ],
    subtotal: 2799.88,
    tax: 280.0,
    total: 3079.88,
    template: "template3",
  },
  {
    id: "4",
    invoiceNumber: "INV-2023-004",
    date: "2023-06-18",
    dueDate: "2023-07-18",
    customerName: "Creative Design Studio",
    customerEmail: "billing@creativedesign.co",
    customerAddress: "321 Artist Row\nPortland, OR 97205",
    items: [
      {
        id: "item1",
        productId: "9",
        name: "Headphones",
        price: 89.99,
        quantity: 5,
      },
    ],
    subtotal: 449.95,
    tax: 45.0,
    total: 494.95,
    template: "template1",
  },
  {
    id: "5",
    invoiceNumber: "INV-2023-005",
    date: "2023-07-05",
    dueDate: "2023-08-05",
    customerName: "Education First Academy",
    customerEmail: "procurement@edufirst.edu",
    customerAddress: "555 Learning Lane\nBoston, MA 02108",
    items: [
      {
        id: "item1",
        productId: "1",
        name: "Laptop",
        price: 999.99,
        quantity: 10,
      },
      {
        id: "item2",
        productId: "10",
        name: "Pen Set",
        price: 12.99,
        quantity: 50,
      },
    ],
    subtotal: 10649.4,
    tax: 1064.94,
    total: 11714.34,
    template: "template2",
  },
  {
    id: "6",
    invoiceNumber: "INV-2023-006",
    date: "2023-08-12",
    dueDate: "2023-09-12",
    customerName: "Healthcare Solutions",
    customerEmail: "accounts@healthsolutions.org",
    customerAddress: "777 Wellness Way\nAustin, TX 78701",
    items: [
      {
        id: "item1",
        productId: "4",
        name: "Desk Lamp",
        price: 49.99,
        quantity: 15,
      },
    ],
    subtotal: 749.85,
    tax: 75.0,
    total: 824.85,
    template: "template3",
  },
  {
    id: "7",
    invoiceNumber: "INV-2023-007",
    date: "2023-09-03",
    dueDate: "2023-10-03",
    customerName: "Retail Innovations",
    customerEmail: "finance@retailinnovations.com",
    customerAddress: "888 Commerce Circle\nSeattle, WA 98101",
    items: [
      {
        id: "item1",
        productId: "6",
        name: "Wireless Keyboard",
        price: 59.99,
        quantity: 12,
      },
      {
        id: "item2",
        productId: "3",
        name: "Wireless Mouse",
        price: 29.99,
        quantity: 12,
      },
    ],
    subtotal: 1079.76,
    tax: 108.0,
    total: 1187.76,
    template: "template1",
  },
  {
    id: "8",
    invoiceNumber: "INV-2023-008",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    customerName: "Construction Experts Inc.",
    customerEmail: "billing@constructionexperts.net",
    customerAddress: "999 Builder Blvd\nDenver, CO 80202",
    items: [
      {
        id: "item1",
        productId: "5",
        name: "Notebook",
        price: 4.99,
        quantity: 100,
      },
    ],
    subtotal: 499.0,
    tax: 49.9,
    total: 548.9,
    template: "template2",
  },
  {
    id: "9",
    invoiceNumber: "INV-2023-009",
    date: "2023-11-07",
    dueDate: "2023-12-07",
    customerName: "Legal Partners LLP",
    customerEmail: "accounting@legalpartners.law",
    customerAddress: "444 Justice Avenue\nWashington, DC 20001",
    items: [
      {
        id: "item1",
        productId: "10",
        name: "Pen Set",
        price: 12.99,
        quantity: 30,
      },
      {
        id: "item2",
        productId: "5",
        name: "Notebook",
        price: 4.99,
        quantity: 50,
      },
    ],
    subtotal: 639.2,
    tax: 63.92,
    total: 703.12,
    template: "template3",
  },
  {
    id: "10",
    invoiceNumber: "INV-2023-010",
    date: "2023-12-01",
    dueDate: "2024-01-01",
    customerName: "Mountain Resorts Group",
    customerEmail: "procurement@mountainresorts.com",
    customerAddress: "222 Alpine Road\nAspen, CO 81611",
    items: [
      {
        id: "item1",
        productId: "7",
        name: "Monitor",
        price: 249.99,
        quantity: 5,
      },
      {
        id: "item2",
        productId: "6",
        name: "Wireless Keyboard",
        price: 59.99,
        quantity: 5,
      },
    ],
    subtotal: 1549.9,
    tax: 155.0,
    total: 1704.9,
    template: "template1",
  },
];

export default function BillingHistoryPage() {
  // @ts-ignore
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  // @ts-ignore
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  // @ts-ignore
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredInvoices = invoices.filter((invoice) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.customerName.toLowerCase().includes(searchLower) ||
      invoice.customerEmail.toLowerCase().includes(searchLower);

    // Date range filter

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate PDF
  const generatePDF = (invoice: Invoice) => {
    // In a real application, this would generate a PDF using a library like jspdf or react-pdf
    alert(`Downloading invoice: ${invoice.invoiceNumber}`);
    // For a real implementation, you would use:
    // 1. Create a PDF document
    // 2. Add the invoice content based on the selected template
    // 3. Save or download the PDF
  };

  // Preview invoice
  const previewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewOpen(true);
  };

  // Get status badge color

  return (
    <div className="flex-1 p-4 pt-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Billing History</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
            />
          </div>
        </div>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>
                        {format(parseISO(invoice.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {invoice.customerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {invoice.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{invoice.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => previewInvoice(invoice)}
                            title="Preview Invoice"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Preview</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => generatePDF(invoice)}
                            title="Download Invoice"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No invoices found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex items-center justify-between px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredInvoices.length
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredInvoices.length)}
              </span>{" "}
              of <span className="font-medium">{filteredInvoices.length}</span>{" "}
              invoices
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Invoice Preview Dialog */}
      {/* <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.invoiceNumber} - {selectedInvoice?.customerName}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-white p-6 rounded-md border max-h-[70vh] overflow-y-auto">
            {selectedInvoice?.template === "template1" && (
              <InvoiceTemplate
                invoiceNumber={selectedInvoice.invoiceNumber}
                invoiceDate={selectedInvoice.date}
                customerName={selectedInvoice.customerName}
                customerEmail={selectedInvoice.customerEmail}
                customerAddress={selectedInvoice.customerAddress}
                items={selectedInvoice.items}
                subtotal={selectedInvoice.subtotal}
                tax={selectedInvoice.tax}
                total={selectedInvoice.total}
              />
            )}
            {selectedInvoice?.template === "template2" && (
              <InvoiceTemplate2
                invoiceNumber={selectedInvoice.invoiceNumber}
                invoiceDate={selectedInvoice.date}
                customerName={selectedInvoice.customerName}
                customerEmail={selectedInvoice.customerEmail}
                customerAddress={selectedInvoice.customerAddress}
                items={selectedInvoice.items}
                subtotal={selectedInvoice.subtotal}
                tax={selectedInvoice.tax}
                total={selectedInvoice.total}
              />
            )}
            {selectedInvoice?.template === "template3" && (
              <InvoiceTemplate3
                invoiceNumber={selectedInvoice.invoiceNumber}
                invoiceDate={selectedInvoice.date}
                customerName={selectedInvoice.customerName}
                customerEmail={selectedInvoice.customerEmail}
                customerAddress={selectedInvoice.customerAddress}
                items={selectedInvoice.items}
                subtotal={selectedInvoice.subtotal}
                tax={selectedInvoice.tax}
                total={selectedInvoice.total}
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => generatePDF(selectedInvoice!)}>
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
