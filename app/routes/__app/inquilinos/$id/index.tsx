import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getUserProfile, requireStaffRole } from '~/models/user.server'
import { MoreIcon } from '~/components/icons'
import { FileDownload } from '~/components/filedownload'

type LoaderData = {
	role: string
	user: {
		id: string
		name: string
		email: string
		phone: string
		referral: string
		credential: string
		consent: string
		contrato: string
		active: boolean
	}
}

export async function loader({ request, params }: LoaderArgs) {
	let { id } = params
	if (typeof id !== 'string') return null

	let [role, user] = await Promise.all([
		requireStaffRole(request, ['comercial']),
		getUserProfile(id),
	])

	if (!user) return json({ user: null }, { status: 404 })
	return json({ role, user })
}

export default function () {
	let { role, user } = useLoaderData<LoaderData>()
	return (
		<>
			<div className="relative sm:p-4">
				<div className="rounded-xl bg-slate-50 px-8 pt-6">
					<div>
						<h3 className="font-sans text-sm text-brand sm:text-base">
							Expediente de{' '}
							<span className="block py-0.5 sm:inline">{user.name}</span>
						</h3>
					</div>
					<div className="mt-5 border-t border-gray-200">
						<dl className="divide-y divide-gray-200">
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Nombre</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">{user.name}</span>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Correo</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">{user.email}</span>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Teléfono</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">{user.phone}</span>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Número de contacto</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">{user.referral}</span>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">
									Documento de identidad
								</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<div className="flex cursor-pointer items-center gap-1 text-indigo-500/90">
										<FileDownload
											doc={user.credential}
											filename="documento.jpg"
										/>
									</div>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">
									Comprobante de domicilio
								</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<div className="flex cursor-pointer items-center gap-1 text-indigo-500/90">
										<FileDownload
											doc={user.consent}
											filename="comprobante.jpg"
										/>
									</div>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<div className="max-w-max">
					<Link
						to=".."
						className="flex items-center gap-1 px-2 pt-5 text-indigo-600 hover:text-indigo-500"
					>
						<MoreIcon className="rotate-180 transform" aria-hidden="true" />
						<p className="text-sm leading-none">Regresar</p>
					</Link>
				</div>
				{role === 'admin' && (
					<>
						{!user.contrato ? (
							<>
								<div className="-mt-4 grid grid-flow-col place-content-end place-items-center gap-1 pr-2 text-indigo-700 hover:text-indigo-500">
									<Link
										className="flex cursor-pointer items-center pr-2 text-sm text-indigo-700 transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-indigo-500"
										to={`/legal/contrato/${user.id}/nuevo`}
									>
										Crear contrato
									</Link>
									<MoreIcon className="-ml-2.5 mt-1" aria-hidden="true" />
								</div>
							</>
						) : null}
					</>
				)}
			</div>
		</>
	)
}
