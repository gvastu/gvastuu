import type { SocialsProvider } from 'remix-auth-socials'
import { Form } from '@remix-run/react'

type LoginButtonProps = {
	provider: SocialsProvider | string
	className?: string
	children: React.ReactNode
}

export const LoginButton = ({
	provider,
	className,
	children,
}: LoginButtonProps) => {
	return (
		<Form action={`/auth/${provider}`} method="post">
			<button className={className}>{children}</button>
		</Form>
	)
}
