import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { UserNotifications } from '~/components/notifications'
import { UserLayout } from '~/components/dashboards/layouts'
import { UserIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'
import { UnactiveUser } from '~/components/users'
import type { UserProfileProps } from '~/components/users/profile'
import { UserProfile } from '~/components/users/profile'
import type { User } from '~/models/user.server'
import {
	activateAccount,
	getReferrer,
	getUserProfileDetails,
	requireUser,
} from '~/models/user.server'
import { sessionStorage } from '~/services/auth'

export async function loader({ request }: LoaderArgs) {
	let user = (await requireUser(request)) as Awaited<User>
	if (!user) throw redirect(getReferrer(request))

	let details = await getUserProfileDetails(user.providerId)
	if (!details) throw redirect(getReferrer(request))

	return { ...user, ...details }
}

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let userId = formData.get('userId')
	let locationId = formData.get('locationId')
	if (typeof userId !== 'string' || typeof locationId !== 'string') return null

	let session = await sessionStorage.getSession()

	await activateAccount(userId, locationId)

	return redirect('/', {
		headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
	})
}

export default function () {
	let user = useLoaderData<UserProfileProps>()
	let { data } = useMatches()[1]?.data
	return (
		<>
			{!user.account ? (
				<UnactiveUser user={user} />
			) : (
				<>
					<UserNotifications
						notifications={[
							...data.userAnnouncementDetails,
							...data.userCommentNotifications,
						]}
					/>
					<UserLayout
						className="mx-auto w-11/12 max-w-5xl"
						title="Mi perfil"
						icon={<UserIcon />}
					>
						<UserProfile user={user} />
						<div className="mt-5 px-2 text-sm text-brand">
							<BackButton />
						</div>
					</UserLayout>
				</>
			)}
		</>
	)
}
