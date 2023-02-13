import type { MetaFunction, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { requireStaffRole } from '~/models/user.server'
import {
	FinanzasLayout as Finanzas,
	AdminLayout as Admin,
} from '~/components/dashboards/layouts'
import { StaffNotifications } from '~/components/notifications'
import { ReceiptIcon } from '~/components/icons'

export let meta: MetaFunction = () => ({
	title: 'Recibos',
})

export let loader: LoaderFunction = async ({ request }) => {
	return requireStaffRole(request, ['finanzas'])
}

export default function () {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	return (
		<>
			{role === 'finanzas' && (
				<Finanzas
					className="mx-auto w-11/12 max-w-5xl"
					title="Recibos"
					icon={<ReceiptIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Finanzas>
			)}
			{role === 'admin' && (
				<>
					<Admin
						className="mx-auto w-11/12 max-w-5xl"
						title="Recibos"
						icon={<ReceiptIcon />}
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
