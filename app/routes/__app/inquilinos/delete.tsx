import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { deleteSubmission } from '~/models/submission.server'

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let email = formData.get('email') as string
	await deleteSubmission(email)
	return redirect('/inquilinos')
}

export default () => null
