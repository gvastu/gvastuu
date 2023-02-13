import type { LoaderArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { authenticator } from '~/services/auth'
import { SocialsProvider } from 'remix-auth-socials'
import { LoginButton } from '~/services/auth/components'
import { Link } from '@remix-run/react'
import logo from '~/images/logo.png'

export async function loader({ request }: LoaderArgs) {
	const user = await authenticator.isAuthenticated(request)
	if (user) return redirect('/')
	return json({})
}

export default function Login() {
	return (
		<div className="grid h-screen bg-brand-dark text-slate-300">
			<div className="w-80 place-self-center">
				<Link to="/" className="focus:outline-none">
					<h1>
						<img
							src={logo}
							alt="Grupo Vastuu"
							className="m-auto mb-4 w-auto"
							width={160}
							height={160}
						/>
					</h1>
				</Link>
				<div className="grid place-content-center">
					<LoginButton
						provider={SocialsProvider.GOOGLE}
						className="btn mb-5 w-48"
					>
						<span>Iniciar sesión</span>
					</LoginButton>
				</div>
				<div className="text-center text-sm text-gray-400 sm:text-base">
					¿No tienes cuenta?{' '}
					<Link
						className="text-indigo-400 underline"
						to={{
							pathname: '/registro',
						}}
					>
						regístrate
					</Link>
				</div>
			</div>
		</div>
	)
}
