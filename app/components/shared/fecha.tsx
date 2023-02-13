import { Link } from '@remix-run/react'
import { formatDate } from '~/utils'

export let Fecha = ({
	className,
	month = formatDate(new Date()),
	year = new Date().getFullYear(),
}: {
	className?: string
	month?: any
	year?: any
}) => {
	return (
		<>
			<span className={className}>
				{month === 1 ? 'Enero' : null}
				{month === 2 ? 'Febrero' : null}
				{month === 3 ? 'Marzo' : null}
				{month === 4 ? 'Abril' : null}
				{month === 5 ? 'Mayo' : null}
				{month === 6 ? 'Junio' : null}
				{month === 7 ? 'Julio' : null}
				{month === 8 ? 'Agosto' : null}
				{month === 9 ? 'Septiembre' : null}
				{month === 10 ? 'Octubre' : null}
				{month === 11 ? 'Noviembre' : null}
				{month === 12 ? 'Diciembre' : null} {year}
			</span>
		</>
	)
}

export let FechaFull = ({
	className,
	day,
	month,
	year = new Date().getFullYear(),
}: {
	className?: string
	day?: any
	month?: any
	year?: any
}) => {
	return (
		<div className="flex gap-1">
			<div className={className}>
				<span>{day} de</span>{' '}
				<span>
					{month === '01' ? 'Enero' : null}
					{month === '02' ? 'Febrero' : null}
					{month === '03' ? 'Marzo' : null}
					{month === '04' ? 'Abril' : null}
					{month === '05' ? 'Mayo' : null}
					{month === '06' ? 'Junio' : null}
					{month === '07' ? 'Julio' : null}
					{month === '08' ? 'Agosto' : null}
					{month === '09' ? 'Septiembre' : null}
					{month === '10' ? 'Octubre' : null}
					{month === '11' ? 'Noviembre' : null}
					{month === '12' ? 'Diciembre' : null}
				</span>{' '}
				<span>{year}</span>
			</div>
		</div>
	)
}

export let FullDate = ({
	className,
	day,
	month,
	year,
}: {
	className?: string
	day: number
	month: number
	year: number
}) => {
	return (
		<div className="flex gap-1">
			<div className={className}>
				<span>{day} de</span>{' '}
				<span>
					{month === 0 ? 'Enero' : null}
					{month === 1 ? 'Febrero' : null}
					{month === 2 ? 'Marzo' : null}
					{month === 3 ? 'Abril' : null}
					{month === 4 ? 'Mayo' : null}
					{month === 5 ? 'Junio' : null}
					{month === 6 ? 'Julio' : null}
					{month === 7 ? 'Agosto' : null}
					{month === 8 ? 'Septiembre' : null}
					{month === 9 ? 'Octubre' : null}
					{month === 10 ? 'Noviembre' : null}
					{month === 11 ? 'Diciembre' : null}
				</span>{' '}
				<span>{year}</span>
			</div>
		</div>
	)
}

export let CustomLink = ({
	className,
	month,
	year,
	children,
}: {
	className?: string
	month?: any
	year?: any
	children: React.ReactNode
}) => {
	return (
		<>
			<Link className={className} to={`./${month}/${year}`}>
				{children}
			</Link>
		</>
	)
}
