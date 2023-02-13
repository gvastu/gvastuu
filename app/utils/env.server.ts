import invariant from 'tiny-invariant'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'test'
			SESSION_SECRET: string
			DEV_HOST_URL: string
			PROD_HOST_URL: string
			GOOGLE_CLIENT_ID: string
			GOOGLE_CLIENT_SECRET: string
		}
	}
}

declare global {
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}

type ENV = ReturnType<typeof getStaff>

export const getStaff = () => {
	invariant(process.env.ADMIN, 'ADMIN must be set')
	invariant(process.env.COMERCIAL, 'COMERCIAL must be set')
	invariant(process.env.LEGAL, 'LEGAL must be set')
	invariant(process.env.FINANZAS, 'FINANZAS must be set')
	invariant(process.env.SOPORTE, 'SOPORTE must be set')
	return {
		ADMIN: process.env.ADMIN,
		COMERCIAL: process.env.COMERCIAL,
		LEGAL: process.env.LEGAL,
		FINANZAS: process.env.FINANZAS,
		SOPORTE: process.env.SOPORTE,
	}
}
