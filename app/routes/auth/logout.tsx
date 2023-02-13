import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth'

export async function action({ request }: ActionArgs) {
	return await authenticator.logout(request, { redirectTo: '/' })
}

export async function loader() {
	return redirect('/')
}

export default () => null
