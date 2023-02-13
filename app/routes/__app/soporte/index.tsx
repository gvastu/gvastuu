import type { TicketsData } from '~/models/message.server'
import { getMessages } from '~/models/message.server'
import { Link, useLoaderData } from '@remix-run/react'
import { CategoryIcon, PropiedadIcon } from '~/components/icons'
import { BackButton, FechaFull } from '~/components/shared'

export async function loader() {
	return (await getMessages()) as TicketsData
}

export default function () {
	let messages = useLoaderData<TicketsData>()
	return (
		<>
			{messages !== null ? (
				<>
					{
						// @ts-ignore
						messages.map(message => (
							<li
								key={message.id}
								className="card mx-auto mt-5 h-auto w-auto divide-y divide-gray-200 overflow-hidden rounded-lg bg-white p-2.5 shadow first-of-type:mt-0 sm:h-24 sm:p-0"
							>
								<Link to={message.id}>
									<div className="sm:p-4">
										<div className="flex items-center justify-between">
											<p className="max-w-[200px] items-center gap-1 truncate text-sm text-brand sm:flex sm:max-w-none">
												{message.title}{' '}
												<span className="hidden sm:inline">-</span>
												<span className="mt-2 grid grid-flow-col gap-1">
													<PropiedadIcon className="mt-0.5 sm:-mt-1.5 sm:ml-2" />
													<span className="text-gray-500 sm:-mt-2">
														{message.location}
													</span>
												</span>
											</p>
											<div className="ml-2 flex flex-shrink-0">
												{message.isSolved ? (
													<p className="font-semibold inline-flex rounded-full bg-emerald-100 px-2 text-xs leading-5 text-emerald-800">
														resuelto
													</p>
												) : (
													<div className="font-semibold inline-flex rounded-full bg-red-100 px-2 text-xs leading-5 text-red-800">
														no resuelto
													</div>
												)}
											</div>
										</div>
										<div className="mt-2 sm:flex sm:justify-between">
											<div className="sm:flex">
												<p className="mt-5 grid grid-flow-col place-content-start gap-1 text-sm leading-3 text-brand-light">
													<CategoryIcon
														className="self-center"
														aria-hidden="true"
													/>
													{message.category}
												</p>
											</div>
											<div className="flex items-center sm:mt-0">
												<p className="mt-2 ml-1 text-xs text-brand-light sm:mt-5 sm:ml-0">
													<FechaFull
														day={
															new Date(message.createdAt)
																.toLocaleDateString('es-MX')
																.split('/')[0]
														}
														month={
															(
																new Date(message.createdAt).getMonth() + 1
															).toLocaleString().length === 1
																? '0' +
																  (new Date(message.createdAt).getMonth() + 1)
																: new Date(message.createdAt).getMonth() + 1
														}
														year={
															new Date(message.createdAt)
																.toLocaleDateString('es-MX')
																.split('/')[2]
														}
													/>
												</p>
											</div>
										</div>
									</div>
								</Link>
							</li>
						))
					}
					<div className="px-2 pt-6 text-sm text-brand">
						<BackButton />
					</div>
				</>
			) : (
				<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
					<p>No hay tickets por revisar</p>
					<BackButton />
				</div>
			)}
		</>
	)
}
