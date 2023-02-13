import type { Payment } from '@prisma/client'
import { FechaFull } from '~/components/shared'
import { printMonth } from '~/utils'

interface PaymentProps extends Omit<Payment, 'date' | 'dueDate'> {
	date: string
	dueDate: string
}

type UserPaymentsProps = {
	payments: PaymentProps
	children: React.ReactNode
}[]

export function UserPayments(payments: UserPaymentsProps) {
	return (
		<>
			{!payments.length ? (
				<div className="mb-8">
					<div className="grid gap-2 px-2 sm:px-0">
						<div
							className="place-center grid h-16 grid-flow-col"
							style={{ gridTemplateColumns: '1fr auto' }}
						>
							<p className="text self-center px-2 text-brand sm:px-0">
								No has realizado ningún pago
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="px-4 sm:px-5 lg:px-6">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<p className="mt-2 text-sm text-brand">
								Lista de pagos realizados al mes de {printMonth()}
							</p>
						</div>
					</div>
					<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm text-brand sm:pl-6"
									>
										Fecha
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm text-brand"
									>
										Monto
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span className="sr-only"></span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{payments.map(({ id, date, amount }: any) => (
									<>
										<tr key={id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
												<FechaFull
													day={date.split('T')[0].split('-')[2]}
													month={date.split('T')[0].split('-')[1]}
													year={date.split('T')[0].split('-')[0]}
												/>
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												{Number(amount)
													.toLocaleString('es-MX', {
														style: 'currency',
														currency: 'MXN',
													})
													.slice(0)}{' '}
												<span className="text-xs">MXN</span>
											</td>
											<td className="whitespace-nowrap py-4 pl-3 pr-2 text-right text-sm">
												<span className="sr-only"></span>
											</td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}
