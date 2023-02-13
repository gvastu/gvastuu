import { Link } from '@remix-run/react'
import { MoreIcon } from '~/components/icons'
import { UserList } from '../lists'

function Inquilino({ user }: { user: any; itemProps: any }) {
	return (
		<>
			<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-brand sm:w-auto sm:max-w-none sm:pl-6">
				{user.name}
				<dl className="lg:hidden">
					<dt className="sr-only">Propiedad</dt>
					<dd className="mt-1 truncate text-brand opacity-80">
						{user?.location.length ? (
							user.location
						) : (
							<p className="text-red-800">Sin propiedad asignada</p>
						)}
					</dd>
					<dt className="sr-only sm:hidden">Email</dt>
					<dd className="mt-1 truncate text-indigo-500/90 hover:text-indigo-700 sm:hidden">
						<a href={`mailto:${user.email}`}>{user.email}</a>
					</dd>
				</dl>
			</td>
			<td className="hidden px-3 py-4 text-sm text-brand lg:table-cell">
				{user?.location.length ? (
					user.location
				) : (
					<p className="text-red-800">Sin propiedad asignada</p>
				)}
			</td>
			<td className="hidden px-3 py-4 text-sm text-indigo-500/90 hover:text-indigo-700 sm:table-cell">
				<a href={`mailto:${user.email}`}>{user.email}</a>
			</td>
			<td className="px-3 py-4 text-sm text-indigo-500/90 hover:text-indigo-700">
				<a href={`tel:${user.phone}`}>{user.phone}</a>
			</td>
			<td className="relative py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
				<Link
					reloadDocument
					className="text-indigo-500/90 hover:text-indigo-700"
					to={`./${user.id}`}
				>
					<MoreIcon className="translate-y-1 transform" aria-hidden="true" />
					<span className="sr-only">{user.name}</span>
				</Link>
			</td>
		</>
	)
}

export { UserList as Inquilinos, Inquilino }
