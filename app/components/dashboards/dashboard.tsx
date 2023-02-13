import { useLocation } from '@remix-run/react'
import {
	StaffNotificationProps,
	StaffNotifications,
	UserNotificationProps,
	UserNotifications,
} from '~/components/notifications'
import logo from '~/images/logo.png'
import { LogoutButton } from '~/services/auth/components'
import {
	AdminLayout,
	ComercialLayout,
	FinanzasLayout,
	LegalLayout,
	SoporteLayout,
	UnactiveLayout,
	UserLayout,
	Widget as Section,
} from './layouts'

// Admin
function Admin({
	users,
	prospects,
	payments,
	receipts,
	locations,
	expiring,
	solved,
	unsolved,
	children,
}: {
	users: string | number
	prospects: string | number
	payments: string | number
	receipts: string | number
	locations: string | number
	expiring: string | number | any
	solved: string | number
	unsolved: string | number
	children?: React.ReactNode
}) {
	return (
		<AdminLayout>
			<Section
				section="inquilinos"
				name="Inquilinos"
				stats={`${
					users === 0 ? `No hay inquilinos` : `Numero de inquilinos ${users}`
				}`}
			/>
			<Section
				section="prospectos"
				name="Prospectos"
				stats={`${
					prospects === 0
						? `No hay prospectos`
						: `Numero de prospectos ${prospects}`
				}`}
			/>
			<Section
				section="finanzas"
				name="Finanzas"
				stats={`${
					payments === 0
						? `No hay pagos registrados en el mes`
						: `Pagos recibidos en el mes ${payments}`
				}`}
			/>
			<Section
				section="recibos"
				name="Recibos"
				stats={`${
					receipts === 0
						? `No hay recibos pendientes`
						: `Por revisar ${receipts}`
				}`}
			/>
			<Section section="propiedades" name="Propiedades" stats={locations} />
			<Section
				section="legal"
				name="Legal"
				stats={
					users === 0
						? 'No hay contratos'
						: expiring > 0
						? `Número de contratos por expirar ${expiring.length}`
						: 'No hay contratos por expirar'
				}
			/>
			<Section
				section="soporte"
				name="Tickets"
				stats={<TicketsOverview solved={solved} unsolved={unsolved} />}
			/>
			<Section
				section="anuncios"
				name="Anuncios"
				description="Envia anuncios a tus inquilinos"
			/>
			{children}
		</AdminLayout>
	)
}

// Comercial
function Comercial({
	users,
	prospects,
	locations,
	children,
}: {
	users: string | number
	prospects: string | number
	locations: string | number
	children?: React.ReactNode
}) {
	return (
		<ComercialLayout>
			<Section
				section="prospectos"
				name="Prospectos"
				stats={`${
					prospects === 0
						? `No hay prospectos`
						: `Numero de prospectos ${prospects}`
				}`}
			/>
			<Section
				section="inquilinos"
				name="Inquilinos"
				stats={`${
					users === 0 ? `No hay inquilinos` : `Numero de inquilinos ${users}`
				}`}
			/>
			<Section section="propiedades" name="Propiedades" stats={locations} />
			<Section
				section="anuncios"
				name="Anuncios"
				description="Envia anuncios a tus inquilinos"
			/>
			{children}
		</ComercialLayout>
	)
}

// Legal
function Legal({
	users,
	locations,
	expiring,
	children,
}: {
	users: string | number
	locations: string | number
	expiring: string | number | any
	children?: React.ReactNode
}) {
	return (
		<LegalLayout>
			<Section
				section="legal"
				name="Legal"
				stats={
					users === 0
						? 'No hay contratos'
						: expiring > 0
						? `Número de contratos por expirar ${expiring.length}`
						: 'No hay contratos por expirar'
				}
			/>
			<Section
				section="inquilinos"
				name="Inquilinos"
				stats={`${
					users === 0 ? `No hay inquilinos` : `Numero de inquilinos ${users}`
				}`}
			/>
			<Section section="propiedades" name="Propiedades" stats={locations} />
			<Section
				section="anuncios"
				name="Anuncios"
				description="Envia anuncios a tus inquilinos"
			/>
			{children}
		</LegalLayout>
	)
}

// Finanzas
function Finanzas({
	payments,
	receipts,
	children,
}: {
	payments: string | number
	receipts: string | number
	children?: React.ReactNode
}) {
	return (
		<FinanzasLayout>
			<Section
				section="finanzas"
				name="Finanzas"
				stats={`${
					payments === 0
						? `Ningún pago registrado en el mes`
						: `Pagos registrados en el mes ${payments}`
				}`}
			/>
			<Section
				section="recibos"
				name="Recibos"
				stats={`${
					receipts === 0
						? `No hay recibos pendientes`
						: `Por revisar ${receipts}`
				}`}
			/>
			<Section
				section="anuncios"
				name="Anuncios"
				description="Envia anuncios a tus inquilinos"
			/>
			{children}
		</FinanzasLayout>
	)
}

// Soporte
function Soporte({
	solved,
	unsolved,
	children,
}: {
	solved: string | number
	unsolved: string | number
	children?: React.ReactNode
}) {
	return (
		<SoporteLayout>
			<Section
				section="soporte"
				name="Tickets"
				stats={<TicketsOverview solved={solved} unsolved={unsolved} />}
			/>
			<Section
				section="anuncios"
				name="Anuncios"
				description="Envia anuncios a tus inquilinos"
			/>
			{children}
		</SoporteLayout>
	)
}

// User
function UserUI({
	payments,
	tickets,
	children,
}: {
	user: any
	payments: string | number | any
	tickets: string | number | any
	children?: React.ReactNode
}) {
	return (
		<UserLayout>
			<Section
				section="me"
				name="Mi perfil"
				description="Información de tu cuenta"
			/>
			<Section section="me/finanzas" name="Mis pagos" stats={payments} />
			<Section section="me/soporte" name="Mis tickets" stats={tickets} />
			{children}
		</UserLayout>
	)
}

// Unactive
function Unactive() {
	return (
		<UnactiveLayout>
			<Section
				section="me"
				name="Mi perfil"
				description="Información de tu cuenta"
			/>
			<div className="mx-auto max-w-sm sm:col-span-2 sm:max-w-none lg:col-span-3"></div>
		</UnactiveLayout>
	)
}

function Archived() {
	return (
		<div className="grid h-screen bg-brand-dark text-slate-300">
			<div className="m-auto w-11/12 sm:w-10/12">
				<div className="m-auto sm:mt-8 sm:h-36 sm:w-40">
					<img
						className="m-auto"
						src={logo}
						alt="Grupo Vastuu"
						width={160}
						height={160}
					/>
				</div>
				<p className="mt-6 text-center">
					Tu acceso a la aplicación ha vencido.
				</p>
				<div className="mx-auto my-6 grid w-max place-content-center justify-between gap-2 text-center sm:flex sm:gap-x-3">
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}

// Resumen de tickets
function TicketsOverview({
	solved,
	unsolved,
}: {
	solved: string | number
	unsolved: string | number
}) {
	return (
		<>
			{solved === 0 && unsolved === 0 ? (
				<p className="mt-1 text-xs">No hay tickets</p>
			) : null}
			<div className="mt-1 grid h-12">
				<div className="mt-auto grid gap-1">
					{solved === 0 ? null : (
						<p className="text-xs text-emerald-700">
							Tickets resueltos: {solved}
						</p>
					)}
					{unsolved === 0 ? null : (
						<p className="text-xs text-red-700">
							Tickets no resueltos: {unsolved}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

type UserPaymentProps =
	| {
			startDate: string
			isCurrentPaid: boolean
	  }[]
	| any

export function PaymentStats({ payments }: { payments: UserPaymentProps }) {
	return (
		<>
			{payments.length ? (
				!payments[0].isCurrentPaid ? (
					<p className="mt-auto text-xs leading-relaxed">
						* Recuerda que tu pago es el día
						<br />
						<span className="block indent-2 text-xs">
							{payments[0].startDate.split('-')[2].split('T')[0]} de cada mes
						</span>
					</p>
				) : (
					<p className="text-xs text-brand">Sin adeudos</p>
				)
			) : (
				<p className="mt-1 text-xs">Realiza tu primer pago</p>
			)}
		</>
	)
}

type TicketProps = {
	id: string
	title: string
	createdAt: string
	updatedAt: string
	body: string
	category: string
	isSolved: boolean
	archived: boolean
	comments: string[]
	userId: string
}

type TicketsProps = {
	tickets: TicketProps[]
}

export function TicketStats({ tickets }: TicketsProps) {
	return (
		<>
			{!tickets.length ? (
				<p className="mt-1">No tienes tickets</p>
			) : (
				<div className="mt-1 grid h-12 text-xs">
					<div className="mt-auto grid gap-1">
						{tickets.filter((t: TicketProps) => t.isSolved).length === 1 && (
							<p className="text-emerald-600">1 ticket resuelto</p>
						)}
						{tickets.filter((t: TicketProps) => t.isSolved).length > 1 && (
							<p className="text-emerald-600">
								{tickets.filter((t: TicketProps) => t.isSolved).length} tickets
								resueltos
							</p>
						)}
						{tickets.filter((t: TicketProps) => !t.isSolved).length === 1 && (
							<p className="text-red-600">1 ticket sin resolver</p>
						)}
						{tickets.filter((t: TicketProps) => !t.isSolved).length > 1 && (
							<p className="text-red-600">
								{tickets.filter((t: TicketProps) => !t.isSolved).length} tickets
								no resueltos
							</p>
						)}
					</div>
				</div>
			)}
		</>
	)
}

type StaffDashboardProps = {
	id: string
	providerId: string
	name: string
	email: string
	role: string
	data: {
		users: string | number
		prospects: string | number
		payments: string | number
		receipts: string | number
		locations: string | number
		expiring: string | number
		solved: string | number
		unsolved: string | number
		notifications: StaffNotificationProps | any
	}
}

export function StaffDashboard({ user }: { user: StaffDashboardProps }) {
	let location = useLocation()
	return (
		<>
			{user.role === 'admin' && (
				<Admin
					users={user.data.users}
					prospects={user.data.prospects}
					payments={user.data.payments}
					receipts={user.data.receipts}
					locations={user.data.locations}
					expiring={user.data.expiring}
					solved={user.data.solved}
					unsolved={user.data.unsolved}
				>
					{location.pathname === '/' ? (
						<StaffNotifications
							notifications={user.data.notifications}
							role={user.role}
						/>
					) : null}
				</Admin>
			)}
			{user.role === 'comercial' && (
				<Comercial
					users={user.data.users}
					prospects={user.data.prospects}
					locations={user.data.locations}
				>
					{location.pathname === '/' ? (
						<StaffNotifications
							notifications={user.data.notifications}
							role={user.role}
						/>
					) : null}
				</Comercial>
			)}
			{user.role === 'legal' && (
				<Legal
					users={user.data.users}
					locations={user.data.locations}
					expiring={user.data.expiring}
				>
					{location.pathname === '/' ? (
						<StaffNotifications
							notifications={user.data.notifications}
							role={user.role}
						/>
					) : null}
				</Legal>
			)}
			{user.role === 'finanzas' && (
				<Finanzas payments={user.data.payments} receipts={user.data.receipts}>
					{location.pathname === '/' ? (
						<StaffNotifications
							notifications={user.data.notifications}
							role={user.role}
						/>
					) : null}
				</Finanzas>
			)}
			{user.role === 'soporte' && (
				<Soporte solved={user.data.solved} unsolved={user.data.unsolved}>
					{location.pathname === '/' ? (
						<StaffNotifications
							notifications={user.data.notifications}
							role={user.role}
						/>
					) : null}
				</Soporte>
			)}
		</>
	)
}

type UserDashboardProps = {
	user: {
		id: string
		providerId: string
		name: string
		email: string
		subscription: boolean
		data: {
			paymentNotifications: {
				id: string
				title: string
				createdAt: string
				updatedAt: string
				body: string
				attachment: string
				notification: string
				userId: string
			}
			ticketNotifications: TicketProps[]
			userPaymentDetails: {
				payments: string[]
			}
			userAnnouncementDetails: UserNotificationProps
			userCommentNotifications: UserNotificationProps
		}
	}
}

export function UserDashboard({ user }: UserDashboardProps) {
	let location = useLocation()
	return (
		<>
			{!user.data ? (
				<UserUI user={user} payments="No tienes pagos" tickets="No hay tickets">
					{location.pathname === '/' ? (
						<UserNotifications
							notifications={[
								// @ts-ignore
								...user.data.userAnnouncementDetails,
								// @ts-ignore
								...user.data.userCommentNotifications,
							]}
						/>
					) : null}
				</UserUI>
			) : (
				<UserUI
					user={user}
					payments={<PaymentStats payments={user.data.userPaymentDetails} />}
					tickets={<TicketStats tickets={user.data.ticketNotifications} />}
				>
					{location.pathname === '/' ? (
						<UserNotifications
							notifications={[
								// @ts-ignore
								...user.data.userAnnouncementDetails,
								// @ts-ignore
								...user.data.userCommentNotifications,
							]}
						/>
					) : null}
				</UserUI>
			)}
		</>
	)
}

export {
	UserUI,
	Unactive,
	Admin,
	Comercial,
	Legal,
	Finanzas,
	Soporte,
	Archived,
}
