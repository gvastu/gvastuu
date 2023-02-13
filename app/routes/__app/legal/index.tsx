import { Link, useLoaderData } from '@remix-run/react'
import saveAs from 'file-saver'
import { DownloadIcon, InfoCircleIcon, MoreIcon } from '~/components/icons'
import { BackButton, FechaFull } from '~/components/shared'
import { getUsersData } from '~/models/user.server'

type UserProps = {
	id: string
	email: string
	name: string
	profile: {
		phone: string
		referral: string
		credential: string
		consent: string
	}
	booking: {
		active: string
		startDate: string
		endDate: string
		amount: string
		contrato: string
		location: {
			id: string
			name: string
			address: string
			isAvailable: string
			payments: string[]
		}
	}
}

export async function loader() {
	return (await getUsersData()).filter(user => user.profile)
}

export default function Contratos() {
	let users = useLoaderData<UserProps[]>()
	return (
		<>
			<CrearContrato />
			{!users.length ? (
				<div className="my-5 grid gap-y-4 self-center px-2 text-sm text-brand sm:px-0">
					<p>Para realizar contratos, debes tener inquilinos.</p>
					<BackButton />
				</div>
			) : (
				<>
					{users.map(user => user?.booking).filter(Boolean).length > 0 ? (
						<>
							<div className="grid gap-2 px-2 sm:px-0">
								<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
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
													Contrato
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
												>
													Vigencia
												</th>
												<th
													scope="col"
													className="relative py-3.5 pl-3 pr-4 sm:pr-6"
												>
													<span className="sr-only">Ver</span>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{users.map(
												(user: UserProps) =>
													user.booking && (
														<>
															<tr
																key={user.id}
																className={`${
																	!user.booking.active ? 'bg-red-50' : null
																}`}
															>
																<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6">
																	{user.booking.location.name}
																	<dl className="lg:hidden">
																		<dt className="sr-only">Inquilino</dt>
																		<dd className="mt-1 truncate text-brand opacity-80">
																			{user.name}
																		</dd>
																		<dt className="sr-only sm:hidden">
																			<button
																				className="flex items-center gap-2 bg-transparent p-0 text-indigo-600 hover:bg-transparent hover:text-indigo-500"
																				onClick={() =>
																					saveAs(
																						`${user.booking.contrato}`,
																						'contrato.png',
																					)
																				}
																			>
																				<span>contrato</span> <DownloadIcon />
																			</button>
																		</dt>
																		<dd className="mt-1 cursor-pointer truncate text-indigo-500/90 hover:text-indigo-700 sm:hidden">
																			<span>
																				<div className="flex items-center gap-1">
																					<button
																						className="flex items-center gap-2 bg-transparent p-0 text-indigo-600 hover:bg-transparent hover:text-indigo-500"
																						onClick={() =>
																							saveAs(
																								`${user.booking.contrato}`,
																								'contrato.png',
																							)
																						}
																					>
																						<span>contrato</span>{' '}
																						<DownloadIcon />
																					</button>
																				</div>
																			</span>
																		</dd>
																	</dl>
																</td>
																<td className="hidden px-3 py-4 text-sm text-brand lg:table-cell">
																	{user.name}
																</td>
																<td className="hidden cursor-pointer px-3 py-4 text-sm text-indigo-500/90 hover:text-indigo-700 sm:table-cell">
																	<div className="flex items-center gap-1">
																		<button
																			className="flex items-center gap-2 bg-transparent p-0 text-indigo-600 hover:bg-transparent hover:text-indigo-500"
																			onClick={() =>
																				saveAs(
																					`${user.booking.contrato}`,
																					'contrato.png',
																				)
																			}
																		>
																			<span>contrato</span> <DownloadIcon />
																		</button>
																	</div>
																</td>
																{!user.booking.active ? (
																	<td className="px-3 py-4 text-sm text-brand">
																		<span className="text-red-700">
																			Pendiente
																		</span>
																	</td>
																) : (
																	<td className="px-3 py-4 text-sm text-brand">
																		<FechaFull
																			day={
																				new Date(user.booking.endDate)
																					.toLocaleDateString('es-MX')
																					.split('/')[0]
																			}
																			month={
																				(
																					new Date(
																						user.booking.endDate,
																					).getMonth() + 1
																				).toLocaleString().length === 1
																					? '0' +
																					  (new Date(
																							user.booking.endDate,
																					  ).getMonth() +
																							1)
																					: (
																							new Date(
																								user.booking.endDate,
																							).getMonth() + 1
																					  ).toLocaleString()
																			}
																			year={
																				new Date(user.booking.endDate)
																					.toLocaleDateString('es-MX')
																					.split('/')[2]
																			}
																		/>
																	</td>
																)}
																<td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
																	{!user.booking.active ? (
																		<Link
																			reloadDocument
																			className="text-red-500/90 hover:text-red-700"
																			to={`./contrato/${user.id}`}
																		>
																			<MoreIcon
																				className="translate-y-1 transform"
																				aria-hidden="true"
																			/>
																			<span className="sr-only">
																				{user.name}
																			</span>
																		</Link>
																	) : (
																		<Link
																			reloadDocument
																			className="text-indigo-500/90 hover:text-indigo-700"
																			to={`./contrato/${user.id}`}
																		>
																			<MoreIcon
																				className="translate-y-1 transform"
																				aria-hidden="true"
																			/>
																			<span className="sr-only">
																				{user.name}
																			</span>
																		</Link>
																	)}
																</td>
															</tr>
														</>
													),
											)}
										</tbody>
									</table>
								</div>
							</div>
							<div className="mt-4 px-2 text-sm text-brand">
								<BackButton />
							</div>
						</>
					) : null}
				</>
			)}
		</>
	)
}

function CrearContrato() {
	let users = useLoaderData<UserProps[]>()
	return (
		<div className="[&>*:not(:first-child)]:mt-4">
			{users.map(
				user =>
					!user.booking && (
						<div className="relative mx-auto rounded-lg border border-blue-500 bg-blue-100/70 px-5 py-2.5 text-sm leading-relaxed text-blue-500 md:mt-5">
							<div className="flex items-center gap-1">
								<InfoCircleIcon /> {user.name} no tiene contrato{' '}
								<Link
									className="text-indigo-500 underline hover:text-indigo-600"
									to={`./contrato/${user.id}/nuevo`}
								>
									crear uno
								</Link>
							</div>
						</div>
					),
			)}
		</div>
	)
}
