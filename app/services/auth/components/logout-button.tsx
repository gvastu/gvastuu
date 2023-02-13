import { Form } from '@remix-run/react'
import { LogoutIcon } from '~/components/icons'

export const LogoutButton = ({
	logoutText = 'Salir',
}: {
	logoutText?: string
}) => {
	return (
		<Form action="/auth/logout" method="post">
			<button>{logoutText}</button>
		</Form>
	)
}

export function NavLogoutButton() {
	return (
		<Form action="/auth/logout" method="post">
			<button className="m-auto grid place-items-center gap-1 bg-transparent p-0 text-slate-50 hover:bg-transparent hover:text-indigo-300 focus:text-indigo-300 focus:outline-none">
				<LogoutIcon className="h-6 w-6" />
				<span className="hidden text-xxs text-inherit sm:block">Salir</span>
			</button>
		</Form>
	)
}
