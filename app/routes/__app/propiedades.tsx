import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	ComercialLayout as Comercial,
	LegalLayout as Legal,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { PropiedadIcon } from '~/components/icons'

export let meta: MetaFunction = () => ({
	title: 'Propiedades',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['comercial', 'legal'])
}

export default function Screen() {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	return (
		<>
			{role === 'comercial' && (
				<Comercial
					className="mx-auto w-11/12 max-w-5xl"
					title="Propiedades"
					icon={<PropiedadIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Comercial>
			)}
			{role === 'legal' && (
				<Legal
					className="mx-auto w-11/12 max-w-5xl"
					title="Propiedades"
					icon={<PropiedadIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Legal>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Propiedades"
						icon={<PropiedadIcon />}
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
