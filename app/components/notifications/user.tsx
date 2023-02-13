import { useFetcher, Form } from '@remix-run/react'
import { useState } from 'react'
import Sheet from 'react-modal-sheet'
import { BellIcon, XMarkIcon } from '~/components/icons'

export type UserNotificationProps = {
	id: string
	announcementId: string
	userId: string
	title: string
	content: string
	dismissedBy?: string
	isVisible?: boolean
}

function UserNotifications({
	notifications: notificationList,
}: {
	notifications: UserNotificationProps[]
}) {
	const [isOpen, setOpen] = useState(false)
	const fetcher = useFetcher()
	const notifications = [...notificationList]

	return (
		<div className="absolute right-0.5 top-1.5 sm:right-[2vw] sm:top-[1vh]">
			<button className="bell" onClick={() => setOpen(true)}>
				<BellIcon className="bellIcon" />
				{notifications.length > 0 && (
					<div className="bellIconBubble">
						<span className="absolute -top-0.5 -left-[1px] indent-1 text-xxs leading-4">
							{notifications.length}
						</span>
					</div>
				)}
			</button>
			<Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
				<Sheet.Container>
					<Sheet.Content>
						{!notifications.length ? (
							<p className="italic">No tienes mensajes</p>
						) : (
							<>
								{notifications.length &&
									notifications
										.filter(n => n.isVisible)
										.map(notification => (
											<div
												className="relative rounded-xl bg-white/25 px-4 py-2.5 backdrop-blur transition hover:bg-white/75"
												key={notification.announcementId}
											>
												<fetcher.Form
													method="post"
													action="/notificaciones/dismiss"
													className="absolute right-1.5 top-1.5"
												>
													<input
														type="hidden"
														name="announcementId"
														value={notification.announcementId}
													/>
													<input
														type="hidden"
														name="userId"
														value={notification.userId}
													/>
													<button
														type="submit"
														className="bg-transparent p-0 hover:bg-transparent focus:outline-none"
													>
														<XMarkIcon className="text-red-700" />
													</button>
												</fetcher.Form>
												<h3 className="pb-2 text-sm italic text-slate-800">
													{notification.title}
												</h3>
												<p className="text-sm text-brand">
													{notification.content}
												</p>
											</div>
										))}
								{notifications
									.filter(n => n.dismissedBy === null)
									.map(notification => (
										<div
											key={notification.id}
											className="relative rounded-xl bg-white/25 px-4 py-2.5 leading-loose backdrop-blur transition hover:bg-white/75"
										>
											<h2 className="pb-2 text-sm italic text-indigo-600">
												Respuesta de{' '}
												<span className="text-brand">
													{notification.title}:
												</span>
											</h2>
											<Form
												method="post"
												action={`/me/soporte/${notification.id}/dismiss`}
												reloadDocument
												className="absolute inset-0"
											>
												<input
													type="hidden"
													name="id"
													value={notification.id}
												/>
												<input
													type="hidden"
													name="userId"
													value={notification.userId}
												/>
												<button
													type="submit"
													className="absolute inset-0 bg-transparent p-0 hover:bg-transparent focus:outline-none"
												/>
											</Form>
											<div className="flex items-center">
												<p className="flex-1 text-sm text-brand">
													{notification.content}
												</p>
												<p className="text-xs italic text-indigo-700">
													Leer mensaje
												</p>
											</div>
										</div>
									))}
							</>
						)}
					</Sheet.Content>
				</Sheet.Container>
				<Sheet.Backdrop />
			</Sheet>
		</div>
	)
}

export { UserNotifications }
