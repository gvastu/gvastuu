import { DownloadIcon } from '~/components/icons'
import { saveAs } from 'file-saver'
import { useFetcher } from '@remix-run/react'

export type UserProfileProps = {
	id: string
	providerId: string
	name: string
	email: string
	account: boolean
	phone: string
	referral: string
	credential: string
	consent: string
	userId: string
	contrato: string
	active: boolean
	startDate: string
	endDate: string
	location: {
		name: string
		address: string
	}
	locationId: string
}

export const UserProfile = ({
	user,
	children,
}: {
	user: UserProfileProps
	children?: React.ReactNode
}) => {
	return (
		<div className="grid gap-y-3">
			<div key={user.id} className="overflow-hidden rounded-lg bg-white shadow">
				<div className="px-4 py-2 sm:px-6">
					<dl className="grid grid-cols-1 gap-y-1 divide-y divide-gray-200 sm:grid-cols-2">
						<div className="py-4 sm:col-span-1">
							<dt className="font-medium text-sm text-gray-500">
								Nombre completo
							</dt>
							<dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
						</div>
						<div className="py-4 sm:col-span-1 sm:!border-t-transparent">
							<dt className="font-medium text-sm text-gray-500">
								Servicio relacionado
							</dt>
							<dd className="mt-1 text-sm text-gray-900">
								{!user.location ? 'Ninguno' : user.location.name}
							</dd>
						</div>
						<div className="py-4 sm:col-span-1">
							<dt className="font-medium text-sm text-gray-500">Correo</dt>
							<dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
						</div>
						<div className="py-4 sm:col-span-1">
							<dt className="font-medium text-sm text-gray-500">Teléfono</dt>
							<dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
						</div>
						<div className="py-4 sm:col-span-1">
							<dt className="font-medium text-sm text-gray-500">
								Numero de contacto
							</dt>
							<dd className="mt-1 text-sm text-gray-900">{user.referral}</dd>
						</div>
						<div className="py-4 sm:col-span-1">
							<dt className="font-medium text-sm text-gray-500">Contrato</dt>
							<dd className="mt-1 text-sm text-gray-900">
								<>
									{!user.contrato ? (
										'No tienes contrato'
									) : (
										<div className="flex justify-between sm:grid sm:grid-cols-2">
											<Contrato contrato={user.contrato} />
											{children}
										</div>
									)}
								</>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

function Contrato({ contrato }: { contrato: string }) {
	const saveFile = () => {
		saveAs(`${contrato}`, 'contrato.png')
	}
	return (
		<button
			className="flex items-center gap-1 bg-transparent p-0 text-indigo-600 hover:bg-transparent hover:text-indigo-500 focus:outline-none"
			onClick={saveFile}
		>
			<span>descargar</span> <DownloadIcon />
		</button>
	)
}

export const ContratoFormBox = ({
	userId,
	locationId,
}: {
	userId: string
	locationId: string
}) => {
	let fetcher = useFetcher()
	return (
		<fetcher.Form method="post">
			<input type="hidden" name="userId" value={userId} />
			<input type="hidden" name="locationId" value={locationId} />
			<div className="grid">
				<button
					className="btn mt-3 ml-auto px-4 py-2.5 text-sm sm:text-base"
					type="submit"
				>
					Aceptar contrato
				</button>
			</div>
		</fetcher.Form>
	)
}
