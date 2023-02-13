import type { MetaFunction } from '@remix-run/server-runtime'
import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	ComercialLayout as Comercial,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { ProspectosIcon } from '~/components/icons'

export let meta: MetaFunction = () => ({
	title: 'Prospectos',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['comercial'])
}

export default function Screen() {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	return (
		<>
			{role === 'comercial' && (
				<Comercial
					className="mx-auto w-11/12 max-w-5xl"
					title="Prospectos"
					icon={<ProspectosIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Comercial>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Prospectos"
						icon={<ProspectosIcon />}
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
