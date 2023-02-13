import type { Message, User } from '@prisma/client'
import { json } from '@remix-run/node'
import { db } from '~/utils/db.server'

// Queries
export type MessageData = {
	message: Awaited<ReturnType<typeof getMessage>>
}

export async function getMessage(
	id: Message['id'],
): Promise<MessageData | unknown> {
	let message = await db.message.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			title: true,
			body: true,
			category: true,
			createdAt: true,
			isSolved: true,
			comments: {
				select: {
					id: true,
					comment: true,
					commentBy: true,
				},
			},
			user: {
				select: {
					booking: {
						select: {
							location: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (!message) return null

	return {
		id: message.id,
		title: message.title,
		body: message.body,
		category: message.category,
		createdAt: message.createdAt,
		isSolved: message.isSolved,
		location: message.user.booking?.location.name,
		comments: message.comments,
	}
}

export type TicketsData = {
	tickets: Awaited<ReturnType<typeof getMessages>>
}

export async function getUserTickets(id: User['id']) {
	let data = await db.user.findUnique({
		where: { id },
		select: {
			booking: {
				select: {
					location: {
						select: {
							id: true,
						},
					},
				},
			},
			messages: {
				select: {
					id: true,
					title: true,
					createdAt: true,
					updatedAt: true,
					body: true,
					attachment: true,
					category: true,
					isSolved: true,
					comments: {
						select: {
							comment: true,
							message: true,
							messageId: true,
						},
					},
				},
			},
		},
	})
	if (!data?.booking) return json('No tienes servicio relacionado')
	if (!data.messages.length)
		return {
			booking: { id },
			messages: null,
		}
	let messages = data.messages
		.map(message => ({
			id: message.id,
			title: message.title,
			createdAt: message.createdAt,
			updatedAt: message.updatedAt,
			body: message.body,
			category: message.category,
			isSolved: message.isSolved,
			comments: message.comments,
		}))
		.filter(message => message.category)
	return { booking: { id }, messages }
}

export async function getMessages(): Promise<TicketsData | unknown | null> {
	let tickets = await db.message.findMany({
		where: {
			category: {
				in: ['ELECTRICO', 'FUGA', 'GAS', 'OTROS'],
			},
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			updatedAt: true,
			body: true,
			// attachment: true,
			category: true,
			// notification: true,
			isSolved: true,
			userId: true,
			comments: true,
			user: {
				select: {
					booking: {
						select: {
							location: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (!tickets.length) return null

	let messages = tickets.map(ticket => ({
		id: ticket.id,
		title: ticket.title,
		createdAt: ticket.createdAt,
		updatedAt: ticket.updatedAt,
		body: ticket.body,
		category: ticket.category,
		isSolved: ticket.isSolved,
		userId: ticket.userId,
		location: ticket.user.booking?.location.name,
	}))
	return messages
}

export async function getStaffNotifications() {
	let paymentNotifications = await db.message.findMany({
		where: {
			notification: 'PAYMENT',
		},
		select: {
			id: true,
			userId: true,
			title: true,
			body: true,
			archived: true,
		},
	})
	let ticketNotifications = await db.message.findMany({
		where: {
			category: {
				in: ['ELECTRICO', 'FUGA', 'GAS', 'OTROS'],
			},
		},
	})
	let commentNotifications = await db.comment.findMany({
		select: {
			commentBy: true,
			message: {
				select: {
					id: true,
					userId: true,
					title: true,
					body: true,
					archived: true,
				},
			},
		},
	})
	return { paymentNotifications, ticketNotifications, commentNotifications }
}

// Mutations
export async function createMessage(
	title: Message['title'],
	body: Message['body'],
	category: Message['category'],
	userId: User['id'],
) {
	return await db.message.create({
		data: {
			title,
			body,
			category,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	})
}

export async function createPaymentMessage(
	title: Message['title'],
	body: Message['body'],
	attachment: Message['attachment'],
	notification: Message['notification'],
	userId: User['id'],
) {
	return json(
		await db.message.create({
			data: {
				title,
				body,
				attachment,
				notification,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		}),
		201,
	)
}

// Dismiss ticket - user UI
export async function dismissTicket(
	id: Message['id'],
	userId: Message['userId'],
) {
	return await db.message.update({
		where: {
			id,
		},
		data: {
			dismissedBy: userId,
		},
	})
}

// Dismiss user ticket - staff UI
export async function dismissUserMessage(id: Message['id']) {
	return await db.message.update({
		where: {
			id,
		},
		data: {
			dismissed: true,
		},
	})
}

// Delete message
export async function deleteMessage(id: Message['id']) {
	return await db.message.delete({
		where: {
			id,
		},
	})
}
