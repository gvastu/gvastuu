import { useEffect } from 'react'
import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useMatches,
} from '@remix-run/react'
import { getUser } from '~/models/user.server'

import styles from '~/styles/style.css'

export let links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		title: 'Grupo Vastuu',
		description: 'Grupo Vastuu',
		viewport: 'width=device-width, initial-scale=1',
	}
}

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>
}

export async function loader({ request }: LoaderArgs) {
	return json<LoaderData>({
		user: await getUser(request),
	})
}

export default function App() {
	let location = useLocation()
	let matches = useMatches()

	let isMount = true
	useEffect(() => {
		let mounted = isMount
		isMount = false
		if ('serviceWorker' in navigator) {
			if (navigator.serviceWorker.controller) {
				navigator.serviceWorker.controller?.postMessage(
					JSON.stringify({
						type: 'REMIX_NAVIGATION',
						isMount: mounted,
						location,
						matches,
						manifest: window.__remixManifest,
					}),
				)
			} else {
				let listener = async () => {
					await navigator.serviceWorker.ready
					navigator.serviceWorker.controller?.postMessage(
						JSON.stringify({
							type: 'REMIX_NAVIGATION',
							isMount: mounted,
							location,
							matches,
							manifest: window.__remixManifest,
						}),
					)
				}
				navigator.serviceWorker.addEventListener('controllerchange', listener)
				return () => {
					navigator.serviceWorker.removeEventListener(
						'controllerchange',
						listener,
					)
				}
			}
		}
	}, [location])

	return (
		<html lang="en" className="h-full">
			<head>
				<Meta />
				<meta name="theme-color" content="#0f1828" />
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/icons/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/icons/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/icons/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/icons/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/icons/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/icons/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/icons/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/icons/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/icons/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/icons/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/icons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/resources/manifest.webmanifest" />
				<Links />
			</head>
			<body className="h-full">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
