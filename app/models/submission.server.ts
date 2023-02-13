import type { Submission } from '@prisma/client'
import { db } from '~/utils/db.server'

export type { Submission }

// Queries
export async function getSubmissions() {
	return await db.submission.findMany({
		where: {
			authorized: false,
		},
	})
}

// Get aproved submissions
export async function getApprovedSubmissions() {
	return await db.submission.findMany({
		where: {
			authorized: true,
		},
	})
}

export async function verifyAuthorizedUser(email: string) {
	let user = await db.submission.findUnique({
		where: {
			email,
		},
	})
	if (!user || !user.authorized) throw new Error('No tienes acceso')
	return { user }
}

// Mutations
export async function createUserSubmission(
	name: string,
	email: string,
	phone: string,
	referral: string,
	credential: string,
	consent: string,
) {
	return await db.submission.create({
		data: {
			name,
			email,
			phone,
			referral,
			credential,
			consent,
		},
	})
}

export async function createUser(
	name: string,
	email: string,
	phone: string,
	referral: string,
	credential: string,
	consent: string,
) {
	await db.submission.create({
		data: {
			name,
			email,
			phone,
			referral,
			credential,
			consent,
			authorized: true,
		},
	})
}

export async function approveSubmission(email: string) {
	return await db.submission.update({
		where: {
			email,
		},
		data: {
			authorized: true,
		},
	})
}

export async function undoSubmissionUpdate(email: string) {
	return await db.submission.update({
		where: {
			email,
		},
		data: {
			authorized: false,
		},
	})
}

// Update submission status
export async function dismissSubNotification(email: string, user: string) {
	return await db.submission.update({
		where: {
      email,
		},
    data: {
      dismissedBy: user, 
    },
	})
}

export const deleteSubmission = async (email: Submission['email']) => {
	try {
		return await db.submission.delete({ where: { email } })
	} catch (err: any) {
		console.log(err)
		return false
	}
}
