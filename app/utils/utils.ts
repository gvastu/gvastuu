import * as React from 'react'
import { useMatches } from '@remix-run/react'
import { useMemo } from 'react'

import type { User as TUser } from '~/models/user.server'
import type { Profile } from '@prisma/client'

type User = TUser & Profile

export function useMatchesData(
	id: string,
): Record<string, unknown> | undefined {
	const matchingRoutes = useMatches()
	const route = useMemo(
		() => matchingRoutes.find(route => route.id === id),
		[matchingRoutes, id],
	)
	return route?.data
}

function isUser(user: any): user is User {
	return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): User | undefined {
	const data = useMatchesData('root')
	if (!data || !isUser(data.user)) {
		return undefined
	}
	return data.user
}

export function useUser(): User {
	const maybeUser = useOptionalUser()
	if (!maybeUser) {
		throw new Error('404')
	}
	return maybeUser
}

export function validateEmail(email: unknown): email is string {
	return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function createSubscribable<MessageType>() {
	const subscribers: Set<(msg: MessageType) => void> = new Set()
	return {
		subscribe(cb: (msg: MessageType) => void): () => void {
			subscribers.add(cb)
			return () => {
				subscribers.delete(cb)
			}
		},

		publish(msg: MessageType): void {
			subscribers.forEach(cb => cb(msg))
		},
	}
	// const sub = new Subscribable<string>()
	// sub.publish('hello')
	// const unsub = sub.subscribe(msg => console.log(msg))
	// unsub()
	// sub.publish('goodbye')
}

export function createStateSubscribable<DataType>(
	initialValue: DataType,
): () => [DataType, (msg: DataType) => void] {
	const subscribers = createSubscribable<DataType>()
	return () => {
		const [value, setValue] = React.useState<DataType>(initialValue)

		React.useEffect(() => subscribers.subscribe(setValue), [])

		return [
			value,
			(v: DataType) => {
				setValue(v)
				subscribers.publish(v)
			},
		]
	}
}

export function createSubscribableHandler<MessageType>() {
	const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set()
	return {
		subscribe(cb: (msg: MessageType) => void): () => void {
			subscribers.add(cb)
			return () => {
				subscribers.delete(cb)
			}
		},

		publish(msg: MessageType): undefined | unknown {
			let data: unknown
			for (const subscriber of Array.from(subscribers)) {
				data = subscriber(msg)
				if (data !== undefined) {
					break
				}
			}
			return data
		},
	}
}

// Array utils
export function toArray<Value = unknown>(value: Value | Value[]): Value[] {
	if (Array.isArray(value)) return value
	return [value]
}

// const handlers = createSubscribableHandler<{
//   name: string
//   contents: string
// }>()

// handlers.subscribe(({ name, contents }) => {
//   if (name.endsWith('.json')) {
//     return JSON.parse(contents)
//   }
// })

// handlers.subscribe(({ contents }) => contents)

// for (const name of ['foo', 'bar', 'baz']) {
//   const contents = `Hello, ${name}!`
//   const output = handlers.publish({ name, contents })
//   console.log(`${name}: ${JSON.stringify(output)}`)
// }
