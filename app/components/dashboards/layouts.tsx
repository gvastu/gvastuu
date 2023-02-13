import * as React from 'react'
import { AnchorOrLink } from '~/components/elements'
import * as Icons from '~/components/icons'
import { Layout } from '~/components/layout'
import type { TNavLinks } from '~/components/nav'
import { Nav } from '~/components/nav'

export type TWidget = {
	section?: string
	name?: string
	description?: string
	stats?: React.ReactNode
	className?: string
	children?: React.ReactNode
}

export let Widget = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithRef<typeof AnchorOrLink> & TWidget
>(function Widget(
	{
		children,
		className = 'card mx-auto h-32 w-6/7 bg-glass sm:w-64 lg:w-72',
		...props
	},
	ref,
) {
	return (
		<AnchorOrLink ref={ref} to={props.section} className={className}>
			<h2 className="-mb-1 pb-2 text-base text-brand-dark hover:text-indigo-600 focus:text-indigo-600 sm:m-0">
				{props.name}
			</h2>
			<p className="mt-1 text-xs text-brand">{props.description}</p>
			<span className="stats">{props.stats}</span>
			{children}
		</AnchorOrLink>
	)
})

// Admin screen
let AdminNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{ name: 'Inquilinos', to: '/inquilinos', icon: <Icons.UsersIcon /> },
	{ name: 'Prospectos', to: '/prospectos', icon: <Icons.ProspectosIcon /> },
	{ name: 'Finanzas', to: '/finanzas', icon: <Icons.PagosIcon /> },
	{ name: 'Recibos', to: '/recibos', icon: <Icons.ReceiptIcon /> },
	{
		name: 'Propiedades',
		to: '/propiedades',
		icon: <Icons.PropiedadIcon />,
	},
	{ name: 'Legal', to: '/legal', icon: <Icons.LegalIcon /> },
	{ name: 'Tickets', to: '/soporte', icon: <Icons.SoporteIcon /> },
	{ name: 'Anuncios', to: '/anuncios', icon: <Icons.AnnotationIcon /> },
]

function AdminLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav navLinks={AdminNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// Comercial screen
let ComercialNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{ name: 'Inquilinos', to: '/inquilinos', icon: <Icons.UsersIcon /> },
	{ name: 'Prospectos', to: '/prospectos', icon: <Icons.ProspectosIcon /> },
	{
		name: 'Propiedades',
		to: '/propiedades',
		icon: <Icons.PropiedadIcon />,
	},
	{ name: 'Anuncios', to: '/anuncios', icon: <Icons.AnnotationIcon /> },
]

function ComercialLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={ComercialNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// Finanzas screen
let FinanzasNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{ name: 'Finanzas', to: '/finanzas', icon: <Icons.FinanzasIcon /> },
	{ name: 'Recibos', to: '/recibos', icon: <Icons.ReceiptIcon /> },
	{ name: 'Anuncios', to: '/anuncios', icon: <Icons.AnnotationIcon /> },
]

function FinanzasLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={FinanzasNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// Legal screen
let LegalNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{ name: 'Legal', to: '/legal', icon: <Icons.LegalIcon /> },
	{ name: 'Inquilinos', to: '/inquilinos', icon: <Icons.UsersIcon /> },
	{
		name: 'Propiedades',
		to: '/propiedades',
		icon: <Icons.PropiedadIcon />,
	},
	{ name: 'Anuncios', to: '/anuncios', icon: <Icons.AnnotationIcon /> },
]

function LegalLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={LegalNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// Soporte screen
let SoporteNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{ name: 'Tickets', to: '/soporte', icon: <Icons.SoporteIcon /> },
	{ name: 'Anuncios', to: '/anuncios', icon: <Icons.AnnotationIcon /> },
]

function SoporteLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={SoporteNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// User screen
let UserNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{
		name: 'Mi perfil',
		to: '/me',
		icon: <Icons.UserIcon />,
	},
	{
		name: 'Mis pagos',
		to: '/me/finanzas',
		icon: <Icons.PagosIcon />,
	},
	{ name: 'Mis tickets', to: '/me/soporte', icon: <Icons.SoporteIcon /> },
]

function UserLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={UserNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

// Unactive screen
let UnactiveNavLinks: TNavLinks = [
	{ name: 'Grupo Vastuu', to: '/', icon: <Icons.LogoIcon /> },
	{
		name: 'Mi perfil',
		to: '/me',
		icon: <Icons.UserIcon />,
	},
]

function UnactiveLayout({
	title = 'Bienvenido a Grupo Vastuu',
	icon,
	className = 'content',
	children,
}: {
	title?: string
	icon?: React.ReactNode
	className?: string
	children?: React.ReactNode
}) {
	return (
		<>
			<Layout
				navigation={<Nav className="nav altnav" navLinks={UnactiveNavLinks} />}
				title={title}
				icon={icon}
			>
				<div className={className}>{children}</div>
			</Layout>
		</>
	)
}

export {
	AdminLayout,
	ComercialLayout,
	FinanzasLayout,
	LegalLayout,
	SoporteLayout,
	UserLayout,
	UnactiveLayout,
}
