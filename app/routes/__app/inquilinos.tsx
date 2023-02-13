import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import {
	Outlet,
	useLoaderData,
	useLocation,
	useMatches,
} from '@remix-run/react'
import {
	AdminLayout as Admin,
	ComercialLayout as Comercial,
	LegalLayout as Legal,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { AddButton } from '~/components/elements'
import { UsersIcon } from '~/components/icons'
import { requireStaffRole } from '~/models/user.server'

export let meta: MetaFunction = () => ({
	title: 'Inquilinos',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['comercial', 'legal'])
}

export default function Screen() {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	let location = useLocation()
	return (
		<>
			{role === 'comercial' && (
				<Comercial
					className="mx-auto w-11/12 max-w-5xl"
					title="Inquilinos"
					icon={<UsersIcon />}
				>
					<Outlet />
					{location.pathname === '/inquilinos' && (
						<div className="grid place-content-end">
							<AddButton
								text="Agregar nuevo"
								path="/inquilinos/nuevo"
								className="btn text-sm"
							/>
						</div>
					)}
					<StaffNotifications notifications={data.notifications} role={role} />
				</Comercial>
			)}
			{role === 'legal' && (
				<Legal
					className="mx-auto w-11/12 max-w-5xl"
					title="Inquilinos"
					icon={<UsersIcon />}
				>
					<Outlet />
					{location.pathname === '/inquilinos' && (
						<div className="grid place-content-end">
							<AddButton
								text="Agregar nuevo"
								path="/inquilinos/nuevo"
								className="btn text-sm"
							/>
						</div>
					)}
					<StaffNotifications notifications={data.notifications} role={role} />
				</Legal>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Inquilinos"
						icon={<UsersIcon />}
					>
						<Outlet />
						{location.pathname === '/inquilinos' && (
							<div className="grid place-content-end">
								<AddButton
									text="Agregar nuevo"
									path="/inquilinos/nuevo"
									className="btn text-sm"
								/>
							</div>
						)}
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
