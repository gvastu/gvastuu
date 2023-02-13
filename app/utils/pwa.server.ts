import storage from 'node-persist'
import webPush from 'web-push'

interface PushObject {
	title: string
	body: string
	icon?: string
	badge?: string
	dir?: string
	image?: string
	silent?: boolean
}

export async function SaveSubscription(sub: PushSubscription): Promise<void> {
	await storage.init()
	await storage.setItem('subscription', sub)
}

// export async function SaveSubscription(sub: PushSubscription): Promise<void> {
//   await storage.init()
//   let subscriptions = (await storage.getItem('subscriptions')) || []
//   subscriptions.push(sub)
//   storage.setItem('subscriptions', subscriptions)
//   return subscriptions
// }

export async function PushNotification(content: PushObject, delay: number) {
	if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
		return
	}

	webPush.setVapidDetails(
		'admin@grupovastuu.com',
		process.env.VAPID_PUBLIC_KEY,
		process.env.VAPID_PRIVATE_KEY,
	)

	await storage.init()
	let subscription = await storage.getItem('subscription')

	setTimeout(() => {
		webPush
			.sendNotification(subscription, JSON.stringify(content))
			.then(() => {
				return new Response('success', {
					status: 200,
				})
			})
			.catch((e: Error) => {
				console.log(e)
				return new Response('Failed!', {
					status: 500,
				})
			})
	}, delay * 1000)
}

// subscriptions.forEach((subscription: any, i: number) => {
// 	let p = webPush
// 		.sendNotification(subscription, JSON.stringify(message))
// 		.catch(status => {
// 			if (status.statusCode === 410) subscription[i]['deleted'] = true
// 			return null
// 		})
// 	subscriptions.push(p)
// })
// Promise.all(subscriptions).then(() => {
// 	subscriptions = subscriptions.filter(
// 		(subscription: any) => !subscription.deleted,
// 	)
// 	storage.setItem('subscription', subscriptions)
// })
// }
