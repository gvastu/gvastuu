import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { validationError } from 'remix-validated-form'
import { Announcement, validator } from '~/components/shared'
import { createAnnouncement } from '~/models/announcement.server'
import { getUserId, getUserInputFields } from '~/models/user.server'

export async function loader() {
	return getUserInputFields()
}

export async function action({ request }: ActionArgs) {
	let id = (await getUserId(request)) as string
	let data = await validator.validate(await request.formData())
	if (data.error) {
		return validationError(data.error)
	}
	let { title, content, user } = data.data

	user
		.map(user => ({
			title,
			content,
			user: user.user,
			id,
			announcementType: 'general',
		}))
		.map(({ title, content, user, id, announcementType }) =>
			createAnnouncement(title, content, user, id, announcementType),
		)
	return redirect('/anuncios')
}

export default function () {
	let users = useLoaderData()
	return (
		<Announcement
			users={users}
			title="Redacta el anuncio público que quieres realizar"
			audience="general"
		/>
	)
}
