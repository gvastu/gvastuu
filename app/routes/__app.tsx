import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Splash, StaffDashboard, Unactive, UserDashboard } from '~/components'
import { getStaffData, getUserData, verifyUser } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	let user = await verifyUser(request)
	if (!user) return null
	if ('role' in user)
		return {
			...user,
			data: await getStaffData(),
		}
	return { ...user, data: await getUserData(user.providerId) }
}

export default function AppRoute() {
	const user = useLoaderData()
	const location = useLocation()
	return (
		<>
			{location.pathname !== '/' ? (
				<Outlet />
			) : !user ? (
				<Splash />
			) : (
				<>
					{!user.role ? (
						<>
							{!user.account ? (
								<Unactive />
							) : (
								<>
									<UserDashboard user={user} />
								</>
							)}
						</>
					) : (
						<>
							<StaffDashboard user={user} />
						</>
					)}
				</>
			)}
		</>
	)
}
