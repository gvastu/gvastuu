import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData, Form, Link } from '@remix-run/react'
import { json } from '@remix-run/node'
import { getLocation, updateLocation } from '~/models/location.server'
import { MoreIcon } from '~/components/icons'
import { ConfirmAlert } from '~/components/alert'

export let loader: LoaderFunction = async ({ request }) => {
	let id = new URL(request.url).pathname.split('/')[2]
	return getLocation(id)
}

export let action: ActionFunction = async ({ request }) => {
	let formData = await request.formData()
	let id = formData.get('id') as string
	let name = formData.get('name') as string
	let address = formData.get('address') as string
	return json(await updateLocation(name, address, id), { status: 201 })
}

export default function () {
	let location = useLoaderData<any>()
	return (
		<EditarPropiedad
			name={location.name}
			address={location.address}
			id={location.id}
		>
			{!location.isAvailable ? (
				<NoDisponible />
			) : (
				<>
					{!location?.payments.length ? (
						<>
							<EliminarPropiedad id={location.id} />
						</>
					) : (
						<ArchivarPropiedad id={location.id} />
					)}
				</>
			)}
		</EditarPropiedad>
	)
}

function EditarPropiedad({
	id,
	name,
	address,
	children,
}: {
	id: string
	name: string
	address: string
	children?: React.ReactNode
}) {
	return (
		<>
			<div className="relative p-4">
				<div className="overflow-hidden rounded-xl bg-slate-50 px-8 pt-6 shadow ring-1 ring-black ring-opacity-5">
					<div>
						<h3 className="font-sans text-base text-brand">
							Editar información de {name}
						</h3>
					</div>
					<Form
						reloadDocument
						className="mt-5 border-t border-gray-200"
						method="post"
					>
						<input type="hidden" name="id" value={id} />
						<div className="divide-y divide-gray-200">
							<div className="py-3 sm:py-5">
								<label className="items-center sm:flex">
									<span className="text-sm text-gray-500 sm:w-1/3">Nombre</span>
									<div className="mt-1.5 flex-1 sm:mt-0">
										<input
											className='focus:outline-none" w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none'
											type="text"
											name="name"
											defaultValue={name}
										/>
									</div>
								</label>
							</div>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="py-3 sm:py-5">
								<label className="items-center sm:flex">
									<span className="w-1/3 text-sm text-gray-500">Dirección</span>
									<div className="mt-1.5 flex-1 sm:mt-0">
										<input
											className='focus:outline-none" w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none'
											type="text"
											name="address"
											defaultValue={address}
										/>
									</div>
								</label>
							</div>
						</div>
						<div className="mt-4 flex items-center border-t py-4 sm:py-5">
							<button type="submit" className="btn ml-auto text-sm">
								Guardar
							</button>
						</div>
					</Form>
					{children}
				</div>
			</div>
			<Link
				to=".."
				className="flex items-center gap-1 pl-6 pt-3 text-indigo-600 hover:text-indigo-500"
			>
				<MoreIcon className="rotate-180 transform" aria-hidden="true" />
				<p className="text-sm leading-4">Regresar</p>
			</Link>
		</>
	)
}

function NoDisponible() {
	return (
		<div className="transform pb-5 text-xxs leading-4 text-red-500 sm:-translate-y-12 sm:p-0 sm:text-xs">
			<p>* No puedes eliminar esta propiedad</p>
			<p className="sm:indent-2">porque está ocupada</p>
		</div>
	)
}

function EliminarPropiedad({ id }: { id: string }) {
	return (
		<ConfirmAlert
			cta="Eliminar propiedad"
			descriptionTitle="Confirma que deseas eliminar la propiedad"
			descriptionBody="Al realizar esto, la propiedad se eliminará del sistema permanentemente."
			className="w-max transform bg-transparent p-0 pb-4 text-sm text-red-800 hover:bg-transparent hover:text-red-600 focus:border-none focus:outline-none sm:-translate-y-12 sm:p-0"
		>
			<Form method="post" action="delete">
				<input type="hidden" name="id" value={id} />
				<button
					type="submit"
					name="action"
					value="delete"
					className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
				>
					Eliminar
				</button>
			</Form>
		</ConfirmAlert>
	)
}

function ArchivarPropiedad({ id }: { id: string }) {
	return (
		<div className="transform pb-4 text-xxs leading-5 text-red-500 sm:-translate-y-12 sm:p-0 sm:text-xs">
			<p>* No puedes eliminar esta propiedad</p>
			<p className="sm:pb-2 sm:indent-2">porque tiene historial de pagos</p>
			<ConfirmAlert
				cta="Archivar propiedad"
				descriptionTitle="Confirma que deseas archivar la propiedad"
				descriptionBody="Al realizar esto, la propiedad se eliminará de la lista de propiedades, pero se mantendrá en el sistema la información de pagos y mensajes asociados a esta."
				className="mt-2 w-max bg-transparent p-0 text-sm text-red-800 hover:bg-transparent hover:text-red-600 focus:border-none focus:outline-none"
			>
				<Form method="post" action="archive">
					<input type="hidden" name="id" value={id} />
					<button
						type="submit"
						name="action"
						value="archive"
						className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
					>
						Archivar
					</button>
				</Form>
			</ConfirmAlert>
		</div>
	)
}
