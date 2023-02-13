import { useUser } from '~/utils'
import { Error } from '~/components'

export default function () {
	let user = useUser()
	return user && <Error>Regresar al dashboard</Error>
}

export function ErrorBoundary() {
	return <Error />
}
