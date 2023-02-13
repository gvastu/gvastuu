import { Form } from '@remix-run/react'
import Sheet from 'react-modal-sheet'
import { useState } from 'react'
import { BellIcon, FinanzasIcon, SoporteIcon } from '~/components/icons'

export type StaffNotificationProps = {
	id: string
	location?: string
	title: string
	content: string
	archived?: boolean
	dismissedBy?: string[]
	expiredNotice?: boolean
	ticketType: 'ticket' | 'submission' | 'expiring' | 'comment' | 'receipt'
}

function StaffNotifications({
	notifications,
	role,
}: {
	notifications: StaffNotificationProps[]
	role: string
}) {
	const [isOpen, setOpen] = useState(false)
	const tickets = notifications.filter(n => n.ticketType === 'ticket')
	const submissions = notifications.filter(n => n.ticketType === 'submission')
	const comments = notifications.filter(n => n.ticketType === 'comment')
	const receipts = notifications.filter(n => n.ticketType === 'receipt')

	return (
		<div className="absolute right-0.5 top-1.5 sm:right-[2vw] sm:top-[1vh]">
			<button className="bell" onClick={() => setOpen(true)}>
				{role === 'admin' && (
					<AdminNotificationsNumber notifications={notifications} />
				)}
				{role === 'comercial' && (
					<ComercialNotificationsNumber submissions={submissions} />
				)}
				{role === 'finanzas' && (
					<FinanzasNotificationsNumber receipts={receipts} />
				)}
				{role === 'soporte' && (
					<SoporteNotificationsNumber tickets={tickets} comments={comments} />
				)}
			</button>
			<Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
				<Sheet.Container>
					<Sheet.Content>
						{!notifications.length ? (
							<p className="italic">No tienes mensajes</p>
						) : (
							<>
								{role === 'admin' && (
									<AdminNotifications
										tickets={tickets}
										submissions={submissions}
										comments={comments}
										receipts={receipts}
									/>
								)}
								{role === 'comercial' && (
									<ComercialNotifications submissions={submissions} />
								)}
								{role === 'legal' && (
									<p className="italic">No tienes mensajes</p>
								)}
								{role === 'finanzas' && (
									<FinanzasNotifications receipts={receipts} />
								)}
								{role === 'soporte' && (
									<SoporteNotifications tickets={tickets} comments={comments} />
								)}
							</>
						)}
					</Sheet.Content>
				</Sheet.Container>
				<Sheet.Backdrop />
			</Sheet>
		</div>
	)
}

function TicketNotifications({
	tickets,
}: {
	tickets: StaffNotificationProps[]
}) {
	return (
		<>
			{tickets.length
				? tickets.map(ticket => (
						<div
							key={ticket.id}
							className="relative rounded-xl bg-white/25 px-4 py-2.5 leading-loose backdrop-blur transition hover:bg-white/75"
						>
							<div className="flex items-center gap-x-1.5 pb-2 text-sm text-indigo-600">
								<SoporteIcon /> <span>{ticket.location}</span>
							</div>
							<h2 className="flex items-center gap-x-1.5 pb-1.5 text-sm text-indigo-600">
								<span className="italic">Tema:</span>
								<span className="text-brand">{ticket.title}</span>
							</h2>
							<Form
								method="post"
								action={`/soporte/${ticket.id}/dismiss`}
								reloadDocument
								className="absolute inset-0"
							>
								<input type="hidden" name="id" value={ticket.id} />
								<button
									type="submit"
									className="absolute inset-0 bg-transparent p-0 hover:bg-transparent focus:outline-none"
								/>
							</Form>
							<div className="flex items-center gap-x-1.5">
								<p className="text-sm italic text-indigo-600">Mensaje:</p>
								<p className="flex-1 text-sm text-brand">{ticket.content}</p>
								<p className="text-xs italic text-indigo-700">
									Responder mensaje
								</p>
							</div>
						</div>
				  ))
				: null}
		</>
	)
}

type SubmissionProps = {
	id: string
	title: string
	content: string
	dismissedBy: string[]
	ticketType: 'submission'
}

function SubmissionNotifications({
	submissions,
}: {
	submissions: SubmissionProps[]
}) {
	return (
		<>
			{submissions.length
				? submissions.map(submission => (
						<div
							key={submission.id}
							className="relative rounded-xl bg-white/25 px-4 py-2.5 leading-loose backdrop-blur transition hover:bg-white/75"
						>
							<h2 className="flex items-center gap-x-1.5 pb-1.5 text-sm text-indigo-600">
								<span className="italic">{submission.title}</span>
							</h2>
							<Form
								method="post"
								action={`/prospectos/${submission.id}/dismiss`}
								reloadDocument
								className="absolute inset-0"
							>
								<input type="hidden" name="email" value={submission.id} />
								<input type="hidden" name="user" value={[]} />
								<button
									type="submit"
									className="absolute inset-0 bg-transparent p-0 hover:bg-transparent focus:outline-none"
								/>
							</Form>
							<div className="flex items-center gap-x-1.5">
								<p className="text-sm italic text-indigo-600">Prospecto:</p>
								<p className="flex-1 text-sm text-brand">
									{submission.content}
								</p>
								<p className="text-xs italic text-indigo-700">
									Revisar información
								</p>
							</div>
						</div>
				  ))
				: null}
		</>
	)
}

function CommentNotifications({ comments }: { comments: any[] }) {
	return (
		<>
			{comments.length
				? comments.map(comment => (
						<div
							key={comment.id}
							className="relative rounded-xl bg-white/25 px-4 py-2.5 leading-loose backdrop-blur transition hover:bg-white/75"
						>
							<div className="flex items-center gap-x-1.5 pb-2 text-sm text-indigo-600">
								<SoporteIcon /> <span>{comment.location}</span>
							</div>
							<h2 className="flex items-center gap-x-1.5 pb-1.5 text-sm text-indigo-600">
								<span className="italic">Tema:</span>
								<span className="text-brand">{comment.title}</span>
							</h2>
							<Form
								method="post"
								action="/soporte/comment/dismiss"
								reloadDocument
								className="absolute inset-0"
							>
								<input type="hidden" name="id" value={comment.id} />
								<input type="hidden" name="ticketId" value={comment.ticketId} />
								<button
									type="submit"
									className="absolute inset-0 bg-transparent p-0 hover:bg-transparent focus:outline-none"
								/>
							</Form>
							<div className="flex items-center gap-x-1.5">
								<p className="text-sm italic text-indigo-600">Mensaje:</p>
								<p className="flex-1 text-sm text-brand">{comment.content}</p>
								<p className="text-xs italic text-indigo-700">
									Responder mensaje
								</p>
							</div>
						</div>
				  ))
				: null}
		</>
	)
}

function ReceiptNotifications({ receipts }: { receipts: any[] }) {
	return (
		<>
			{receipts.length
				? receipts.map(receipt => (
						<div
							key={receipt.id}
							className="relative rounded-xl bg-white/25 px-4 py-2.5 leading-loose backdrop-blur transition hover:bg-white/75"
						>
							<div className="flex items-center gap-x-1.5 pb-2 text-sm text-indigo-600">
								<FinanzasIcon /> <span>{receipt.location}</span>
							</div>
							<h2 className="flex items-center gap-x-1.5 pb-1.5 text-sm text-indigo-600">
								<span className="italic">Tema:</span>
								<span className="text-brand">{receipt.title}</span>
							</h2>
							<Form
								method="post"
								action={`/finanzas/${receipt.id}/dismiss`}
								reloadDocument
								className="absolute inset-0"
							>
								<input type="hidden" name="id" value={receipt.id} />
								<button
									type="submit"
									className="absolute inset-0 bg-transparent p-0 hover:bg-transparent focus:outline-none"
								/>
							</Form>
							<div className="flex items-center gap-x-1.5">
								<p className="flex-1 text-sm text-brand">{receipt.content}</p>
								<p className="text-xs italic text-indigo-700">Verificar pago</p>
							</div>
						</div>
				  ))
				: null}
		</>
	)
}

function AdminNotifications({ tickets, submissions, comments, receipts }: any) {
	return (
		<>
			<TicketNotifications tickets={tickets} />
			<SubmissionNotifications
				// @ts-ignore
				submissions={submissions}
			/>
			<CommentNotifications comments={comments} />
			<ReceiptNotifications receipts={receipts} />
		</>
	)
}

function AdminNotificationsNumber({ notifications }: any) {
	return (
		<>
			<BellIcon className="bellIcon" />
			{notifications.length > 0 && (
				<div className="bellIconBubble">
					<span className="absolute -top-0.5 -left-[1px] indent-1 text-xxs leading-4">
						{notifications.length}
					</span>
				</div>
			)}
		</>
	)
}

function ComercialNotifications({ submissions }: any) {
	return (
		<SubmissionNotifications
			// @ts-ignore
			submissions={submissions}
		/>
	)
}

function ComercialNotificationsNumber({ submissions }: any) {
	return (
		<>
			<BellIcon className="bellIcon" />
			{submissions.length > 0 && (
				<div className="bellIconBubble">
					<span className="absolute -top-0.5 -left-[1px] indent-1 text-xxs leading-4">
						{submissions.length}
					</span>
				</div>
			)}
		</>
	)
}

function FinanzasNotifications({ receipts }: any) {
	return <ReceiptNotifications receipts={receipts} />
}

function FinanzasNotificationsNumber({ receipts }: any) {
	return (
		<>
			<BellIcon className="bellIcon" />
			{receipts.length > 0 && (
				<div className="bellIconBubble">
					<span className="absolute -top-0.5 -left-[1px] indent-1 text-xxs leading-4">
						{receipts.length}
					</span>
				</div>
			)}
		</>
	)
}

function SoporteNotifications({ tickets, comments }: any) {
	return (
		<>
			<TicketNotifications tickets={tickets} />
			<CommentNotifications comments={comments} />
		</>
	)
}

function SoporteNotificationsNumber({ tickets, comments }: any) {
	return (
		<>
			<BellIcon className="bellIcon" />
			{tickets.length > 0 && (
				<div className="bellIconBubble">
					<span className="absolute -top-0.5 -left-[1px] indent-1 text-xxs leading-4">
						{tickets.length + comments.length}
					</span>
				</div>
			)}
		</>
	)
}

export { StaffNotifications }
