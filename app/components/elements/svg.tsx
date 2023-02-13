interface ISVG {
	title?: string
	className?: string
	strokeWidth?: number
	fill?: string
	width?: number
	height?: number
	viewBox?: string
	children?: React.ReactNode
}

let SvgIcon: React.FC<ISVG> = function SvgIcon({ children, ...props }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={props.viewBox}
			fill={props.fill}
			stroke="currentColor"
			strokeWidth={props.strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={props.className}
			aria-hidden="true"
			width={props.width}
			height={props.height}
			role="img"
		>
			{props.title ? <title>{props.title}</title> : null}
			{children}
		</svg>
	)
}

export { SvgIcon }
