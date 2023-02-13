import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getMonthlyPaymentsById } from '~/models/payment.server'
import { MoreIcon } from '~/components/icons'
import { Pagos } from '~/components/listas'
import { Fecha, CustomLink, BackButton } from '~/components/shared'
import { json } from '@remix-run/node'
import { getCurrentMonthData } from '~/utils'

type UserPaymentData = {
	id: string
	date: string
	amount: number
	locationId: string
	location: string
	user: string
	active: boolean
	startDate: string
	endDate: string
}

export async function loader({ request }: LoaderArgs) {
	let { current, previous, next, start, end } = await getCurrentMonthData(
		request,
	)
	let gte = new Date(start.toString())
	let lte = new Date(end.toString())
	let payments = (await getMonthlyPaymentsById(lte, gte)).map(i => i)
	return json({ current, previous, next, payments })
}

export default function () {
	let {
		payments,
		next: [yn, mn],
		previous: [yp, mp],
		current: [mc, yc],
	} = useLoaderData<any>()
	let month = Number(mc)
	let year = Number(yc)
	let isCurrent = new Date().getMonth() + 1 === month

	return (
		<>
			{!payments.length ? (
				<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
					<p>No hay pagos registrados en este mes</p>
					<BackButton />
				</div>
			) : (
				<>
					<div className="relative">
						<div className="absolute left-0 flex group-hover:transition-all group-hover:duration-1000 group-focus:transition-all">
							<CustomLink
								month={mp}
								year={yp}
								className="min-w-max text-sm leading-7 text-indigo-500 hover:text-indigo-600 focus:bg-transparent focus:text-inherit focus:outline-none"
							>
								<span className="flex items-center gap-1 pr-2">
									<MoreIcon
										className="rotate-180 transform"
										aria-hidden="true"
									/>
									Mes anterior
								</span>
							</CustomLink>
						</div>
						{!isCurrent && (
							<div className="absolute right-0 group-hover:transition-all group-hover:duration-1000 group-focus:transition-all">
								<CustomLink
									month={mn}
									year={yn}
									className="min-w-max text-sm leading-7 text-indigo-500 hover:text-indigo-600 focus:bg-transparent focus:text-inherit focus:outline-none"
								>
									<span className="flex items-center gap-1 pl-2">
										Mes siguiente
										<MoreIcon className="mt-1" aria-hidden="true" />
									</span>
								</CustomLink>
							</div>
						)}
						<div className="grid w-full">
							<div className="m-auto">
								<Fecha
									className="m-auto text-sm capitalize text-brand sm:text-base"
									month={month}
									year={year}
								/>
							</div>
						</div>
					</div>
					<Pagos>
						{payments.map((payment: UserPaymentData) => (
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
										<span className="sr-only">{payment.location}</span>
									</Link>
								</td>
							</tr>
						))}
					</Pagos>
				</>
			)}
		</>
	)
}
