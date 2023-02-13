import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { urlBase64ToUint8Array } from '~/utils'

const hydrate = () => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RemixBrowser />
			</StrictMode>,
		)
	})
}

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate)
} else {
	window.setTimeout(hydrate, 1)
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', async () => {
		navigator.serviceWorker
			.register('/entry.worker.js')
			.then(() => navigator.serviceWorker.ready)
			.then(() => {
				if (navigator.serviceWorker.controller) {
					navigator.serviceWorker.controller.postMessage({
						type: 'SYNC_REMIX_MANIFEST',
						manifest: window.__remixManifest,
					})
				} else {
					navigator.serviceWorker.addEventListener('controllerchange', () => {
						navigator.serviceWorker.controller?.postMessage({
							type: 'SYNC_REMIX_MANIFEST',
							manifest: window.__remixManifest,
						})
					})
				}
			})
			.catch(console.error)
	})
}

navigator.serviceWorker.ready
	.then(registration => {
		let subscription = registration.pushManager.getSubscription()
		return { subscription, registration }
	})
	.then(async sub => {
		if (await sub.subscription) {
			return sub.subscription
		}

		const subInfo = await fetch('/resources/subscribe')
		const returnedSubscription = await subInfo.text()

		const convertedVapidKey = urlBase64ToUint8Array(returnedSubscription)
		return sub.registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: convertedVapidKey,
		})
	})
	.then(async subscription => {
		await fetch('./resources/subscribe', {
			method: 'POST',
			body: JSON.stringify({
				subscription: subscription,
				type: 'POST_SUBSCRIPTION',
			}),
		})
	})
	.catch(console.error)
	.finally(() => {
		console.log('Service worker registration complete')
	})
