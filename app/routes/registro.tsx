import type { MetaFunction, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth'
import { Link, Outlet } from '@remix-run/react'
import logo from '~/images/logo.png'

export let meta: MetaFunction = () => {
	return {
		title: 'Grupo Vastuu | Registro',
	}
}

export async function loader({ request }: LoaderArgs) {
	const user = await authenticator.isAuthenticated(request)
	if (user) return redirect('/admin')
	return json({})
}

export default function Registro() {
	return (
		<div className="grid min-h-screen bg-brand-dark text-slate-300">
			<div className="m-auto w-11/12 sm:w-10/12">
				<div className="mx-auto mt-4 h-auto w-32 sm:h-36 sm:w-40">
					<Link to="/" className="focus:outline-none">
						<h1>
							<img src={logo} alt="Grupo Vastuu" width={160} height={160} />
						</h1>
					</Link>
				</div>
				<Outlet />
			</div>
		</div>
	)
}
