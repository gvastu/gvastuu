import { Link } from '@remix-run/react'
// import type { Apartment } from "@prisma/client";

export function Propiedad({ id, name, address, available }: any) {
	// }: Pick<Apartment, "id" | "name" | "address" | "available">) {
	return (
		<div
			key={id}
			className="card relative flex h-28 items-center space-x-4 rounded-lg bg-white px-6 py-5 shadow-sm hover:bg-slate-100"
		>
			<div className="flex-shrink-0">
				<img
					className="h-10 w-10 rounded-full"
					src="https://res.cloudinary.com/pmichventura/image/upload/v1640042793/avatar-placeholder_whon3w.jpg"
					alt="Propiedad"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<Link to={id} className="focus:outline-none">
					<span className="absolute inset-0" aria-hidden="true" />
					<p className="font-medium text-sm text-brand">{name}</p>
					<p className="truncate text-xs text-brand-light">{address}</p>
					{available ? (
						<p className="py-2 text-xs text-emerald-500">Disponible</p>
					) : (
						<p className="py-2 text-xs text-red-500">No disponible</p>
					)}
				</Link>
			</div>
		</div>
	)
}
