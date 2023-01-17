import Invoice from "../types/entities/invoice";

interface InvoiceOverviewProps {
	invoice: Invoice;
}

function InvoiceOverview({ invoice }: InvoiceOverviewProps) {
	const formatterCurrency = Intl.NumberFormat("da-dk", {
		style: "currency",
		currency: "dkk",
	});

	const formatterHour = Intl.NumberFormat("da-dk", {
		style: "unit",
		unit: "hour",
		unitDisplay: "long",
	});

	return (
		<div className="text-white flex flex-col gap-4">
			<h1 className="text-4xl font-bold tracking-wider mb-6">Invoice</h1>
			<h4 className="font-bold">ProjectId: {invoice.projectId}</h4>
			<h4 className="font-bold">Project name: {invoice.projectName}</h4>
			<h4 className="font-bold">
				Project description: {invoice.projectDescription}
			</h4>

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl">Rows</h3>
				<div className="bg-white backdrop-filter gap-6 items-start flex flex-col backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg px-5 py-3">
					{invoice.records.map((r, i) => (
						<div className="flex gap-6" key={invoice.projectName + "-" + i}>
							<p>#{i + 1}</p>
							<p>
								Pr. hour: {formatterCurrency.format(r.developerBillingPrHour)}
							</p>
							<p>Time: {formatterHour.format(r.hours)}</p>
							<p>Sum: {formatterCurrency.format(r.rowTotal)}</p>
						</div>
					))}
				</div>

				<h3 className="font-bold">
					Total hours spent: {formatterHour.format(invoice.totalHoursUsed)}
				</h3>
				<h3 className="font-bold">
					Total amount: {formatterCurrency.format(invoice.totalAmount)}
				</h3>
			</div>
		</div>
	);
}

export default InvoiceOverview;
