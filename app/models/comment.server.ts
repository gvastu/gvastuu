import type { Comment, Message } from '@prisma/client'
import { db } from '~/utils/db.server'

async function updateTicket(
	id: Message['id'],
	isSolved: Message['isSolved'],
	comment: Comment['comment'],
) {
	return await db.message.update({
		where: {
			id,
		},
		data: {
			comments: {
				create: {
					comment,
					commentBy: 'STAFF',
				},
			},
			isSolved,
		},
	})
}

// update ticket
async function postComment(id: Message['id'], comment: Comment['comment']) {
	return await db.message.update({
		where: {
			id,
		},
		data: {
			comments: {
				create: {
					comment,
					commentBy: 'INQUILINO',
				},
			},
		},
	})
}

async function dismissUserComment(id: Comment['id']) {
	return await db.comment.update({
		where: {
			id,
		},
		data: {
			dismissed: true,
		},
	})
}

export { updateTicket, postComment, dismissUserComment }
export { Comment }
