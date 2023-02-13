import type { LoaderArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { verifyAuth } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	return await verifyAuth(request)
}

export default () => <Outlet />
