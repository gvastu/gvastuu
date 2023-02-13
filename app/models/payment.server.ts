import type { Payment, Booking, Message } from '@prisma/client'
import { getCurrentMonth } from '~/utils'
import { db } from '~/utils/db.server'
import { deleteMessage } from './message.server'
export { deleteMessage as deletePaymentMessage } from './message.server'

export type { Payment } from '@prisma/client'

// Queries
export async function getPayment(id: Payment['id']) {
	return await db.payment.findUnique({
		where: { id },
		select: {
			id: true,
			date: true,
			archived: true,
			amount: true,
			location: {
				select: {
					name: true,
					booking: {
						select: {
							startDate: true,
						},
					},
				},
			},
			locationId: true,
		},
	})
}

export async function getLastUserPayment(
	userId: Booking['userId'],
	locationId: Booking['locationId'],
) {
	let payments = await db.booking.findMany({
		where: {
			userId,
			locationId,
		},
		select: {
			location: {
				select: {
					payments: true,
				},
			},
		},
	})
	let payment = payments[payments.length - 1]
	if (!payment) return null
	return payment.location.payments[0].date
}

export type UserPaymentsData = {
	payments: Awaited<ReturnType<typeof getPayments>>
}

export async function getPayments(): Promise<UserPaymentsData | unknown> {
	let payments = await db.payment.findMany({
		where: {
			date: {
				gte: getCurrentMonth(),
			},
		},
		select: {
			id: true,
			date: true,
			archived: true,
			amount: true,
			location: {
				select: {
					name: true,
					booking: {
						select: {
							user: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
			locationId: true,
		},
	})

	if (!payments) return null

	return payments.map(payment => ({
		id: payment.id,
		date: payment.date,
		archived: payment.archived,
		amount: payment.amount,
		location: payment.location.name,
		user: payment.location.booking?.user.name,
		locationId: payment.locationId,
	}))
}

export async function getPaymentsCount(locationId: Payment['locationId']) {
	return await db.payment.count({
		where: {
			locationId,
		},
	})
}

export async function getPaymentData(locationId: Booking['locationId']) {
	return await db.booking.findFirst({
		where: {
			locationId,
		},
		select: {
			startDate: true,
			location: {
				select: {
					name: true,
				},
			},
		},
	})
}

export let getMonthlyPaymentsById = async (lte: any, gte: any) => {
	let payments = await db.payment.findMany({
		where: {
			date: {
				lte: lte,
				gte: gte,
			},
		},
		select: {
			id: true,
			date: true,
			amount: true,
			locationId: true,
			location: {
				select: {
					name: true,
					booking: {
						select: {
							user: {
								select: {
									name: true,
								},
							},
							active: true,
							startDate: true,
							endDate: true,
						},
					},
				},
			},
		},
	})
	return payments.map(payment => ({
		id: payment.id,
		date: payment.date,
		amount: payment.amount,
		locationId: payment.locationId,
		location: payment.location.name,
		user: payment.location.booking?.user.name,
		active: payment.location.booking?.active,
		startDate: payment.location.booking?.startDate,
		endDate: payment.location.booking?.endDate,
	}))
}

export type PaymentReceipts = {
	user: Awaited<ReturnType<typeof getPaymentReceipt>>
}

export async function getPaymentReceipts(): Promise<PaymentReceipts | unknown> {
	let receipts = await db.message.findMany({
		where: {
			notification: 'PAYMENT',
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			body: true,
			attachment: true,
			user: {
				select: {
					id: true,
					name: true,
					booking: {
						select: {
							amount: true,
							location: {
								select: {
									id: true,
									name: true,
									payments: true,
								},
							},
						},
					},
				},
			},
		},
	})
	if (!receipts) throw new Response('No hay recibos', { status: 404 })
	return receipts.map(receipt => ({
		id: receipt.id,
		title: receipt.title,
		createdAt: receipt.createdAt,
		body: receipt.body,
		attachment: receipt.attachment,
		userId: receipt.user.id,
		name: receipt.user.name,
		amount: receipt.user?.booking?.amount,
		locationId: receipt.user?.booking?.location.id,
		location: receipt.user?.booking?.location.name,
		payments: receipt.user?.booking?.location.payments,
	}))
}

export async function getPaymentReceipt(id: Message['userId']) {
	return await db.message.findFirst({
		where: {
			userId: id,
		},
	})
}

// Mutations
export async function createPayment(
	amount: Payment['amount'],
	locationId: Payment['locationId'],
) {
	return await db.payment.create({
		data: {
			amount,
			locationId,
		},
	})
}

export async function deletePayment(id: Payment['id']) {
	return await db.payment.delete({
		where: {
			id,
		},
	})
}

export async function verifyPayment(
	id: Message['id'],
	amount: Payment['amount'],
	locationId: Payment['locationId'],
): Promise<any> {
	return await Promise.all([
		createPayment(amount, locationId),
		deleteMessage(id),
	])
}
