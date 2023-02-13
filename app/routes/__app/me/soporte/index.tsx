import type { LoaderArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { UserNotifications } from '~/components/notifications'
import { UserLayout as Layout } from '~/components/dashboards/layouts'
import { SoporteIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'
import { Tickets } from '~/components/users'
import { getUserTickets } from '~/models/message.server'
import { getUserId } from '~/models/user.server'

export async function loader({ request }: LoaderArgs) {
	let id = (await getUserId(request)) as string
	return await getUserTickets(id)
}

export default function () {
	let { data } = useMatches()[1]?.data
	let { booking, messages } = useLoaderData()
	return (
		<>
			<UserNotifications
				notifications={[
					...data.userAnnouncementDetails,
					...data.userCommentNotifications,
				]}
			/>
			<Layout
				className="mx-auto w-11/12 max-w-5xl"
				title="Mis tickets"
				icon={<SoporteIcon />}
			>
				{!booking ? (
					<p className="text-sm">
						Para poder crear tickets, debes tener contrato vigente o algún
						servicio relacionado.
					</p>
				) : !messages ? (
					<div className="grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
						<p>No tienes tickets</p>
						<div className="grid">
							<BackButton />
							<Link to="./nuevo" className="btn ml-auto text-sm">
								Crear un ticket
							</Link>
							<Outlet />
						</div>
					</div>
				) : (
					<>
						{!messages.length ? (
							<>
								<p className="mb-2.5 text-brand">No tienes tickets</p>
								<div className="px-2 text-sm text-brand">
									<BackButton />
								</div>
							</>
						) : (
							<>
								<Tickets messages={messages} />
								<div className="px-2 text-sm text-brand">
									<BackButton />
								</div>
							</>
						)}
						<div className="grid">
							<Link to="./nuevo" className="btn ml-auto text-sm">
								Crear un ticket
							</Link>
							<Outlet />
						</div>
					</>
				)}
			</Layout>
		</>
	)
}
