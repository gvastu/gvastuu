import { Authenticator } from 'remix-auth'
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials'
import { verifyAuthorizedUser } from '~/models/submission.server'
import { getUserAccount, authorizeUser } from '~/models/user.server'
import { sessionStorage } from '../session.server'

export let authenticator = new Authenticator(sessionStorage)

const HOST_URL =
	process.env.NODE_ENV === 'development'
		? process.env.DEV_HOST_URL
		: process.env.PROD_HOST_URL

authenticator.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: `${HOST_URL}/auth/${SocialsProvider.GOOGLE}/callback`,
			prompt: 'consent',
		},
		async ({ profile }) => {
			const user = await getUserAccount(profile.id)

			if (!user) {
				let newUser = await verifyAuthorizedUser(profile._json.email)

				return await authorizeUser({
					providerId: profile.id,
					name: profile.displayName,
					email: profile._json.email,
					phone: newUser.user.phone,
					referral: newUser.user.referral,
					credential: newUser.user.credential,
					consent: newUser.user.consent,
				})
			}

			return user
		},
	),
)
