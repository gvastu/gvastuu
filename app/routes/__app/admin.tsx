import type { LoaderArgs } from '@remix-run/node'
import { requireStaffRole } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	return await requireStaffRole(request, [
		'comercial',
		'finanzas',
		'legal',
		'soporte',
	])
}
