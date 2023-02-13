import type { ActionArgs } from '@remix-run/node'
import { dismissNotification } from '~/models/recipient.server'

export async function action({ request }: ActionArgs) {
	const formData = await request.formData()
	let announcementId = formData.get('announcementId') as string
	let userId = formData.get('userId') as string
	return await dismissNotification(announcementId, userId)
}

export default () => null
