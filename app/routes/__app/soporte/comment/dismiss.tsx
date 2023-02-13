import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { dismissUserComment } from '~/models/comment.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	let id = formData.get('id') as string
	let ticketId = formData.get('ticketId') as string
	await dismissUserComment(id)
	return redirect(`/soporte/${ticketId}`)
}

export default () => null
