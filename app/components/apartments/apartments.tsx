import { Link } from '@remix-run/react'

export function Propiedades({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-8">
			{children}
			<Link to="nueva" className="btn col-span-full my-4 mx-auto text-sm">
				Agregar nueva
			</Link>
		</div>
	)
}
