import InvoiceRow from "./invoiceRow";

interface Invoice {
	projectId: number;
	projectName: string;
	projectDescription: string;
	totalHoursUsed: number;
	records: InvoiceRow[];
	totalAmount: number;
}

export default Invoice;
