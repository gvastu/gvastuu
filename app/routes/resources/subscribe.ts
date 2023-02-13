import type { ActionArgs } from '@remix-run/node'
import { SaveSubscription } from '~/utils'

export async function action({ request }: ActionArgs) {
	const data = await request.json()
	const subscription = data.subscription

	SaveSubscription(subscription)

	console.log('New subscription saved!')

	return { message: 'Done' }
}

export async function loader() {
	if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
		console.log('Error')
		return
	}

	const publicKey = process.env.VAPID_PUBLIC_KEY

	return new Response(publicKey, {
		status: 202,
		statusText: 'Successful Operation',
	})
}
