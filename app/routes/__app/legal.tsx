import type { MetaFunction, LoaderArgs } from '@remix-run/node'
import { useLoaderData, Outlet, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	LegalLayout as Legal,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { LegalIcon } from '~/components/icons'

export let meta: MetaFunction = () => ({
	title: 'Legal',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['legal'])
}

export default function Screen() {
	let { data } = useMatches()[1]?.data

	let role = useLoaderData()
	return (
		<>
			{role === 'legal' && (
				<Legal
					className="mx-auto w-11/12 max-w-5xl"
					title="Jurídico"
					icon={<LegalIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Legal>
			)}
			{role === 'admin' && (
				<Admin
					className="mx-auto w-11/12 max-w-5xl"
					title="Jurídico"
					icon={<LegalIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Admin>
			)}
		</>
	)
}
