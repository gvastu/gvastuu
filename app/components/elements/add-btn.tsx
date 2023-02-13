import { Link } from '@remix-run/react'

function AddButton({
	text,
	path,
	className = 'btn col-span-full my-4 mx-auto text-sm',
	children,
}: {
	text: string
	path: string
	className?: string
	children?: React.ReactNode
}) {
	return (
		<div className="">
			{children}
			<Link to={path} className={className}>
				{text}
			</Link>
		</div>
	)
}

export { AddButton }
