import type { LoaderArgs } from '@remix-run/node'
import type { SocialsProvider } from 'remix-auth-socials'
import { Link } from '@remix-run/react'
import { authenticator } from '~/services/auth'
import logo from '~/images/logo.png'

export async function loader({ request, params }: LoaderArgs) {
	return await authenticator.authenticate(
		params.provider as SocialsProvider,
		request,
		{
			successRedirect: '/',
			throwOnError: true,
		},
	)
}

export function ErrorBoundary({ error }: any) {
	return (
		<div className="grid h-screen bg-brand-dark text-slate-300">
			<div className="m-auto w-11/12 sm:w-10/12">
				<div className="m-auto sm:mt-8 sm:h-36 sm:w-40">
					<Link to="/">
						<img
							className="m-auto"
							src={logo}
							alt="Grupo Vastuu"
							width={160}
							height={160}
						/>
					</Link>
				</div>
				<p className="my-4 text-center text-red-400">{error.message}</p>
				<div className="mx-auto my-4 grid w-max place-content-center justify-between gap-2 text-center sm:my-5 sm:flex sm:gap-x-3">
					<div className="flex items-center gap-2">
						<p>Si no tienes cuenta,</p>
						<Link className="text-indigo-400 underline" to="/registro">
							regístrate.
						</Link>
					</div>
					<div className="flex gap-2">
						<p>De lo contrario,</p>
						<Link className="text-indigo-400 underline" to="/login">
							inicia sesión.
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default () => null
