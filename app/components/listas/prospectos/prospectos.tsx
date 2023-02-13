import { Menu, MenuButton, MenuList } from '@reach/menu-button'
import { Form } from '@remix-run/react'
import saveAs from 'file-saver'
import { ConfirmAlert } from '~/components/alert'
import { ActionIcon, DownloadIcon } from '~/components/icons'
import { GenericList } from '~/components/listas'

type ProspectoProps = {
	user: {
		name: string
		email: string
		phone: string
		credential: string
		consent: string
		authorized: boolean
	}
}

function Prospecto({ user }: ProspectoProps) {
	return (
		<>
			<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6">
				{user.name}
				<dl className="lg:hidden">
					<dt className="sr-only">Correo</dt>
					<dd className="mt-1 truncate text-brand opacity-80">{user.email}</dd>
					<dt className="sr-only sm:hidden">Teléfono</dt>
					<dd className="mt-1 truncate text-indigo-500/90 hover:text-indigo-700 sm:hidden">
						{user.phone}
					</dd>
				</dl>
			</td>
			<td className="hidden px-3 py-4 text-sm text-brand lg:table-cell">
				{user.email}
			</td>
			<td className="hidden px-3 py-4 text-sm sm:table-cell">{user.phone}</td>
			<td className="grid place-items-start gap-1 px-3 py-4 text-sm">
				<Documentos credentials={user.credential} consent={user.consent} />
			</td>
			<td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
				<Menu>
					<MenuButton style={{ backgroundColor: 'transparent' }}>
						<ActionIcon className="h-5 w-5 text-indigo-500 transition-all ease-in-out hover:text-indigo-600" />
					</MenuButton>
					<MenuList>
						<div className="grid gap-0.5 text-sm">
							<Form method="post">
								<input type="hidden" name="email" value={user.email} />
								<button
									type="submit"
									aria-label="update"
									name="_action"
									value="update"
									className="m-0 p-0 py-1 text-emerald-500 hover:bg-transparent hover:text-emerald-600"
								>
									Aceptar
								</button>
							</Form>
							<Form method="post">
								<input type="hidden" name="email" value={user.email} />
								<button
									type="submit"
									aria-label="delete"
									name="_action"
									value="delete"
									className="p-0 text-sm text-red-500 hover:bg-transparent hover:text-red-600"
								>
									Eliminar
								</button>
							</Form>
						</div>
					</MenuList>
				</Menu>
			</td>
		</>
	)
}

function Aprobado({ user }: ProspectoProps) {
	return (
		<>
			<td
				key={user.email}
				className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6"
			>
				{user.name}
				<dl className="lg:hidden">
					<dt className="sr-only">Correo</dt>
					<dd className="mt-1 truncate text-brand opacity-80">{user.email}</dd>
					<dt className="sr-only sm:hidden">Teléfono</dt>
					<dd className="mt-1 truncate text-indigo-500/90 hover:text-indigo-700 sm:hidden">
						{user.phone}
					</dd>
				</dl>
			</td>
			<td className="hidden px-3 py-4 text-sm text-brand lg:table-cell">
				{user.email}
			</td>
			<td className="hidden px-3 py-4 text-sm sm:table-cell">{user.phone}</td>
			<td className="grid place-items-start gap-1 px-3 py-4 text-sm">
				<Documentos credentials={user.credential} consent={user.consent} />
			</td>
			<td className="relative text-sm">
				<span className="align-center flex justify-center sm:hidden">✅</span>
				<p className="hidden px-4 pl-3 pr-6 text-right text-green-500 sm:block">
					Aprobado
				</p>
				<DeleteApproved email={user.email} />
			</td>
		</>
	)
}

function DeleteApproved({ email }: { email: string }) {
	return (
		<ConfirmAlert
			descriptionTitle="Confirma que deseas eliminar al usuario"
			descriptionBody="Al realizar esto, el usuario y su información se eliminará del sistema permanentemente."
		>
			<Form method="post" reloadDocument action="/inquilinos/delete">
				<input type="hidden" name="email" value={email} />
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

function Documentos({
	credentials,
	consent,
}: {
	credentials: string
	consent: string
}) {
	let credentialsDocument = () => {
		saveAs(`${credentials}`, 'identificacion.png')
	}
	let consentDocument = () => {
		saveAs(`${consent}`, 'comprobante.png')
	}
	return (
		<td className="text-sm">
			<div className="flex items-center gap-1">
				<button className="btn-link" onClick={credentialsDocument}>
					<span>identificación</span>
					<DownloadIcon aria-hidden="true" />
				</button>
			</div>
			<div className="flex items-center gap-1">
				<button className="btn-link" onClick={consentDocument}>
					<span>comprobante</span>
					<DownloadIcon aria-hidden="true" />
				</button>
			</div>
		</td>
	)
}

export { GenericList as Prospectos, Prospecto, Aprobado }
