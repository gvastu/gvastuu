import type { Booking, Location, User } from '@prisma/client'
import { db } from '~/utils/db.server'

export type { Location } from '@prisma/client'

export async function createBooking(
	userId: User['id'],
	locationId: Location['id'],
	contrato: Booking['contrato'],
	startDate: Date,
	amount: Booking['amount'],
) {
	let location = await db.location.update({
		where: { id: locationId },
		data: { isAvailable: false },
	})
	let booking = await db.booking.create({
		data: {
			user: { connect: { id: userId } },
			location: { connect: { id: locationId } },
			contrato,
			startDate,
			endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			amount,
		},
	})
	if (!booking) {
		return null
	}
	return { location, booking }
}

export async function deleteBooking(
	userId: Booking['userId'],
	locationId: string,
) {
	await db.user.update({
		where: { id: userId },
		data: {
			account: false,
			booking: {
				update: {
					active: false,
				},
			},
		},
	})
	await db.location.update({
		where: { id: locationId },
		data: { isAvailable: true },
	})
	await db.booking.delete({
		where: { userId, locationId },
	})
	return {}
}
