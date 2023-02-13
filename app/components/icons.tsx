import * as React from 'react'

interface ISVGIcon {
	title?: string
	titleId?: string
	className?: string
	strokeWidth?: number
	fill?: string
	viewBox?: string
	children?: React.ReactNode
}

const SvgIcon: React.FC<ISVGIcon> = function SvgIcon({ children, ...props }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={props.strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={props.className}
			aria-hidden="true"
			width="1em"
			height="1em"
			role="img"
			aria-labelledby={props.titleId}
			{...props}
		>
			{props.title ? <title id={props.titleId}>{props.title}</title> : null}
			{children}
		</svg>
	)
}

const HomeIcon: React.FC<{ className?: string }> = ({
	className = 'w-8 h-8',
}) => (
	<SvgIcon className={className} aria-labelledby="Icono inicio" title="Inicio">
		<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
	</SvgIcon>
)

const PagosIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Pagos Icon" title="Pagos">
		<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
	</SvgIcon>
)

const UsersIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono clientes" title="Clientes">
		<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
	</SvgIcon>
)

const ProspectosIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono prospectos" title="Prospectos">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
		/>
	</SvgIcon>
)

const LegalIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono legal" title="Legal">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1"
			d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		/>
	</SvgIcon>
)

const FinanzasIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono finanzas" title="Finanzas">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1"
			d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
		/>
	</SvgIcon>
)

const GeneralIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono general"
		title="General"
	>
		<path d="M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm8 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-4.07 11c.046-.327.07-.66.07-1a6.97 6.97 0 0 0-1.5-4.33A5 5 0 0 1 19 16v1h-6.07zM6 11a5 5 0 0 1 5 5v1H1v-1a5 5 0 0 1 5-5z" />
	</SvgIcon>
)

const IndividualIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono individual"
		title="Individual"
	>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const ReceiptIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono recibos"
		title="Recibos"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
		/>
	</SvgIcon>
)

const PropiedadIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono propiedades"
		title="Propiedades"
	>
		<path
			d="M5.5 7l7-5v20h-7zM12.5 6.5l7 5V22M2 22h20"
			fill="transparent"
			strokeWidth={1}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)

const SoporteIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono tickets" title="Tickets">
		<path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
	</SvgIcon>
)

const PerfilIcon: React.FC = () => (
	<SvgIcon
		strokeWidth={0}
		viewBox="0 0 32 32"
		aria-labelledby="Icono perfil"
		title="Mi perfil"
	>
		<path
			d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"
			fill="currentColor"
		/>
		<path
			d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z"
			fill="currentColor"
		/>
	</SvgIcon>
)

const NotificacionesIcon: React.FC = () => (
	<SvgIcon
		aria-labelledby="Icono notificaciones"
		title="Notificaciones"
		className="h-6 w-7"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.6}
			stroke="currentColor"
			d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
		/>
	</SvgIcon>
)

const TrashIcon: React.FC = () => (
	<SvgIcon aria-labelledby="Icono borrar" title="Borrar" className="h-6 w-7">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
		/>
	</SvgIcon>
)

const NavToggleIcon: React.FC = () => (
	<SvgIcon
		className="h-6 w-7"
		aria-labelledby="Icono navegacion"
		title="Abrir menu"
	>
		<path
			d="M 6 6 L 22 6 M 6 12 L 22 12 M 6 18 L 13 18"
			fill="transparent"
			strokeWidth={2}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)

const AddIcon: React.FC = () => (
	<div className="relative flex h-5 w-5 rounded-md bg-brand-light">
		<SvgIcon
			className="absolute left-3 top-3 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform"
			aria-labelledby="Add Icon"
			title="Add item"
		>
			<path
				d="M 9.022 3.75 L 9.009 14.25 M 3.75 9 L 14.25 9"
				fill="transparent"
				strokeWidth={1.5}
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SvgIcon>
	</div>
)

const HelpIcon: React.FC = () => (
	<SvgIcon className="h-5 w-5" aria-labelledby="Icono soporte" title="Soporte">
		<path
			d="M12 22a9.97 9.97 0 007.071-2.929A9.97 9.97 0 0022 12a9.97 9.97 0 00-2.929-7.071A9.97 9.97 0 0012 2a9.97 9.97 0 00-7.071 2.929A9.97 9.97 0 002 12a9.97 9.97 0 002.929 7.071A9.97 9.97 0 0012 22z"
			fill="transparent"
			strokeWidth={2}
			stroke="currentColor"
			strokeLinejoin="round"
		/>
		<path
			d="M12 14.313v-2a3 3 0 10-3-3"
			fill="transparent"
			strokeWidth={2}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12 18.813a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
			strokeWidth={0.5}
			stroke="currentColor"
			fill="currentColor"
		/>
	</SvgIcon>
)

const EmailIcon: React.FC<{ className?: string }> = ({
	className = 'w-5 h-5',
}) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono correo"
		title="Email"
		fill="currentColor"
		strokeWidth={1}
	>
		<path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884Z" />
		<path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z" />
	</SvgIcon>
)

const PhoneIcon: React.FC<{ className?: string }> = ({
	className = 'w-5 h-5',
}) => (
	<SvgIcon
		aria-labelledby="Icono telefono"
		title="Telefono"
		className={className}
	>
		<path
			d="M 2 3 C 2 2.448 2.448 2 3 2 L 5.153 2 C 5.642 2 6.059 2.354 6.139 2.836 L 6.879 7.271 C 6.952 7.705 6.732 8.135 6.339 8.331 L 4.791 9.104 C 5.913 11.884 8.116 14.087 10.896 15.209 L 11.67 13.661 C 11.866 13.268 12.296 13.049 12.729 13.121 L 17.164 13.861 C 17.646 13.941 18 14.358 18 14.847 L 18 17 C 18 17.552 17.552 18 17 18 L 15 18 C 7.82 18 2 12.18 2 5 Z"
			fill="currentColor"
		/>
	</SvgIcon>
)

const AdjuntoIcon: React.FC<{ className?: string }> = ({
	className = 'w-5 h-5',
}) => (
	<SvgIcon
		aria-labelledby="Icono adjunto"
		title="Adjunto"
		fill="currentColor"
		strokeWidth={0}
		className={className}
	>
		<path
			fillRule="evenodd"
			d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono usuario"
		title="Usuario"
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const LocationMarkerIcon: React.FC<{ className?: string }> = ({
	className,
}) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono inmueble"
		title="Inmueble"
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const ElectricIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono inmueble"
		title="Inmueble"
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const CategoryIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono inmueble"
		title="Inmueble"
		// fill="currentColor"
		strokeWidth={1.5}
	>
		<path
			d="m9.167 2.5 7.5 7.5a1.25 1.25 0 0 1 0 1.667l-5 5a1.25 1.25 0 0 1-1.667 0l-7.5-7.5V5.833A3.333 3.333 0 0 1 5.833 2.5h3.334"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<circle
			cx="7.5"
			cy="7.5"
			r="1.667"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
)

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		className={className}
		aria-labelledby="Icono fecha"
		title="Fecha"
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono check"
		title="Listo"
		className={className}
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono chevron"
		className={className}
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono chevron"
		className={className}
		fill="currentColor"
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono error"
		title="Error"
		className={className}
		fill="none"
		strokeWidth={1}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</SvgIcon>
)

const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono error"
		title="Error"
		className={className}
		fill="none"
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</SvgIcon>
)

const ExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono error"
		title="Error"
		className={className}
		fill="none"
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/>
	</SvgIcon>
)

const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono perfil"
		title="Perfil"
		className={className}
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono agregar"
		title="Agregar"
		className={className}
		strokeWidth={1}
	>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const DocumentoIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono documentos"
		title="Documentos"
		className={className}
		strokeWidth={1}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		/>
	</SvgIcon>
)

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono ver"
		title="Ver"
		className={className}
		strokeWidth={1}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
		/>
	</SvgIcon>
)

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono descargar"
		title="Descargar"
		className={className}
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
		/>
	</SvgIcon>
)

const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono perfil"
		title="Perfil"
		className={className}
		strokeWidth={1}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
		/>
	</SvgIcon>
)

const UnCheckedIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon aria-labelledby="Icono check" title="Listo" className={className}>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M6 18L18 6M6 6l12 12"
		/>
	</SvgIcon>
)

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon aria-labelledby="Icono enviar" title="Enviar" className={className}>
		<path strokeWidth={2} stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
	</SvgIcon>
)

let AnnotationIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Icono mensaje"
		title="Mensaje"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
		/>
	</SvgIcon>
)

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
	<SvgIcon
		aria-labelledby="Logo"
		fill="currentColor"
		strokeWidth={0.125}
		title="Grupo Vastuu"
		className={className}
	>
		<path d="M 4.784 2.681 L 0 5.692 L 0.054 15.37 L 0.135 25.074 L 19.865 25.074 L 19.946 15.208 L 20 5.343 L 15.351 2.601 C 12.405 0.867 9.986 0 9.986 0 C 9.986 0 7.622 0.894 4.784 2.681 Z M 12.486 2.144 L 14.865 3.542 L 14.865 5.397 C 14.865 7.547 15.108 7.493 11.811 6.095 L 9.73 5.208 L 8.027 5.827 C 5.189 6.875 5.405 6.929 5.405 5.155 L 5.405 3.569 L 7.649 2.171 C 10.324 0.477 9.649 0.477 12.486 2.144 Z M 4.054 5.934 L 4.054 7.332 L 2.73 7.816 C 1.027 8.407 1.081 8.434 1.081 7.251 C 1.081 6.391 2.892 4.671 4 4.509 C 4.027 4.509 4.054 5.155 4.054 5.934 Z M 17.703 5.235 L 18.919 5.988 L 18.919 7.52 C 18.919 9.267 18.946 9.267 17.297 8.461 L 16.081 7.87 L 16 6.176 C 15.919 4.267 15.973 4.214 17.703 5.235 Z M 12.811 7.843 C 14.892 8.81 14.919 8.81 14.757 9.644 C 14.676 10.101 14.595 10.961 14.595 11.526 L 14.595 12.547 L 11.973 12.628 C 9.541 12.708 9.324 12.762 9.324 13.246 C 9.324 13.73 9.541 13.784 11.973 13.864 L 14.595 13.945 L 14.595 17.87 L 12.243 18.676 L 9.865 19.483 L 7.649 18.649 L 5.405 17.816 L 5.405 8.085 L 7.243 7.386 C 9.432 6.526 10.027 6.579 12.811 7.843 Z M 4.054 13.004 C 4.054 17.708 4.243 17.386 1.973 16.445 L 1.081 16.069 L 1.081 9.724 L 2.243 9.294 C 4.135 8.569 4.054 8.38 4.054 13.004 Z M 17.595 9.913 C 18.865 10.45 18.919 10.531 18.919 11.526 L 18.919 12.574 L 15.946 12.574 L 15.946 10.961 C 15.946 10.074 16.027 9.348 16.108 9.348 C 16.189 9.348 16.865 9.617 17.595 9.913 Z M 18.865 15.181 C 18.784 16.418 18.784 16.418 17.378 16.902 L 15.946 17.386 L 15.946 13.918 L 18.946 13.918 Z M 3.919 18.488 C 4 18.488 4.054 19.214 4.054 20.128 L 4.054 21.741 L 6.568 22.923 L 9.054 24.106 L 5.081 24.106 L 1.081 24.133 L 1.081 17.413 L 2.432 17.95 C 3.189 18.246 3.865 18.488 3.919 18.488 Z M 18.919 20.907 L 18.919 24.133 L 14.946 24.133 C 12.784 24.133 11.081 24.052 11.162 23.945 C 11.27 23.837 12.351 23.407 13.595 22.95 L 15.811 22.117 L 15.946 20.397 L 16.081 18.676 L 17.297 18.192 C 17.973 17.923 18.595 17.708 18.73 17.708 C 18.838 17.681 18.919 19.133 18.919 20.907 Z M 7.622 19.966 C 8.541 20.343 9.486 20.638 9.73 20.638 C 9.973 20.638 11.081 20.343 12.162 19.966 C 14.676 19.106 14.595 19.106 14.595 20.289 L 14.595 21.31 L 12.216 22.144 L 9.865 22.977 L 7.649 22.009 C 5.486 21.095 5.405 21.015 5.405 20.181 C 5.405 19.106 5.486 19.106 7.622 19.966 Z" />
	</SvgIcon>
)

const MoreIcon: React.FC<{ className?: string }> = ({
	className = 'h-5 w-5',
}) => (
	<SvgIcon
		aria-labelledby="Ver más"
		fill="currentColor"
		strokeWidth={0.1}
		className={className}
	>
		<path
			fillRule="evenodd"
			d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
			clipRule="evenodd"
		/>
	</SvgIcon>
)

const EditIcon: React.FC<{ className?: string }> = ({
	className = 'h-4 w-4',
}) => (
	<SvgIcon
		aria-labelledby="Editar"
		fill="none"
		strokeWidth={2}
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
		/>
	</SvgIcon>
)

const XIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
	<SvgIcon
		aria-labelledby="Editar"
		fill="none"
		strokeWidth={1}
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</SvgIcon>
)
const DelIcon: React.FC<{ className?: string }> = ({
	className = 'h-4 w-4',
}) => (
	<SvgIcon
		aria-labelledby="Editar"
		fill="none"
		strokeWidth={2}
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</SvgIcon>
)

const ActionIcon: React.FC<{ className?: string }> = ({
	className = 'h-4 w-4',
}) => (
	<SvgIcon
		aria-labelledby="Editar"
		fill="none"
		strokeWidth={2}
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</SvgIcon>
)

const AvisoIcon: React.FC<{ className?: string }> = ({
	className = 'h-4 w-4',
}) => (
	<SvgIcon fill="none" strokeWidth={2} className={className}>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/>
	</SvgIcon>
)

const UndoIcon: React.FC<{ className?: string }> = ({
	className = 'w-4 h-4',
}) => (
	<SvgIcon
		fill="currentColor"
		className={className}
		aria-labelledby="Icono undo"
		title="Deshacer"
	>
		<path d="M17.026 22.957C27.983 11.536 14.7 2.092 6.642 9.648L9.106 12H0V3.053l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z" />
	</SvgIcon>
)

const BellIcon: React.FC<{ className?: string }> = ({
	className = 'w-6 h-6',
}) => (
	<SvgIcon
		fill="#dee1e6"
		strokeWidth={1.5}
		className={className}
		aria-labelledby="Icono notificaciones"
		title="Notificaciones"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
		/>
	</SvgIcon>
)

const XMarkIcon: React.FC<{ className?: string }> = ({
	className = 'w-5 h-5',
}) => (
	<SvgIcon
		fill="none"
		strokeWidth={1.5}
		className={className}
		aria-labelledby="Icono cerrar"
		title="Cerrar"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</SvgIcon>
)

export {
	HomeIcon,
	PagosIcon,
	UsersIcon,
	PropiedadIcon,
	SoporteIcon,
	PerfilIcon,
	ProfileIcon,
	NotificacionesIcon,
	NavToggleIcon,
	AddIcon,
	HelpIcon,
	EmailIcon,
	PhoneIcon,
	AdjuntoIcon,
	DocumentoIcon,
	LegalIcon,
	FinanzasIcon,
	IndividualIcon,
	GeneralIcon,
	ReceiptIcon,
	UserIcon,
	ProspectosIcon,
	LogoutIcon,
	LocationMarkerIcon,
	CalendarIcon,
	CheckIcon,
	CategoryIcon,
	XCircleIcon,
	InfoCircleIcon,
	ExclamationIcon,
	UnCheckedIcon,
	MoreIcon,
	EditIcon,
	AnnotationIcon,
	TrashIcon,
	EyeIcon,
	ElectricIcon,
	DownloadIcon,
	PlusIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	DelIcon,
	SendIcon,
	LogoIcon,
	XIcon,
	ActionIcon,
	AvisoIcon,
	UndoIcon,
	BellIcon,
	XMarkIcon,
}
