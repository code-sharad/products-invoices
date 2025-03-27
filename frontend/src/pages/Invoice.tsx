import { DatePicker } from "@/components/date-range";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown, ChevronUpIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import InvoiceTemplate from "@/components/invoice-templates/template-1";
import ModernInvoiceTemplate from "@/components/invoice-templates/template-Modern";
import PremiumMinimalInvoice from "@/components/invoice-templates/template-minimal";
import TemplateCarousel from "@/components/invoice-templates/TemplateCarousel";

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
];

function Invoice() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
  }>({
    id: "",
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });
  const [inventoryItems, setInventoryItems] = useState(initialProducts);
  const [invoiceItems, setInvoiceItems] = useState<
    {
      id: string;
      name: string;
      quantity: number;
      price: number;
      category: string;
    }[]
  >([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [companyDetails, setCompanyDetails] = useState({
    name: "Your Company Name",
    address: "123 Business Street",
    cityState: "City, State 12345",
    phone: "(555) 123-4567",
    email: "billing@company.com",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const templates = [
    {
      id: "modern",
      name: "Modern Template",
      preview: "/templates/modern.png",
      component: ModernInvoiceTemplate,
    },
    {
      id: "classic",
      name: "Classic Template",
      preview: "/templates/classic.png",
      component: InvoiceTemplate,
    },
    {
      id: "minimal",
      name: "Minimal Template",
      preview: "/templates/minimal.png",
      component: PremiumMinimalInvoice,
    },
  ];

  const SelectedTemplate =
    templates.find((t) => t.id === selectedTemplate)?.component ||
    ModernInvoiceTemplate;

  const handleAddProduct = () => {
    setInvoiceItems([...invoiceItems, selectedProduct]);
    setSelectedProduct({
      id: "",
      name: "",
      quantity: 0,
      price: 0,
      category: "",
    });
  };

  const handleProductDelete = (id: string) => {
    const newProuducts = invoiceItems.filter((product) => product.id !== id);
    setInvoiceItems(newProuducts);
  };

  const invoiceData = {
    customerName,
    customerEmail,
    customerAddress,
    invoiceNumber,
    invoiceDate,
    items: invoiceItems,
    companyDetails,
  };

  return (
    <div className="container">
      <h1 className="text-3xl mt-12 mb-8 font-semibold">Create Invoice</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Invoice Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 ">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="my-2">Company Name</Label>
                    <Input
                      value={companyDetails.name}
                      onChange={(e) =>
                        setCompanyDetails({
                          ...companyDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="my-2">Address</Label>
                    <Input
                      value={companyDetails.address}
                      onChange={(e) =>
                        setCompanyDetails({
                          ...companyDetails,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="my-2">City, State ZIP</Label>
                    <Input
                      value={companyDetails.cityState}
                      onChange={(e) =>
                        setCompanyDetails({
                          ...companyDetails,
                          cityState: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="my-2">Phone</Label>
                    <Input
                      value={companyDetails.phone}
                      onChange={(e) =>
                        setCompanyDetails({
                          ...companyDetails,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="my-2">Email</Label>
                    <Input
                      value={companyDetails.email}
                      onChange={(e) =>
                        setCompanyDetails({
                          ...companyDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="my-2">Customer Name</Label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="my-2">Customer Email</Label>
                    <Input
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="my-2">Customer Address</Label>
                    <Input
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-12">
                    <Label className="mb-2"># Invoice Number</Label>
                    <Input
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="mb-2">Invoice Date</Label>
                    <DatePicker value={invoiceDate} onChange={setInvoiceDate} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-2">
          <CardHeader className="flex flex-col sm:flex-row gap-2 justify-between">
            <CardTitle className="text-2xl font-semibold">
              Product Details
            </CardTitle>
            <Button onClick={handleAddProduct} className="w-full sm:w-32 py-4">
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex flex-col justify-start items-center sm:flex-row gap-4 ">
                <div className="w-full sm:w-auto">
                  <h2 className="font-medium mb-2">Product</h2>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="w-full sm:w-56 border p-2 rounded-md text-left pl-4 font-medium flex justify-between items-center">
                      {selectedProduct.name !== ""
                        ? selectedProduct.name
                        : "select product..."}{" "}
                      <div className="inline-flex h-6 flex-col">
                        <ChevronUpIcon /> <ChevronDown />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] sm:w-auto">
                      <Command>
                        <CommandInput placeholder="search product..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Suggestions">
                            <ScrollArea className="h-[200px]">
                              {inventoryItems?.map((product) => {
                                return (
                                  <CommandItem
                                    id={product.id}
                                    value={product.name}
                                    key={product.id}
                                    onSelect={(currentValue) => {
                                      console.log(currentValue);
                                      setSelectedProduct({
                                        id: product.id,
                                        name: product.name,
                                        quantity: product.quantity,
                                        price: product.price,
                                        category: product.category,
                                      });

                                      setOpen(false);
                                    }}
                                  >
                                    <div className="flex flex-col gap-2 ">
                                      <span>{product.name}</span>
                                      <div className="flex gap-2">
                                        <Badge className="bg-white text-muted-foreground border border-neutral-200">
                                          {product.category}
                                        </Badge>
                                        <span>{product.price}</span>
                                      </div>
                                    </div>
                                  </CommandItem>
                                );
                              })}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full sm:w-auto">
                  <h2 className="font-semibold mb-2">Quantity</h2>
                  <div className="flex border rounded-md">
                    <Button
                      variant="secondary"
                      className="max-w-8 rounded-r-none rounded-l-md bg-white "
                      onClick={() =>
                        setSelectedProduct({
                          ...selectedProduct,
                          quantity: selectedProduct.quantity - 1,
                        })
                      }
                    >
                      -
                    </Button>
                    <Input
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          quantity: Number(e.target.value),
                        })
                      }
                      value={selectedProduct.quantity || 0}
                      contentEditable
                      className="w-24 text-center rounded-none border-r border-l border-b-0 border-t-0"
                      type="number"
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none rounded-r-md bg-white"
                      onClick={() =>
                        setSelectedProduct({
                          ...selectedProduct,
                          quantity: selectedProduct.quantity + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <Label className="text-[17px] mb-2">Price</Label>
                  <Input
                    className="w-fit h-9"
                    value={selectedProduct.price || 0}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: Number(e.target.value),
                      })
                    }
                    type="number"
                  />
                </div>
              </div>
              <ScrollArea className="overflow-x-auto  mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6 p-6">Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Item Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceItems.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium pl-6 p-6 text-[16px]">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <span className="border rounded-2xl text-black font-medium text-sm px-2 py-1">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-[16px] ">
                          {product.quantity}
                        </TableCell>
                        <TableCell className="text-start text-[16px]">
                          ₹{product.price * product.quantity}
                        </TableCell>
                        <TableCell className="text-start text-[16px]">
                          ₹{product.price}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <button
                            onClick={() => handleProductDelete(product.id)}
                            className="hover:rounded-md hover:bg-red-100 px-4 py-2"
                          >
                            <Trash2 width={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Selection */}
      <Card className="mt-8">
        <CardContent>
          <TemplateCarousel
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            invoiceData={invoiceData}
          />
        </CardContent>
      </Card>

      {/* Invoice Preview */}
      <div className="container mt-8">
        <SelectedTemplate invoiceData={invoiceData} />
      </div>
    </div>
  );
}

export default Invoice;
