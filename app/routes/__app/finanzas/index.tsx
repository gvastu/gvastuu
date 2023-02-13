import { Link, useLoaderData } from '@remix-run/react'
import { getCurrentMonthYear } from '~/utils'
import { Fecha, CustomLink, BackButton } from '~/components/shared'
import { Pagos } from '~/components/listas'
import { MoreIcon } from '~/components/icons'
import type { UserPaymentsData as UserPayments } from '~/models/payment.server'
import { getPayments } from '~/models/payment.server'

type UserPayment = {
	id: string
	date: string
	amount: number
	location: string
	user: string
	locationId: string
}

export async function loader() {
	let current = getCurrentMonthYear()
	let payments = (await getPayments()) as UserPayments
	return { payments, current }
}

export default function () {
	let { payments, current } = useLoaderData()
	return (
		<>
			<div className="relative">
				<div className="absolute left-0 flex group-hover:transition-all group-hover:duration-1000 group-focus:transition-all">
					<CustomLink
						month={current[1] - 1}
						year={current[0]}
						className="flex min-w-max items-center text-sm leading-7 text-indigo-500 hover:text-indigo-600 focus:bg-transparent focus:text-inherit focus:outline-none"
					>
						<span className="flex items-center gap-1 pr-2">
							<MoreIcon className="rotate-180 transform" aria-hidden="true" />
							<span className="hidden sm:block">Mes</span> anterior
						</span>
					</CustomLink>
				</div>
				<div className="grid w-full">
					<div className="m-auto">
						<Fecha
							className="m-auto text-sm capitalize text-brand sm:text-base"
							month={current[1]}
							year={current[0]}
						/>
					</div>
				</div>
			</div>
			{!payments.length ? (
				<None />
			) : (
				<Pagos>
					{payments.map((payment: UserPayment) => (
						<tr key={payment.id}>
							<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-slate-600 sm:w-auto sm:max-w-none sm:pl-6">
								{payment.location}
								<dl className="lg:hidden">
									<dt className="sr-only">{payment.location}</dt>
									<dd className="mt-1 truncate text-slate-600">
										{!payment.user ? (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M20 12H4"
													/>
												</svg>
											</>
										) : (
											payment.user
										)}
									</dd>
									<dt className="sr-only sm:hidden">
										{Number(payment.amount)
											.toLocaleString('es-MX', {
												style: 'currency',
												currency: 'MXN',
											})
											.slice(1)}
									</dt>
									<dd className="mt-1 truncate text-slate-600 sm:hidden">
										{Number(payment.amount)
											.toLocaleString('es-MX', {
												style: 'currency',
												currency: 'MXN',
											})
											.slice(1)}
									</dd>
								</dl>
							</td>
							<td className="hidden px-3 py-4 text-sm text-slate-600 lg:table-cell">
								{!payment.user ? (
									<>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M20 12H4"
											/>
										</svg>
									</>
								) : (
									payment.user
								)}
							</td>
							<td className="hidden px-3 py-4 text-sm text-slate-600 sm:table-cell">
								{Number(payment.amount)
									.toLocaleString('es-MX', {
										style: 'currency',
										currency: 'MXN',
									})
									.slice(1)}
							</td>
							<td className="px-3 py-4 text-sm text-slate-600">Pagado</td>
							<td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
								<Link
									reloadDocument
									className="text-indigo-600 hover:text-indigo-900"
									to={`./${payment.id}`}
								>
									<MoreIcon
										className="translate-y-1 transform"
										aria-hidden="true"
									/>
									<span className="sr-only">
										{!payment.user ? 'usuario' : payment.user}
									</span>
								</Link>
							</td>
						</tr>
					))}
				</Pagos>
			)}
		</>
	)
}

function None() {
	return (
		<div className="mb-8">
			<div className="grid gap-2 px-2 sm:px-0">
				<div
					className="place-center grid h-16 grid-flow-col"
					style={{ gridTemplateColumns: '1fr auto' }}
				>
					<div className="my-6 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
						<p>No hay pagos registrados en el mes</p>
						<BackButton />
					</div>
				</div>
			</div>
		</div>
	)
}
