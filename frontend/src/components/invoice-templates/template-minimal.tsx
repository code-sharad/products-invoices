import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import { Download, Printer } from "lucide-react";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface InvoiceData {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceItem[];
  companyDetails: {
    name: string;
    address: string;
    cityState: string;
    phone: string;
    email: string;
  };
}

interface PremiumMinimalInvoiceProps {
  invoiceData: InvoiceData;
}

const PremiumMinimalInvoice: React.FC<PremiumMinimalInvoiceProps> = ({
  invoiceData,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Calculation Methods
  const calculateSubtotal = () => {
    return invoiceData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    const taxRate = 0.085; // 8.5% tax rate
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // PDF Download Function
  const downloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add the image to the PDF with proper pagination
      let heightLeft = pdfHeight;
      let position = 0;
      let page = 1;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Add additional pages as needed
      while (heightLeft > 0) {
        position = -pageHeight * page;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
        page++;
      }

      pdf.save("Invoice.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen p-12 font-sans">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mb-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Printer className="mr-2" size={16} /> Print
        </button>
        <button
          onClick={downloadPDF}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <Download className="mr-2" size={16} /> Download PDF
        </button>
      </div>

      {/* Invoice Container */}
      <div
        ref={invoiceRef}
        className="w-[210mm] h-[297mm] mx-auto border p-8 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {invoiceData.companyDetails.name}
            </h1>
            <div className="text-sm text-gray-600 mt-2">
              <p>{invoiceData.companyDetails.address}</p>
              <p>{invoiceData.companyDetails.cityState}</p>
              <p>Phone: {invoiceData.companyDetails.phone}</p>
              <p>Email: {invoiceData.companyDetails.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light text-gray-900 mb-2">
              INVOICE
            </div>
            <div className="text-sm text-gray-600">
              <p>Invoice #: {invoiceData.invoiceNumber}</p>
              <p>Date: {invoiceData.invoiceDate}</p>
              <p className="text-red-600 font-medium">
                Due:{" "}
                {new Date(
                  new Date(invoiceData.invoiceDate).setDate(
                    new Date(invoiceData.invoiceDate).getDate() + 30
                  )
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bill To
            </h2>
            <div className="text-sm text-gray-700">
              <p className="font-medium">{invoiceData.customerName}</p>
              <p>{invoiceData.customerAddress}</p>
              <p>Email: {invoiceData.customerEmail}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Payment Details
            </h2>
            <div className="text-sm text-gray-700">
              <p>Method: Bank Transfer</p>
              <p>Bank: Your Bank</p>
              <p>Account: XXXX-XXXX-XXXX-1234</p>
              <p>SWIFT: XXXXXXXX</p>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="flex-grow overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium text-gray-600">
                  Name
                </th>
                <th className="pb-3 text-right font-medium text-gray-600">
                  Category
                </th>
                <th className="pb-3 text-right font-medium text-gray-600">
                  Quantity
                </th>
                <th className="pb-3 text-right font-medium text-gray-600">
                  Rate
                </th>
                <th className="pb-3 text-right font-medium text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 text-gray-900">{item.name}</td>
                  <td className="py-3 text-right text-gray-700">
                    {item.category}
                  </td>
                  <td className="py-3 text-right text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-right text-gray-700">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="py-3 text-right text-gray-900 font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="mt-auto pt-8 border-t">
          <div className="flex justify-end">
            <div className="w-72 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  ₹{calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Tax (8.5%)</span>
                <span className="text-gray-900">
                  ₹{calculateTax().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-3 text-lg font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-black">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMinimalInvoice;
