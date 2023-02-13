import { useLoaderData, NavLink } from '@remix-run/react'
import { getLocations } from '~/models/location.server'
import { Propiedades } from '~/components/listas'
import { BackButton } from '~/components/shared'

export async function loader() {
	return await getLocations()
}

export default function () {
	let locations = useLoaderData()
	return (
		<>
			{!locations.length ? (
				<NoLocations />
			) : (
				<Propiedades locations={locations} />
			)}
		</>
	)
}

function NoLocations() {
	return (
		<>
			<div className="grid gap-2">
				<div
					className="place-center grid h-16 grid-flow-col"
					style={{ gridTemplateColumns: '1fr auto' }}
				>
					<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
						<p>No hay propiedades.</p>
						<BackButton />
					</div>
					<NavLink
						to="/propiedades/nueva"
						className={({ isActive }) =>
							isActive ? 'hidden' : 'btn my-auto text-xs sm:text-sm'
						}
					>
						Agregar nueva
					</NavLink>
				</div>
			</div>
		</>
	)
}
