import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { dismissTicket } from '~/models/message.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	let id = formData.get('id') as string
	let userId = formData.get('userId') as string
	await dismissTicket(id, userId)
	return redirect(`/me/soporte/${id}`)
}

export default () => null
