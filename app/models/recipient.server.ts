import type { Recipient } from '@prisma/client'
import { db } from '~/utils/db.server'
export type { Recipient }

// Queries
export async function getNotification(
	announcementId: Recipient['announcementId'],
	userId: Recipient['userId'],
) {
	return await db.recipient.findFirst({
		where: {
			announcementId,
			userId,
		},
	})
}

export async function getNotifications(userId: Recipient['userId']) {
	let data = await db.recipient.findMany({
		where: {
			userId,
			isVisible: true,
		},
		select: {
			userId: true,
			isVisible: true,
			announcement: true,
		},
	})
	return data.map(notification => ({
		id: notification.announcement.id,
		userId: notification.userId,
		title: notification.announcement.title,
		content: notification.announcement.content,
		isVisible: notification.isVisible,
	}))
}

// Mutations
export async function dismissNotification(
	announcementId: Recipient['announcementId'],
	userId: Recipient['userId'],
) {
	return await db.recipient.update({
		where: {
			recipientId: {
				announcementId,
				userId,
			},
		},
		data: {
			isVisible: false,
		},
	})
}
