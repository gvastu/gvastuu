import { Temporal } from '@js-temporal/polyfill'
import type { User } from '@prisma/client'
import { redirect } from '@remix-run/node'
import { deleteSubmission } from '~/models/submission.server'
import { authenticator } from '~/services/auth'
import { getStaff, printMonth, renameKeys } from '~/utils'
import { db } from '~/utils/db.server'

export type { User } from '@prisma/client'

// Queries
export async function getUser(request: Request) {
	return (await authenticator.isAuthenticated(request)) as User
}

export async function getUId(request: Request) {
	let user = (await authenticator.isAuthenticated(request)) as User
	if (!user) return null
	let { id } = user
	return id
}

export async function getUserById(id: string) {
	return await db.user.findUnique({
		where: { id },
	})
}

export async function getUserId(request: Request) {
	let user = await getUser(request)
	if (!user) return null
	return user.id
}

export async function getUserProviderId(providerId: User['providerId']) {
	return await db.user.findUnique({ where: { providerId } })
}

export async function getUserAccount(providerId: User['providerId']) {
	return await db.user.findUnique({
		where: { providerId },
	})
}

export type UsersData = {
	user: Awaited<ReturnType<typeof getUsers>>
}

export async function getUserList() {
	let users = await db.user.findMany({
		where: {
			email: {
				notIn: [
					'admin@gvastuu.com',
					'comercial@gvastuu.com',
					'legal@gvastuu.com',
					'finanzas@gvastuu.com',
					'soporte@gvastuu.com',
				],
			},
			account: true,
		},
		select: {
			id: true,
			name: true,
		},
	})
	if (!users.length) return null
	return users
}

export async function getUserInputFields() {
	let users = await getUserList()
	if (!users) return null
	return users.map(user =>
		renameKeys(
			{
				id: 'value',
				username: 'label',
			},
			user,
		),
	)
}

export async function getUsers(): Promise<UsersData | unknown> {
	let data = await db.user.findMany({
		where: {
			email: {
				notIn: [
					'admin@gvastuu.com',
					'comercial@gvastuu.com',
					'legal@gvastuu.com',
					'finanzas@gvastuu.com',
					'soporte@gvastuu.com',
				],
			},
		},
		select: {
			id: true,
			providerId: true,
			name: true,
			email: true,
			profile: {
				select: {
					phone: true,
				},
			},
			booking: {
				select: {
					location: {
						select: {
							name: true,
						},
					},
					active: true,
				},
			},
		},
	})
	if (!data) throw new Response('No hay inquilinos', { status: 404 })

	let users = data.map(user => ({
		id: user.id,
		providerId: user.providerId,
		name: user.name,
		email: user.email,
		phone: user.profile?.phone,
		location: user.booking?.location.name,
		isActive: user.booking?.active,
	}))
	return users
}

export async function getUsersIds() {
	return await db.user.findMany({
		where: {
			email: {
				notIn: [
					'admin@gvastuu.com',
					'comercial@gvastuu.com',
					'legal@gvastuu.com',
					'finanzas@gvastuu.com',
					'soporte@gvastuu.com',
				],
			},
		},
		select: {
			id: true,
		},
	})
	// if (!data) return null

	// return data.map(user => ({
	// 	id: user.id,
	// }))
}

export async function getUserEmail(email: User['email']) {
	return db.user.findFirst({
		where: { email },
	})
}

export async function checkIfExists(email: User['email']) {
	let user = await getUserEmail(email)
	if (!user) {
		return await db.submission.findUnique({
			where: { email },
		})
	}
	return user
}

export async function requireStaff(request: Request) {
	let user = (await authenticator.isAuthenticated(request)) as User
	if (!user) return redirect(getReferrer(request))
	let userEmail = await getUserEmail(user.email)
	let staff = Object.values({ ...getStaff() })
		.map(item => {
			if (userEmail?.email !== item) return null
			return item
		})
		.filter(Boolean)
	if (!staff.length) return redirect(getReferrer(request))
	return staff[0]?.slice(0, -12)
}

export async function verifyAuth(request: Request) {
	let user = (await authenticator.isAuthenticated(request)) as User
	if (!user) return redirect(getReferrer(request))
	return user
}

export async function requireStaffRole(request: Request, roles: string[]) {
	let user = await requireStaff(request)
	if (user === 'admin') return user
	for (let role of roles) {
		if (user === role) return user
	}
	return redirect(getReferrer(request))
}

export async function getAdminNotifications(request: Request) {
	let user = await requireStaff(request)
	if (user === 'admin') return await getNotifications()
	return redirect(getReferrer(request))
}

export async function requireUser(request: Request) {
	let user = (await authenticator.isAuthenticated(request)) as User
	if (!user) return redirect(getReferrer(request))
	let userEmail = await getUserEmail(user.email)
	let staff = Object.values({ ...getStaff() })
		.map(item => {
			if (userEmail?.email !== item) return null
			return item
		})
		.filter(Boolean)
	if (!staff.length) return user
	return null
}

// export async function verifyUser(request: Request) {
// 	let user = (await authenticator.isAuthenticated(request)) as User
// 	if (!user) return redirect(getReferrer(request))
// 	let userEmail = await getUserEmail(user.email)
// 	let staff = Object.values({ ...getStaff() })
// 		.map(item => {
// 			if (userEmail?.email !== item) return null
// 			return item
// 		})
// 		.filter(Boolean)
// 	if (!staff.length) return user
// 	return redirect(getReferrer(request))
// }

export async function verifyUser(request: Request) {
	let authenticated = (await authenticator.isAuthenticated(request)) as User
	if (authenticated) {
		let user = await getUserEmail(authenticated.email)
		let role = Object.values({ ...getStaff() })
			.map(item => {
				if (user?.email !== item) return null
				return item
			})
			.filter(Boolean)[0]
			?.slice(0, -12)
		if (user && !role?.length) return user
		if (user && role?.length) return { ...user, role }
	}
	return null
}

export async function verifyRole(email: User['email']) {
	let data = await getUserEmail(email)
	if (!data) return null
	let { createdAt, updatedAt, ...user } = data
	let staff = Object.values({ ...getStaff() })
		.map(item => {
			if (user?.email !== item) return null
			return item
		})
		.filter(Boolean)
	if (!staff.length) return user
	let role = staff[0]?.slice(0, -12)

	return {
		...user,
		role,
	}
}

export async function getProspect(request: Request) {
	let user = requireUser(request)
	// @ts-ignore
	if (!user?.subscription) return user
	return null
}

export type UserContractData = {
	user: Awaited<ReturnType<typeof getUserContract>>
}

export async function getUserContract(
	id: User['id'],
): Promise<UserContractData | unknown> {
	let user = await db.user.findUnique({
		where: { id },
		select: {
			name: true,
			booking: {
				select: {
					startDate: true,
					endDate: true,
					amount: true,
					active: true,
					userId: true,
					locationId: true,
					location: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	})

	if (!user) throw new Response('not found', { status: 404 })
	if (!user.booking) return null

	let { name, booking } = user

	return {
		name,
		...booking,
	}
}

export async function getUserIdData(id: User['id']) {
	return await db.user.findUnique({
		where: { id },
		select: {
			id: true,
			email: true,
			name: true,
			account: true,
			profile: {
				select: {
					phone: true,
					referral: true,
					credential: true,
					consent: true,
				},
			},
			booking: {
				select: {
					startDate: true,
					endDate: true,
					amount: true,
					contrato: true,
					active: true,
					location: {
						select: {
							id: true,
							name: true,
							address: true,
							isAvailable: true,
						},
					},
				},
			},
		},
	})
}

export async function getUserLocationId(id: User['id']) {
	return await db.user.findUnique({
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
		},
	})
}

export async function getUserIdAndName() {
	return await db.user.findMany({
		where: {
			account: true,
		},
		select: {
			id: true,
			name: true,
		},
	})
}

export async function getUsersData() {
	return await db.user.findMany({
		select: {
			providerId: true,
			id: true,
			email: true,
			name: true,
			profile: {
				select: {
					phone: true,
					referral: true,
					credential: true,
					consent: true,
				},
			},
			booking: {
				select: {
					active: true,
					startDate: true,
					endDate: true,
					amount: true,
					contrato: true,
					location: {
						select: {
							id: true,
							name: true,
							address: true,
							isAvailable: true,
							payments: {
								select: {
									id: true,
									date: true,
									dueDate: true,
									amount: true,
								},
							},
						},
					},
				},
			},
		},
	})
}

async function getTotalUsers() {
	return await db.user.count({
		where: {
			email: {
				notIn: [
					'admin@gvastuu.com',
					'comercial@gvastuu.com',
					'legal@gvastuu.com',
					'finanzas@gvastuu.com',
					'soporte@gvastuu.com',
				],
			},
		},
	})
}

async function getTotalProspects() {
	return await db.submission.count({
		where: {
			authorized: false,
		},
	})
}

async function getTotalMonthlyPayments() {
	return await db.payment.count({
		where: {
			date: {
				gt: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
			},
		},
	})
}

async function getTotalLocations() {
	let locations = await db.location.count()
	if (locations === 0) return `No hay propiedades`
	return `Número de propiedades ${locations}`
}

async function getTotalAboutToExpire() {
	return await db.booking.count({
		where: {
			endDate: {
				lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
				gte: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
			},
		},
	})
}

async function getTotalTicketsSolved() {
	return await db.message.count({
		where: {
			category: {
				in: ['ELECTRICO', 'FUGA', 'GAS', 'OTROS'],
			},
			isSolved: true,
		},
	})
}

async function getTotalTicketsUnsolved() {
	return await db.message.count({
		where: {
			category: {
				in: ['ELECTRICO', 'FUGA', 'GAS', 'OTROS'],
			},
			isSolved: false,
		},
	})
}

async function getTotalReceipts() {
	return await db.message.count({
		where: {
			notification: 'PAYMENT',
		},
	})
}

async function getNotifications() {
	let t = (
		await db.message.findMany({
			where: {
				category: {
					in: ['ELECTRICO', 'FUGA', 'GAS', 'OTROS'],
				},
			},
			select: {
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
				id: true,
				title: true,
				body: true,
				category: true,
				archived: true,
				dismissedBy: true,
				comments: {
					select: {
						id: true,
						messageId: true,
						comment: true,
						commentBy: true,
						dismissed: true,
					},
				},
			},
		})
	).map(i => ({
		id: i.id,
		location: i.user.booking?.location.name,
		title: i.title,
		content: i.body,
		archived: i.archived,
		dismissedBy: i.dismissedBy,
		comments: i.comments.filter(comment => comment.commentBy !== 'STAFF'),
	}))

	// soporte
	let comments = t.flatMap(c =>
		c.comments.flatMap(i => ({
			id: i.id,
			location: c.location,
			title: c.title,
			content: i.comment,
			archived: c.archived,
			dismissedBy: c.dismissedBy,
			ticketType: 'comment',
		})),
	)

	// soporte
	let tickets = t.map(i => ({
		id: i.id,
		location: i.location,
		title: i.title,
		content: i.content,
		archived: i.archived,
		dismissedBy: i.dismissedBy,
		ticketType: 'ticket',
	}))

	// finanzas
	let receipts = (
		await db.message.findMany({
			where: {
				notification: 'PAYMENT',
			},
			select: {
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
				id: true,
				notification: true,
				title: true,
				body: true,
				archived: true,
				dismissedBy: true,
			},
		})
	).map(payment => ({
		id: payment.id,
		location: payment.user.booking?.location.name,
		title: payment.title,
		content: payment.body,
		archived: payment.archived,
		dismissedBy: payment.dismissedBy,
		ticketType: 'receipt',
	}))

	// legal
	const expiring = (
		await db.location.findMany({
			select: {
				id: true,
				name: true,
				expiredNotice: true,
				_count: {
					select: {
						payments: true,
					},
				},
			},
		})
	)
		.filter(i => i._count.payments > 10)
		.map(i => ({
			id: i.id,
			location: i.name,
			title: 'Contrato por expirar',
			content: `El contrato de la propiedad ${i.name} esta por expirar`,
			expiredNotice: i.expiredNotice,
			ticketType: 'expiring',
		}))
		.filter(i => i.expiredNotice === true)

	// comercial
	let submissions = (
		await db.submission.findMany({
			where: {
				authorized: false,
			},
		})
	).map(i => ({
		id: i.email,
		title: 'Nuevo registro',
		content: `${i.name} - ${i.email}`,
		dismissedBy: i.dismissedBy,
		ticketType: 'submission',
	}))

	return [...tickets, ...submissions, ...expiring, ...comments, ...receipts]
}

export async function getStaffData() {
	let [
		users,
		notifications,
		prospects,
		payments,
		receipts,
		locations,
		expiring,
		solved,
		unsolved,
	] = await Promise.all([
		getTotalUsers(),
		getNotifications(),
		getTotalProspects(),
		getTotalMonthlyPayments(),
		getTotalReceipts(),
		getTotalLocations(),
		getTotalAboutToExpire(),
		getTotalTicketsSolved(),
		getTotalTicketsUnsolved(),
	])
	return {
		users,
		notifications,
		prospects,
		payments,
		receipts,
		locations,
		expiring,
		solved,
		unsolved,
	}
}

export type AccountUserData = {
	user: Awaited<ReturnType<typeof getAccountUserData>>
}

// export async function xyz(userId: string) {
// 	return await db.account.findFirst({
// 		where: {
// 			id: userId,
// 		},
// 	})
// }

export async function getAccountUserData(
	providerId: User['providerId'],
): Promise<AccountUserData | unknown> {
	let user = await db.user.findUnique({
		where: { providerId },
		select: {
			id: true,
			email: true,
			name: true,
			account: true,
			profile: {
				select: {
					phone: true,
					referral: true,
					credential: true,
					consent: true,
				},
			},
			booking: {
				select: {
					startDate: true,
					endDate: true,
					duration: true,
					amount: true,
					location: {
						select: {
							name: true,
							address: true,
							isAvailable: true,
							payments: {
								select: {
									id: true,
									date: true,
									dueDate: true,
									overDue: true,
									amount: true,
								},
							},
						},
					},
				},
			},
			messages: {
				select: {
					category: true,
					notification: true,
					createdAt: true,
				},
			},
		},
	})
	if (!user) throw new Response('404', { status: 404 })
	return user
}

export type AccountPaymentUserData = {
	account: boolean
	startDate: string
	endDate: string
	amount: number
	userId: string
	locationId: string
	location: string
	address: string
	payments: string[]
	paymentsMade: number
	isCurrentPaid: boolean
	notifications: {
		id: string
		createdAt: string
	}
	payment: {
		title: string
		body: string
		notification: string
	}
}

export async function getAccountPaymentUserData(
	providerId: User['providerId'],
): Promise<AccountPaymentUserData | unknown> {
	let user = await db.user.findUnique({
		where: { providerId },
		select: {
			id: true,
			account: true,
			booking: {
				select: {
					startDate: true,
					endDate: true,
					amount: true,
					userId: true,
					locationId: true,
					location: {
						select: {
							name: true,
							address: true,
							payments: true,
						},
					},
				},
			},
			messages: {
				where: {
					notification: 'PAYMENT',
				},
				select: {
					id: true,
					createdAt: true,
				},
			},
		},
	})

	if (!user) throw new Response('404', { status: 404 })
	if (!user.booking) return null

	let paymentsMade = user.booking.location.payments.length

	let isCurrentPaid = user.booking.location?.payments
		.map(payment => {
			return payment.date.getMonth() === new Date().getMonth()
		})
		.filter(Boolean)[0]

	let userAccountData = {
		// account: user.account?.enabled,
		account: user.account,
		startDate: user.booking?.startDate,
		endDate: user.booking?.endDate,
		amount: user.booking?.amount,
		userId: user.booking?.userId,
		locationId: user.booking?.locationId,
		location: user.booking?.location.name,
		address: user.booking?.location.address,
		payments: user.booking.location.payments,
		paymentsMade,
		isCurrentPaid,
	}

	let userPaymentNotificationData = user.messages
		.map(message => ({
			id: message.id,
			createdAt: message.createdAt,
		}))
		.filter(message => message.createdAt.getMonth() === new Date().getMonth())

	let payment = {
		title: `Comprobante de pago`,
		body: `Comprobante de pago del mes de ${printMonth()}`,
		notification: `PAYMENT`,
	}

	return {
		...userAccountData,
		notifications: userPaymentNotificationData,
		payment,
	}
}

// export async function getUserTicketsData(id: User['id']) {
// 	return await db.user.findUnique({
// 		where: { id },
// 		select: {
// 			booking: {
// 				select: {
// 					location: {
// 						select: {
// 							id: true,
// 						},
// 					},
// 				},
// 			},
// 			messages: {
// 				select: {
// 					id: true,
// 					title: true,
// 					createdAt: true,
// 					updatedAt: true,
// 					body: true,
// 					attachment: true,
// 					category: true,
// 					isSolved: true,
// 					comments: {
// 						select: {
// 							comment: true,
// 							message: true,
// 							messageId: true,
// 						},
// 					},
// 					userId: true,
// 				},
// 				orderBy: {
// 					createdAt: 'desc',
// 				},
// 			},
// 		},
// 	})
// }

type UserData = {
	user: Awaited<ReturnType<typeof getUserData>>
}

export async function getUserData(
	providerId: User['providerId'],
): Promise<UserData | unknown> {
	let user = await db.user.findUnique({
		where: { providerId },
		select: {
			booking: {
				select: {
					userId: true,
					contrato: true,
					active: true,
					startDate: true,
					endDate: true,
					duration: true,
					amount: true,
					location: {
						select: {
							name: true,
							address: true,
							payments: {
								select: {
									id: true,
									date: true,
									amount: true,
									location: {
										select: {
											booking: {
												select: {
													startDate: true,
												},
											},
										},
									},
								},
							},
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
					notification: true,
					isSolved: true,
					dismissedBy: true,
					archived: true,
					comments: {
						select: {
							comment: true,
							commentBy: true,
							message: true,
							messageId: true,
						},
					},
					userId: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			recipients: {
				select: {
					userId: true,
					announcementId: true,
					isVisible: true,
					announcement: true,
				},
			},
		},
	})
	if (!user) throw new Response('not found', { status: 404 })
	if (!user.booking) return null

	let userBookingDetails = {
		id: user.booking?.userId,
		contrato: user.booking?.contrato,
		isActive: user.booking?.active,
		startDate: user.booking?.startDate,
		endDate: user.booking?.endDate,
		duration: user.booking?.duration,
		amount: user.booking?.amount,
		location: user.booking?.location.name,
		address: user.booking?.location.address,
	}
	let userPaymentDetails = user.booking.location.payments.map(payment => ({
		id: payment.id,
		createdAt: payment.date,
		startDate: payment.location.booking?.startDate,
		amount: payment.amount,
		isCurrentPaid: new Date(payment.date).getMonth() === new Date().getMonth(),
	}))
	let userMessagesDetails = user.messages.map(message => ({
		id: message.id,
		title: message.title,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt,
		body: message.body,
		attachment: message.attachment,
		category: message.category,
		notification: message.notification,
		isSolved: message.isSolved,
		archived: message.archived,
		comments: message.comments,
		dismissedBy: message.dismissedBy,
		userId: message.userId,
	}))
	let paymentNotifications = userMessagesDetails.filter(
		message => message.notification,
	)
	let ticketNotifications = userMessagesDetails.filter(
		message => !message.notification,
	)
	let commentUpdates = userMessagesDetails
		.flatMap(message => message.comments)
		.filter(comment => comment.commentBy === 'STAFF')
		.filter(comment => comment.message.dismissedBy == null)
	let userCommentNotifications = commentUpdates.map(comment => ({
		id: comment.messageId,
		userId: comment.message.userId,
		title: comment.message.title,
		content: comment.comment,
		dismissedBy: comment.message.dismissedBy,
	}))
	let userAnnouncementDetails = user.recipients
		.map(recipient => ({
			announcementId: recipient.announcementId,
			userId: recipient.userId,
			title: recipient.announcement.title,
			content: recipient.announcement.content,
			isVisible: recipient.isVisible,
		}))
		.filter(announcement => announcement.isVisible)
	return {
		paymentNotifications,
		ticketNotifications,
		userCommentNotifications,
		userBookingDetails,
		userPaymentDetails,
		userAnnouncementDetails,
	}
}

type UserProfileDetails = {
	user: Awaited<ReturnType<typeof getUserProfileDetails>>
}

export async function getUserProfileDetails(
	providerId: string,
): Promise<UserProfileDetails | unknown> {
	let user = await db.user.findUnique({
		where: { providerId },
		select: {
			profile: {
				select: {
					phone: true,
					referral: true,
					credential: true,
					consent: true,
				},
			},
			booking: {
				select: {
					userId: true,
					contrato: true,
					active: true,
					startDate: true,
					endDate: true,
					location: {
						select: {
							name: true,
							address: true,
						},
					},
					locationId: true,
				},
			},
		},
	})

	if (!user) throw new Response('not found', { status: 404 })
	if (!user.profile) return null

	return { ...user.profile, ...user.booking }
}

type UserProfile = {
	user: Awaited<ReturnType<typeof getUserProfile>>
}

export async function getUserProfile(
	id: string,
): Promise<UserProfile | unknown> {
	let user = await db.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			profile: {
				select: {
					phone: true,
					referral: true,
					credential: true,
					consent: true,
				},
			},
			booking: {
				select: {
					contrato: true,
					active: true,
				},
			},
		},
	})
	if (!user) throw new Response('not found', { status: 404 })
	if (!user.profile) return null

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		...user.profile,
		...user.booking,
	}
}

export async function getUserStats(id: User['id']) {
	return await db.user.findFirstOrThrow({
		where: { id },
		select: {
			booking: {
				select: {
					location: {
						select: {
							payments: {
								select: {
									date: true,
								},
							},
						},
					},
				},
			},
			messages: {
				select: {
					category: true,
					notification: true,
					isSolved: true,
				},
			},
		},
	})
}

export async function getUserMonthlyFeed() {
	let current = Temporal.Now.plainDateISO()
		.with({ day: 1 })
		.getISOFields().isoMonth

	let query = await db.user.findMany({
		select: {
			name: true,
			id: true,
			booking: {
				select: {
					location: {
						select: {
							name: true,
							payments: {
								select: {
									id: true,
									date: true,
									amount: true,
									locationId: true,
									archived: true,
								},
							},
						},
					},
				},
			},
		},
	})

	let payments = query
		// eslint-disable-next-line array-callback-return
		.map((user: any) => {
			let data = user.booking
				.flatMap((b: any) => b.location)
				.flatMap((l: any) => l.payments)
				.filter((p: any) => {
					return new Date(p.date).getUTCMonth() + 1 === current
				})
				.reduce(
					(acc: any) => {
						acc.count++
						return acc
					},
					{ count: 0 },
				)
			if (data.count > 0) return user
		})
		.filter(Boolean)
	return payments
}

export async function getUsersTickets() {
	return db.user.findMany({
		select: {
			messages: {
				select: {
					id: true,
					title: true,
					body: true,
					attachment: true,
					category: true,
					createdAt: true,
					updatedAt: true,
					comments: {
						select: {
							comment: true,
							message: true,
							messageId: true,
						},
					},
					userId: true,
				},
				orderBy: {
					createdAt: 'asc',
				},
			},
		},
	})
}

// Mutations
export async function activateAccount(id: User['id'], locationId: string) {
	return await db.booking.update({
		where: { userId: id, locationId },
		data: {
			active: true,
			location: {
				update: {
					isAvailable: false,
				},
			},
			user: {
				update: {
					account: true,
				},
			},
		},
	})
}

export async function verifyStaff(email: string) {
	let data = Object.values(getStaff())
	if (data.includes(email)) return email
	return null
}

export async function getStaffRole(email: string) {
	let data = Object.values(getStaff())
	if (data.includes(email)) {
		return email.slice(0, -12)
	}
	return null
}

export async function authorize({
	providerId,
	email,
	name,
}: {
	providerId: string
	email: string
	name: string
}) {
	return await db.user.create({
		data: {
			providerId,
			email,
			name,
		},
	})
}

export async function authorizeUser({
	providerId,
	email,
	name,
	phone,
	referral,
	credential,
	consent,
}: {
	providerId: string
	email: string
	name: string
	phone: string
	referral: string
	credential: string
	consent: string
}) {
	let user = await db.user.create({
		data: {
			providerId,
			email,
			name,
			profile: {
				create: {
					phone,
					referral,
					credential,
					consent,
				},
			},
		},
	})
	await deleteSubmission(email)
	return user
}

export const deleteUser = async (providerId: User['providerId']) => {
	try {
		return await db.user.delete({ where: { providerId } })
	} catch (err: any) {
		console.log(err)
		return false
	}
}

// Utilities
export function getReferrer(request: Request) {
	let referrer = request.referrer
	if (referrer) {
		let url = new URL(referrer)
		return url.pathname + url.search
	}
	return '/'
}
