import { Menu, MenuButton, MenuLink, MenuList } from '@reach/menu-button'
import { Link } from '@remix-run/react'
import { ChevronDownIcon, ChevronUpIcon } from '~/components/icons'

function SubmitTicket() {
	return (
		<Menu>
			{({ isExpanded }) => (
				<>
					<MenuButton className="btn flex items-center gap-1">
						{isExpanded ? (
							<>
								<span>Crear anuncio</span>
								<ChevronUpIcon className="mt-1" />
							</>
						) : (
							<>
								<span>Crear anuncio</span>
								<ChevronDownIcon className="mt-1" />
							</>
						)}
					</MenuButton>
					<MenuList className="grid w-40">
						<MenuLink
							as={Link}
							className="px-2 pt-4 text-right text-indigo-600 hover:text-indigo-500"
							to="./individual"
						>
							Individual
						</MenuLink>
						<MenuLink
							as={Link}
							className="p-2 pt-3 text-right text-indigo-600 hover:text-indigo-500"
							to="./general"
						>
							General
						</MenuLink>
					</MenuList>
				</>
			)}
		</Menu>
	)
}

export { SubmitTicket }
