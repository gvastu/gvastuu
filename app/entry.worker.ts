/// <reference lib="WebWorker" />

import { json } from '@remix-run/server-runtime'

export type {}
declare let self: ServiceWorkerGlobalScope

const STATIC_ASSETS = ['/build/', '/icons/', '/']

const ASSET_CACHE = 'asset-cache'
const DATA_CACHE = 'data-cache'
const DOCUMENT_CACHE = 'document-cache'

function debug(...messages: any[]) {
	if (process.env.NODE_ENV === 'development') {
		console.debug(...messages)
	}
}

async function handleInstall(event: ExtendableEvent) {
	debug('Service worker installed')
}

async function handleActivate(event: ExtendableEvent) {
	console.log('Service worker activated')
	debug('Service worker activated')
}

async function handleMessage(event: ExtendableMessageEvent) {
	const cachePromises: Map<string, Promise<void>> = new Map()

	if (event.data.type === 'REMIX_NAVIGATION') {
		const { isMount, location, matches, manifest } = event.data
		const documentUrl = location.pathname + location.search + location.hash

		const [dataCache, documentCache, existingDocument] = await Promise.all([
			caches.open(DATA_CACHE),
			caches.open(DOCUMENT_CACHE),
			caches.match(documentUrl),
		])

		if (!existingDocument || !isMount) {
			debug('Caching document for', documentUrl)
			cachePromises.set(
				documentUrl,
				documentCache.add(documentUrl).catch(error => {
					debug(`Failed to cache document for ${documentUrl}:`, error)
				}),
			)
		}

		if (isMount) {
			for (const match of matches) {
				if (manifest.routes[match.id].hasLoader) {
					const params = new URLSearchParams(location.search)
					params.set('_data', match.id)
					let search = params.toString()
					search = search ? `?${search}` : ''
					const url = location.pathname + search + location.hash
					if (!cachePromises.has(url)) {
						debug('Caching data for', url)
						cachePromises.set(
							url,
							dataCache.add(url).catch(error => {
								debug(`Failed to cache data for ${url}:`, error)
							}),
						)
					}
				}
			}
		}
	}

	await Promise.all(cachePromises.values())
}

async function handleFetch(event: FetchEvent): Promise<Response> {
	const url = new URL(event.request.url)

	if (isAssetRequest(event.request)) {
		const cached = await caches.match(event.request, {
			cacheName: ASSET_CACHE,
			ignoreVary: true,
			ignoreSearch: true,
		})
		if (cached) {
			debug('Serving asset from cache', url.pathname)
			return cached
		}

		debug('Serving asset from network', url.pathname)
		const response = await fetch(event.request)
		if (response.status === 200) {
			const cache = await caches.open(ASSET_CACHE)
			await cache.put(event.request, response.clone())
		}
		return response
	}

	if (isLoaderRequest(event.request)) {
		try {
			debug('Serving data from network', url.pathname + url.search)
			const response = await fetch(event.request.clone())
			const cache = await caches.open(DATA_CACHE)
			await cache.put(event.request, response.clone())
			return response
		} catch (error) {
			debug(
				'Serving data from network failed, falling back to cache',
				url.pathname + url.search,
			)
			const response = await caches.match(event.request)
			if (response) {
				response.headers.set('X-Remix-Worker', 'yes')
				return response
			}

			return json(
				{ message: 'Network Error' },
				{
					status: 500,
					headers: { 'X-Remix-Catch': 'yes', 'X-Remix-Worker': 'yes' },
				},
			)
		}
	}

	if (isDocumentGetRequest(event.request)) {
		try {
			debug('Serving document from network', url.pathname)
			const response = await fetch(event.request)
			const cache = await caches.open(DOCUMENT_CACHE)
			await cache.put(event.request, response.clone())
			return response
		} catch (error) {
			debug(
				'Serving document from network failed, falling back to cache',
				url.pathname,
			)
			const response = await caches.match(event.request)
			if (response) {
				return response
			}
			throw error
		}
	}

	return fetch(event.request.clone())
}

const handlePush = (event: PushEvent) => {
	const data = JSON.parse(event?.data!.text())
	let title = data.title ?? '1 mensaje nuevo'

	const options = {
		body: data.body ? data.body : 'ver mensaje',
		icon: data.icon ? data.icon : '/icons/android-icon-192x192.png',
		badge: data.badge ? data.badge : '/icons/android-icon-48x48.png',
		dir: data.dir ? data.dir : 'auto',
		image: data.image ? data.image : undefined,
		silent: data.silent ? data.silent : false,
	}

	self.registration.showNotification(title, {
		...options,
	})
}

function isMethod(request: Request, methods: string[]) {
	return methods.includes(request.method.toLowerCase())
}

function isAssetRequest(request: Request) {
	return (
		isMethod(request, ['get']) &&
		STATIC_ASSETS.some(publicPath => request.url.startsWith(publicPath))
	)
}

function isLoaderRequest(request: Request) {
	const url = new URL(request.url)
	return isMethod(request, ['get']) && url.searchParams.get('_data')
}

function isDocumentGetRequest(request: Request) {
	return isMethod(request, ['get']) && request.mode === 'navigate'
}

self.addEventListener('install', event => {
	event.waitUntil(handleInstall(event).then(() => self.skipWaiting()))
})

self.addEventListener('activate', event => {
	event.waitUntil(handleActivate(event).then(() => self.clients.claim()))
})

self.addEventListener('message', event => {
	event.waitUntil(handleMessage(event))
})

// TODO: Handle `message` events with FCMPushSubscription
// This is the "fetch" event handler for the service worker notifications feature that we would use with Firebase Cloud Messaging
// self.addEventListener('push', (e: NotificationPayload) => e.waitUntil(handlePush(e)))
self.addEventListener('push', (e: any) => e.waitUntil(handlePush(e)))

self.addEventListener('fetch', event => {
	event.respondWith(
		(async () => {
			const result = {} as
				| { error: unknown; response: Response }
				| { error: undefined; response: Response }
			try {
				result.response = await handleFetch(event)
			} catch (error) {
				result.error = error
			}

			return appHandleFetch(event, result)
		})(),
	)
})

async function appHandleFetch(
	event: FetchEvent,
	{
		error,
		response,
	}:
		| { error: unknown; response: Response }
		| { error: undefined; response: Response },
): Promise<Response> {
	if (error) {
		console.log('error', error)
	}
	return response
}
