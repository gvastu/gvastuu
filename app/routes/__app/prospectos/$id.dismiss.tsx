import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { dismissSubNotification } from '~/models/submission.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
  let email = formData.get('email') as string
	let user = formData.get('user') as string
  await dismissSubNotification(email, user)
	return redirect(`/prospectos`)
}

export default () => null

