import { Link } from '@remix-run/react'
import logo from '~/images/logo.png'

export function Splash() {
	return (
		<div className="grid h-screen bg-brand-dark text-slate-300">
			<div className="m-auto w-11/12 sm:w-10/12">
				<div className="m-auto sm:mt-8 sm:h-36 sm:w-40">
					<img
						className="m-auto"
						src={logo}
						alt="Grupo Vastuu"
						width={160}
						height={160}
					/>
					<p className="-mt-2 -ml-2 min-w-max text-center leading-none sm:text-sm">
						Bienvenido a Grupo Vastuu
					</p>
				</div>
				<div className="mx-auto my-10 grid w-max place-content-center justify-between gap-2 text-center sm:my-16 sm:flex sm:gap-x-3">
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
