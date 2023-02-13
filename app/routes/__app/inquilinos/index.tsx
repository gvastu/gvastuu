import type { ActionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { deleteUser, getUsers } from '~/models/user.server'
import { getApprovedSubmissions } from '~/models/submission.server'
import { MoreIcon } from '~/components/icons'
import { ConfirmAlert } from '~/components/alert'
import { BackButton } from '~/components/shared'
import { Prospectos, Aprobado } from '~/components/listas'

export async function loader() {
	const [users, prospects] = await Promise.all([
		getUsers(),
		getApprovedSubmissions(),
	])
	return { users, prospects }
}

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let providerId = formData.get('providerId')
	if (typeof providerId !== 'string') return null
	return deleteUser(providerId)
}

type UserProps = {
	id: string
	providerId: string
	name: string
	email: string
	phone: string
	location: string
	isActive: boolean
}

export default function () {
	let { users, prospects } = useLoaderData()
	return (
		<>
			{users.length > 0 ? (
				<div className="grid gap-2 px-2 sm:px-0">
					<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
						{!!prospects.length && (
							<h2 className="mb-1 indent-1 text-sm italic text-brand sm:text-base">
								Inquilinos
							</h2>
						)}
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-900 sm:pl-6"
									>
										Nombre
									</th>
									<th
										scope="col"
										className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 lg:table-cell"
									>
										Propiedad
									</th>
									<th
										scope="col"
										className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
									>
										Correo
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
									>
										Teléfono
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span className="sr-only">Ver</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{users.map((user: UserProps) => (
									<>
										<tr
											key={user.id}
											className={`relative ${!user.isActive && 'bg-red-50'}`}
										>
											<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6">
												{user.name}
												<dl className="lg:hidden">
													<dt className="sr-only">Propiedad</dt>
													<dd className="mt-1 truncate text-brand opacity-80">
														{!user.location ? (
															<p className="text-red-800">
																Sin propiedad asignada
															</p>
														) : (
															user.location
														)}
													</dd>
													<dt className="sr-only sm:hidden">Email</dt>
													<dd className="mt-1 truncate text-indigo-500/90 hover:text-indigo-700 sm:hidden">
														<a href={`mailto:${user.email}`}>{user.email}</a>
													</dd>
												</dl>
											</td>
											<td className="hidden px-3 py-4 text-sm text-brand lg:table-cell">
												{!user.location ? (
													<p className="text-red-800">Sin propiedad asignada</p>
												) : (
													user.location
												)}
											</td>
											<td className="hidden px-3 py-4 text-sm text-indigo-500/90 hover:text-indigo-700 sm:table-cell">
												<a href={`mailto:${user.email}`}>{user.email}</a>
											</td>
											<td className="px-3 py-4 text-sm text-indigo-500/90 hover:text-indigo-700">
												<a href={`tel:${user.phone}`}>{user.phone}</a>
											</td>
											<td className="relative">
												<Link reloadDocument to={`./${user.id}`}>
													<MoreIcon
														className="m-auto text-sm text-indigo-500/90 hover:text-indigo-700"
														aria-hidden="true"
													/>
													<span className="sr-only">{user.name}</span>
												</Link>
											</td>
											{!user.isActive && (
												<DeleteUser
													key={user.providerId}
													providerId={user.providerId}
												/>
											)}
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className="my-5">
					<div className="grid gap-2 px-2 sm:px-0">
						<div
							className="place-center grid grid-flow-col"
							style={{ gridTemplateColumns: '1fr auto' }}
						>
							<div className="grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
								<p>No hay inquilinos registrados</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{!prospects.length ? null : (
				<Prospectos
					heading="Por confirmar cuenta"
					headings={['Nombre', 'Correo', 'Teléfono', 'Documentos']}
					users={prospects}
					resourceComponent={Aprobado}
				/>
			)}
			<div className="mt-5 px-2 text-sm text-brand">
				<BackButton />
			</div>
		</>
	)
}

function DeleteUser({ providerId }: { providerId: string }) {
	return (
		<ConfirmAlert
			descriptionTitle="Confirma que deseas eliminar al usuario"
			descriptionBody="Al realizar esto, el usuario y su información se eliminará del sistema permanentemente."
		>
			<Form method="post" reloadDocument>
				<input type="hidden" name="providerId" value={providerId} />
				<button
					type="submit"
					className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
				>
					Confirmar
				</button>
			</Form>
		</ConfirmAlert>
	)
}
