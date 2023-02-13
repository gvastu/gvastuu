import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { dismissUserMessage } from '~/models/message.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	let id = formData.get('id') as string
	await dismissUserMessage(id)
	return redirect(`/soporte/${id}`)
}

export default () => null
