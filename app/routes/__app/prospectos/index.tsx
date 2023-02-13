import type { ActionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Prospectos, Prospecto } from '~/components/listas'
import {
	getSubmissions,
	approveSubmission,
	deleteSubmission,
} from '~/models/submission.server'
import { BackButton } from '~/components/shared'

export async function loader() {
	return await getSubmissions()
}

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let email = formData.get('email') as string
	let _action = formData.get('_action')

	if (_action === 'update') {
		await approveSubmission(email)
	}
	if (_action === 'delete') {
		await deleteSubmission(email)
	}
	return {}
}

export default function () {
	let users = useLoaderData()
	return (
		<>
			{!users.length ? (
				<div className="my-5 grid gap-y-5 pl-3 text-sm">
					<p>No hay prospectos</p>
					<BackButton />
				</div>
			) : (
				<Prospectos
					headings={['Nombre', 'Correo', 'Teléfono', 'Documentos']}
					users={users}
					resourceComponent={Prospecto}
				/>
			)}
		</>
	)
}
