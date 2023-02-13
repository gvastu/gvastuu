export function Pagos({ children }: { children?: React.ReactNode }) {
	return (
		<div className="mb-8 grid">
			<div className="-mx-4 mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-900 sm:pl-6"
							>
								Propiedad
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 lg:table-cell"
							>
								Inquilino
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
							>
								Monto
							</th>
							<th
								scope="col"
								className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
							>
								Status
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Ver</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{children}
					</tbody>
				</table>
			</div>
		</div>
	)
}
