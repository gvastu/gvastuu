import { Link } from '@remix-run/react'
import { LocationMarkerIcon, UserIcon } from '~/components/icons'
import { BackButton } from '../shared'

export let UserTickets = ({ tickets }: any) => {
	return (
		<ul>
			{tickets.length ? (
				tickets.map((i: any) => (
					<li
						key={i.id}
						className="card mx-auto h-auto w-auto max-w-3xl divide-y divide-gray-200 overflow-hidden rounded-none bg-white p-0 shadow sm:h-24"
					>
						<Link to={i.id} className="block">
							<div className="p-4 sm:px-6">
								<div className="flex items-center justify-between">
									<p className="font-medium truncate text-sm text-brand">
										{i.title}
									</p>
									<div className="ml-2 flex flex-shrink-0">
										{i.closed ? (
											<p className="font-semibold inline-flex rounded-full bg-emerald-100 px-2 text-xs leading-5 text-emerald-800">
												resuelto
											</p>
										) : (
											<div className="font-semibold inline-flex rounded-full bg-red-100 px-2 text-xs leading-5 text-red-800">
												no resuelto
											</div>
										)}
									</div>
								</div>
								<div className="mt-2 sm:flex sm:justify-between">
									<div className="sm:flex">
										<p className="flex items-center text-sm text-brand-light">
											<UserIcon
												className="mr-1.5 h-5 w-5 flex-shrink-0"
												aria-hidden="true"
											/>
											{i.userId}
										</p>
										<p className="mt-2 flex items-center text-sm text-brand-light sm:ml-6 sm:mt-0">
											<LocationMarkerIcon
												className="mr-1.5 h-5 w-5 flex-shrink-0"
												aria-hidden="true"
											/>
											{/* {i.userId} */}
											{i.category}
										</p>
									</div>
									<div className="mt-2 flex items-center sm:mt-0">
										<p className="ml-1 text-xs text-brand-light sm:ml-0">
											<time>{i.createdAt}</time>
										</p>
									</div>
								</div>
							</div>
						</Link>
					</li>
				))
			) : (
				<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
					<p>No tienes tickets</p>
					<BackButton />
				</div>
			)}
		</ul>
	)
}
