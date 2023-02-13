import { Link } from '@remix-run/react'
import { MoreIcon } from '~/components/icons'

function BackButton({
	legend = 'regresar',
	to = '/',
}: {
	legend?: string
	to?: string
}) {
	return (
		<Link
			className="flex w-max items-center gap-x-1 text-indigo-500 hover:text-indigo-600 focus:bg-transparent focus:text-inherit focus:outline-none"
			to={to}
		>
			<MoreIcon className="rotate-180 transform" aria-hidden="true" />
			{legend}
		</Link>
	)
}

export { BackButton }
