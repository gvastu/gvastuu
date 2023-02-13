import { Link, NavLink } from '@remix-run/react'
import { EditIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'

type LocationProps = {
	location: {
		id: string
		name: string
		address: string
		isAvailable: boolean
		archived: boolean
		userId: string
	}
}[]

export function Propiedades({ locations }: { locations: LocationProps }) {
	return (
		<>
			<div className="mb-8 grid">
				<div className="-mx-4 mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
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
									Dirección
								</th>
								<th
									scope="col"
									className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
								>
									Disponibilidad
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
								>
									Inquilino
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Editar</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{locations.map((location: any) => (
								<tr key={location.id}>
									<td className="font-medium w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6">
										{location.name}
										<dl className="lg:hidden">
											<dt className="sr-only">Dirección</dt>
											<dd className="mt-1 truncate text-gray-700">
												{location.address}
											</dd>
											<dt className="sr-only sm:hidden">Disponibilidad</dt>
											<dd className="mt-1 truncate text-gray-500 sm:hidden">
												{location.isAvailable ? (
													<p className="text-sm text-emerald-600">Disponible</p>
												) : (
													<p className="text-sm text-red-600">No disponible</p>
												)}
											</dd>
										</dl>
									</td>
									<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
										{location.address}
									</td>
									<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
										{location.isAvailable ? (
											<p className="text-sm text-emerald-600">Disponible</p>
										) : (
											<p className="text-sm text-red-600">No disponible</p>
										)}
									</td>
									<td className="px-3 py-4 text-sm">Ninguno</td>
									<td className="font-medium py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
										<Link
											reloadDocument
											className="text-indigo-500/90 hover:text-indigo-700"
											to={`./${location.id}`}
										>
											<EditIcon className="mt-1" />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-5 w-max px-2 text-sm text-brand">
					<BackButton />
				</div>
				<div className="grid">
					<div className="ml-auto pt-4">
						<NavLink
							to="/propiedades/nueva"
							className={({ isActive }) =>
								isActive ? 'hidden' : 'btn my-auto text-xs sm:text-sm'
							}
						>
							Agregar nueva
						</NavLink>
					</div>
				</div>
			</div>
		</>
	)
}
