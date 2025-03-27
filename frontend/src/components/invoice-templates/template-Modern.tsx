import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import { Download } from "lucide-react";

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

interface ModernInvoiceTemplateProps {
  invoiceData: InvoiceData;
}

const ModernInvoiceTemplate: React.FC<ModernInvoiceTemplateProps> = ({
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
    const taxRate = 0.095; // 9.5% tax rate
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
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        scrollY: -window.scrollY,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight
      });

      // Wait for canvas to be fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio, '', 'FAST');
      pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mb-8 print:hidden">
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
        className="border border-gray-300 p-4 sm:p-8 w-[210mm] h-[297mm] mx-auto text-sm sm:text-base flex flex-col bg-white"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          {/* Company Logo & Details */}
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl font-bold mb-4">
              {invoiceData.companyDetails.name}
            </h1>
            <div className="text-xs sm:text-sm text-gray-700">
              <p>{invoiceData.companyDetails.address}</p>
              <p>{invoiceData.companyDetails.cityState}</p>
              <p>Phone: {invoiceData.companyDetails.phone}</p>
              <p>Email: {invoiceData.companyDetails.email}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="text-right w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              INVOICE
            </h1>
            <div className="text-xs sm:text-sm text-gray-600">
              <p>
                <strong>Invoice #:</strong> {invoiceData.invoiceNumber}
              </p>
              <p>
                <strong>Date:</strong> {invoiceData.invoiceDate}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(
                  new Date(invoiceData.invoiceDate).setDate(
                    new Date(invoiceData.invoiceDate).getDate() + 30
                  )
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-10">
          <h2 className="text-base sm:text-lg font-semibold mb-2">Bill To:</h2>
          <div className="text-xs sm:text-sm text-gray-700">
            <p className="font-medium">{invoiceData.customerName}</p>
            <p>{invoiceData.customerAddress}</p>
            <p>Email: {invoiceData.customerEmail}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-3 text-left border-b whitespace-nowrap">
                  Name
                </th>
                <th className="py-2 px-3 text-right border-b whitespace-nowrap">
                  Category
                </th>
                <th className="py-2 px-3 text-right border-b whitespace-nowrap">
                  Quantity
                </th>
                <th className="py-2 px-3 text-right border-b whitespace-nowrap">
                  Rate
                </th>
                <th className="py-2 px-3 text-right border-b whitespace-nowrap">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-3">{item.name}</td>
                  <td className="py-2 px-3 text-right">{item.category}</td>
                  <td className="py-2 px-3 text-right">{item.quantity}</td>
                  <td className="py-2 px-3 text-right">
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="flex justify-end border-t pt-6 mt-auto">
          <div className="w-full sm:w-64 text-xs sm:text-sm">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax (9.5%)</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg">
              <span>Total (INR)</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernInvoiceTemplate;
