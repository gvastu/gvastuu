import type { MetaFunction } from '@remix-run/server-runtime'
import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	SoporteLayout as Soporte,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { SoporteIcon } from '~/components/icons'

export let meta: MetaFunction = () => ({
	title: 'Tickets',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['soporte'])
}

export default function Screen() {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	return (
		<>
			{role === 'soporte' && (
				<Soporte
					className="mx-auto w-11/12 max-w-5xl"
					title="Tickets"
					icon={<SoporteIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Soporte>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Tickets"
						icon={<SoporteIcon />}
					>
						<Outlet />
						<StaffNotifications
							notifications={data.notifications}
							role={role}
						/>
					</Admin>
				</>
			)}
		</>
	)
}
