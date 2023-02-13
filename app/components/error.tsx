import { Link } from '@remix-run/react'
import logo from '~/images/logo.png'
import { MoreIcon } from './icons'

export function Error({
	children = 'Regresar',
}: {
	children?: React.ReactNode
}) {
	return (
		<div className="grid h-screen place-content-center bg-brand-dark text-white">
			<div className="grid place-items-center">
				<img src={logo} alt="Grupo Vastuu" />
				<p className="text-center sm:text-xl">Está página no existe</p>
				<Link
					to="/"
					className="flex items-center gap-1 pt-3 text-indigo-600 hover:text-indigo-500"
				>
					<MoreIcon className="rotate-180 transform" aria-hidden="true" />
					<p className="text-center sm:text-xl">{children}</p>
				</Link>
			</div>
		</div>
	)
}
