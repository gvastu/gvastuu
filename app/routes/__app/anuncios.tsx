import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import {
	AdminLayout as Admin,
	ComercialLayout as Comercial,
	FinanzasLayout as Finanzas,
	LegalLayout as Legal,
	SoporteLayout as Soporte,
} from '~/components/dashboards/layouts'
import { AnnotationIcon } from '~/components/icons'
import { StaffNotifications } from '~/components/notifications'
import { requireStaffRole } from '~/models/user.server'

export let meta: MetaFunction = () => ({ title: 'Anuncios' })

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, [
		'soporte',
		'comercial',
		'finanzas',
		'legal',
	])
}

export default function () {
	let { data } = useMatches()[1]?.data
	let role = useLoaderData()
	return (
		<>
			{role === 'soporte' && (
				<Soporte
					className="mx-auto w-11/12 max-w-5xl"
					title="Anuncios"
					icon={<AnnotationIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Soporte>
			)}
			{role === 'comercial' && (
				<Comercial
					className="mx-auto w-11/12 max-w-5xl"
					title="Anuncios"
					icon={<AnnotationIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Comercial>
			)}
			{role === 'finanzas' && (
				<Finanzas
					className="mx-auto w-11/12 max-w-5xl"
					title="Anuncios"
					icon={<AnnotationIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Finanzas>
			)}
			{role === 'legal' && (
				<Legal
					className="mx-auto w-11/12 max-w-5xl"
					title="Anuncios"
					icon={<AnnotationIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Legal>
			)}
			{role === 'admin' && (
				<Admin
					className="mx-auto w-11/12 max-w-5xl"
					title="Anuncios"
					icon={<AnnotationIcon />}
				>
					<Outlet />
					<StaffNotifications notifications={data.notifications} role={role} />
				</Admin>
			)}
		</>
	)
}
