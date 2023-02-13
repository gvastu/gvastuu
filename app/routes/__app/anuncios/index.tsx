import { useLoaderData } from '@remix-run/react'
import { SubmitTicket } from '~/components/elements'
import { BackButton, FullDate } from '~/components/shared'
import { getAnnouncements } from '~/models/announcement.server'
import { getUserList } from '~/models/user.server'

type UserData = {
	id: string
	name: string
}

type AnnouncementData = {
	id: string
	createdAt: string
	title: string
	content: string
	isPublic: boolean
	archived: boolean
	recipient: [
		{
			announcementId: string
			userId: string
		},
	]
}

type LoaderData = {
	users: UserData[] | null
	announcements: AnnouncementData[] | null
}

export async function loader() {
	const [users, announcements] = await Promise.all([
		getUserList(),
		getAnnouncements(),
	])
	return { users, announcements }
}

export default function () {
	let { users, announcements } = useLoaderData<LoaderData>()
	return (
		<>
			{!users ? (
				<div className="my-5">
					<div className="grid gap-2 px-2 sm:px-0">
						<div
							className="place-center grid grid-flow-col"
							style={{ gridTemplateColumns: '1fr auto' }}
						>
							<div className="grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
								<p>Para crear anuncios, debes tener contratos activos.</p>
								<BackButton />
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{announcements ? (
						<Announcements announcements={[...announcements]} />
					) : (
						<div className="my-5">
							<div className="grid gap-2 px-2 sm:px-0">
								<div
									className="place-center grid grid-flow-col"
									style={{ gridTemplateColumns: '1fr auto' }}
								>
									<div className="grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
										<p>No hay anuncios</p>
										<BackButton />
									</div>
									<div className="ml-auto w-max text-sm">
										<SubmitTicket />
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	)
}

function Announcements({
	announcements,
}: {
	announcements: AnnouncementData[]
}) {
	return (
		<>
			<h2 className="px-2 py-4 text-sm">Lista de anuncios:</h2>
			{announcements.map(announcement => (
				<Announcement key={announcement.id} {...announcement} />
			))}
			<div className="px-2 pt-6 text-sm text-brand">
				<BackButton />
			</div>
			<div className="ml-auto w-max text-sm">
				<SubmitTicket />
			</div>
		</>
	)
}

function Announcement(announcement: AnnouncementData) {
	return (
		<>
			<div className="mt-6 grid gap-5 first-of-type:mt-0">
				<div
					key={announcement.id}
					className="relative grid max-w-prose gap-2 rounded-md border bg-white py-8 px-3 pt-2 pb-3 text-brand sm:max-w-none sm:rounded-md sm:p-4 sm:shadow"
				>
					<span className="absolute right-4 top-2 text-xxs sm:top-4 sm:text-xs">
						{announcement.isPublic ? 'Anuncio general' : 'Anuncio individual'}
					</span>
					<h2 className="text-sm text-brand sm:text-base">
						{announcement.title}
					</h2>
					<div className="relative text-sm">
						<p> {announcement.content}</p>
					</div>
					<div className="grid grid-flow-col">
						<div className="ml-auto self-end font-sans text-xs text-slate-500">
							<FullDate
								day={new Date(announcement.createdAt).getDate()}
								month={new Date(announcement.createdAt).getMonth()}
								year={new Date(announcement.createdAt).getFullYear()}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
