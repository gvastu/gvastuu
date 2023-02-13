import type { ActionArgs } from '@remix-run/node'
import type { SocialsProvider } from 'remix-auth-socials'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth'

export async function action({ request, params }: ActionArgs) {
	return await authenticator.authenticate(
		params.provider as SocialsProvider,
		request,
	)
}

export async function loader() {
	return redirect('/login')
}

export default () => null
