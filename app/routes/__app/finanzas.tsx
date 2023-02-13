import type { MetaFunction, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	FinanzasLayout as Finanzas,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { FinanzasIcon } from '~/components/icons'
import { StaffNotifications } from '~/components/notifications'

export let meta: MetaFunction = () => ({
	title: 'Finanzas',
})

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, ['finanzas'])
}

export default function () {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData<typeof loader>()
	return (
		<>
			{role === 'finanzas' && (
				<Finanzas
					className="mx-auto w-11/12 max-w-5xl"
					title="Finanzas"
					icon={<FinanzasIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Finanzas>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Finanzas"
						icon={<FinanzasIcon />}
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
