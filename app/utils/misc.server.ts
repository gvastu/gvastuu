import { Temporal, toTemporalInstant } from '@js-temporal/polyfill'

export const safeRedirect = (
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect = '/',
) => {
	if (
		!to ||
		typeof to !== 'string' ||
		!to.startsWith('/') ||
		to.startsWith('//')
	) {
		return defaultRedirect
	}

	return to
}

export const getDomainUrl = (request: Request) => {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
	if (!host) throw new Error('Could not determine domain URL.')

	const protocol = host.includes('localhost') ? 'http' : 'https'
	return `${protocol}://${host}`
}

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	const base64 = (base64String + padding)
		// eslint-disable-next-line no-useless-escape
		.replace(/\-/g, '+')
		.replace(/_/g, '/')

	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

class MissingEnvironmentError extends Error {
	constructor(env: string) {
		super(`Missing environment variable: "${env}"`)
	}
}

export function isProduction(): boolean {
	return env('NODE_ENV') === 'production'
}

export function isDevelopment(): boolean {
	return env('NODE_ENV') === 'development'
}

export function isTest(): boolean {
	return env('NODE_ENV') === 'test'
}

export function runtime(name: 'server' | 'browser'): boolean {
	switch (name) {
		case 'browser': {
			return typeof window === 'object' && typeof document === 'object'
		}
		case 'server': {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			return typeof process !== 'undefined' && Boolean(process.versions?.node)
		}
	}
}

export function env(name: string, fallback?: string): string {
	const value = process.env[name] ?? fallback
	if (!value) throw new MissingEnvironmentError(name)
	return value
}

// Format date
export let formatDate = (date: Date) => {
	return date
		.toLocaleDateString('es-MX', {
			month: 'long',
			// year: 'numeric',
		})
		.replace(/de /, '')
}

// Print month
export let printMonth = () => {
	let thisMonth = new Date().getMonth() + 1
	if (thisMonth === 1) return 'Enero'
	if (thisMonth === 2) return 'Febrero'
	if (thisMonth === 3) return 'Marzo'
	if (thisMonth === 4) return 'Abril'
	if (thisMonth === 5) return 'Mayo'
	if (thisMonth === 6) return 'Junio'
	if (thisMonth === 7) return 'Julio'
	if (thisMonth === 8) return 'Agosto'
	if (thisMonth === 9) return 'Septiembre'
	if (thisMonth === 10) return 'Octubre'
	if (thisMonth === 11) return 'Noviembre'
	if (thisMonth === 12) return 'Diciembre'
}

// Get month difference
export function getMonthDiff(start: any, end: any) {
	return (
		end.getMonth() -
		start.getMonth() +
		12 * (end.getFullYear() - start.getFullYear())
	)
}

// decode base64 Uint8Array
export function decode(base64String: any) {
	let padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	let base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

	let rawData = window.atob(base64)
	let outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

// Get current month parameters
// export function getCurrentMonthDigits() {
//   // @ts-ignore
//   // eslint-disable-next-line no-extend-native
//   Date.prototype.toTemporalInstant = toTemporalInstant
//   let yy = new Date().getFullYear()
//   let mm = new Date()
//     // @ts-ignore
//     .toTemporalInstant()
//     .toZonedDateTimeISO(Temporal.Now.timeZone())
//     .toPlainDate()
//     .toString()
//     .slice(5, -3)

//   return [yy, mm]
// }

// Get current month & year
export function getCurrentMonthYear() {
	let mm = Temporal.Now.plainDateISO().with({ day: 1 }).getISOFields().isoMonth
	let yy = new Date().getFullYear()
	return [yy, mm]
}

export function getCurrentMonth() {
	let mm = Temporal.Now.plainDateISO()
		.with({ day: 1 })
		.getISOFields()
		.isoMonth.toString()
	let yy = new Date().getFullYear().toString()
	return new Date(`${yy}-${mm}-01`)
}

// Get current, previous and next month
export async function getCurrentMonthData(request: any) {
	// @ts-ignore
	// eslint-disable-next-line no-extend-native
	Date.prototype.toTemporalInstant = toTemporalInstant
	let start = new Date(
		new Date(
			`${new URL(request.url).pathname.split('/')[3]}/${
				new URL(request.url).pathname.split('/')[2]
			}/${Number(1)}`,
		)
			.toISOString()
			.slice(0, 10),
	)
		// @ts-ignore
		.toTemporalInstant()
		.toZonedDateTimeISO(Temporal.Now.timeZone())
		.toPlainDate()
		.add({ days: 1 })
	let end = start.add({ months: 1 }).subtract({ days: 1 })
	let current = new URL(request.url).pathname.split('/').splice(2, 4)
	let previous = start
		.subtract({ months: 1 })
		.toString()
		.split('-')
		.splice(0, 2)
	let next = start.add({ months: 1 }).toString().split('-').splice(0, 2)
	return { current, previous, next, start, end }
}

/**
 * Negate
 */
export const negate =
	// @ts-ignore


		func =>
		// @ts-ignore
		(...args) =>
			!func(...args)

/**
 * Rename keys
 */
export let renameKeys = (keysMap: any, obj: any) =>
	Object.keys(obj).reduce(
		(acc, key) => ({
			...acc,
			...{ [keysMap[key] || key]: obj[key] },
		}),
		{},
	)
