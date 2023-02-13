import type { Announcement, Recipient } from '@prisma/client'
import { db } from '~/utils/db.server'
export type { Announcement }

// Queries
export async function getRecipientList(id: Recipient['announcementId']) {
	return await db.recipient.findMany({
		where: { announcementId: id },
		select: {
			user: {
				select: {
					id: true,
				},
			},
			announcement: {
				select: {
					title: true,
					content: true,
				},
			},
		},
	})
}

export async function getAnnouncements() {
	let list = await db.announcement.findMany({
		distinct: ['createdAt'],
		select: {
			id: true,
			createdAt: true,
			title: true,
			content: true,
			isPublic: true,
			archived: true,
			recipient: {
				select: {
					announcementId: true,
					userId: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
	if (!list.length) return null
	return list.map(announcement => ({
		id: announcement.id,
		createdAt: announcement.createdAt,
		title: announcement.title,
		content: announcement.content,
		isPublic: announcement.isPublic,
		archived: announcement.archived,
		recipient: announcement.recipient.map(recipient => ({
			announcementId: recipient.announcementId,
			userId: recipient.userId,
		})),
	}))
}

// Mutations
export async function createAnnouncement(
	title: Announcement['title'],
	content: Announcement['content'],
	userId: Recipient['userId'],
	id: Announcement['authorId'],
	announcementType?: string,
) {
	let announcement = await db.announcement.create({
		data: {
			title,
			content,
			isPublic: announcementType === 'general' ? true : false,
			recipient: {
				create: { userId },
			},
			author: {
				connect: {
					id,
				},
			},
		},
	})

	let users = await getRecipientList(announcement.id)

	return users.map(announcement => ({
		user: announcement.user.id,
		title: announcement.announcement.title,
		content: announcement.announcement.content,
	}))
}

// Delete announcement
export async function deleteAnnouncement(id: Announcement['id']) {
	return await db.announcement.delete({
		where: {
			id,
		},
	})
}

// Delete user announcement
export async function deleteUserAnnouncement(
	announcementId: Announcement['id'],
	userId: Recipient['userId'],
) {
	return await db.recipient.delete({
		where: {
			recipientId: {
				announcementId,
				userId,
			},
		},
	})
}
