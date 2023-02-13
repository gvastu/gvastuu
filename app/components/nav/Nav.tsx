import { NavLink } from '@remix-run/react'
import { NavLogoutButton } from '~/services/auth/components'

export type TNavLinks = {
	name: string
	to: string
	icon: React.ReactNode
}[]

let NavLinks = ({
	to,
	...rest
}: Omit<Parameters<typeof NavLink>['0'], 'to'> & { to: string }) => {
	return (
		<li>
			{
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<NavLink
					to={to}
					className={({ isActive }) => (isActive ? 'currentLink' : '')}
					{...rest}
				/>
			}
		</li>
	)
}

export let Nav: React.FC<{ navLinks: TNavLinks; className?: string }> =
	function Nav({ className = 'nav', ...props }) {
		return (
			<nav className={className}>
				<ul>
					{props.navLinks.map(link => {
						return (
							<NavLinks key={link.to} to={link.to} end>
								{link.icon}
								<span>{link.name}</span>
							</NavLinks>
						)
					})}
					<li>
						<NavLogoutButton />
					</li>
					{/* {props.children} */}
				</ul>
			</nav>
		)
	}
