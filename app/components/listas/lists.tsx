import { Form } from '@remix-run/react'
import { ConfirmAlert } from '~/components/alert'

export function UserList({
	resourceName,
	headings,
	users,
	resourceComponent: ResourceComponent,
}: {
	resourceName: string
	headings: Array<string>
	users: Array<string>
	resourceComponent: any
}) {
	return (
		<>
			{!users.length ? (
				<div className="my-5">
					<div className="grid gap-2 px-2 sm:px-0">
						<div
							className="place-center grid grid-flow-col"
							style={{ gridTemplateColumns: '1fr auto' }}
						>
							<p className="self-center px-2 text-sm text-brand sm:px-0">
								No hay {resourceName}.
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="grid gap-2 px-2 sm:px-0">
					<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-900 sm:pl-6"
									>
										{headings[0]}
									</th>
									<th
										scope="col"
										className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 lg:table-cell"
									>
										{headings[1]}
									</th>
									<th
										scope="col"
										className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
									>
										{headings[2]}
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
									>
										{headings[3]}
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
										<span className="sr-only">Ver</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{users.map((user: any) => (
									<tr
										key={user.id}
										className={`relative ${
											user?.isActive === false ? 'bg-red-50' : null
										}`}
									>
										<ResourceComponent key={user.id} user={user} />
										{!user?.location && (
											<ItemDelete key={user.email} email={user.email} />
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}

function ItemDelete({ email }: { email: string }) {
	return (
		<ConfirmAlert
			descriptionTitle="Confirma que deseas eliminar al usuario"
			descriptionBody="Al realizar esto, el usuario y su información se eliminará del sistema permanentemente."
		>
			<Form method="post">
				<input type="hidden" name="email" value={email} />
				<button
					type="submit"
					className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
				>
					Confirmar
				</button>
			</Form>
		</ConfirmAlert>
	)
}

export function GenericList({
	heading,
	headings,
	users,
	resourceComponent: ResourceComponent,
}: {
	heading?: string
	headings: Array<any>
	users: Array<string>
	resourceComponent: any
}) {
	return (
		<>
			<div className="grid gap-2 px-2 sm:px-0">
				<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
					<h2 className="mb-1 indent-1 text-sm italic text-brand sm:text-base">
						{heading}
					</h2>
					<table className="min-w-full divide-y divide-gray-300">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-gray-900 sm:pl-6"
								>
									{headings[0]}
								</th>
								<th
									scope="col"
									className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 lg:table-cell"
								>
									{headings[1]}
								</th>
								<th
									scope="col"
									className="hidden px-3 py-3.5 text-left text-sm font-normal text-gray-900 sm:table-cell"
								>
									{headings[2]}
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-normal text-gray-900"
								>
									{headings[3]}
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Ver</span>
								</th>
							</tr>
						</thead>
						<tbody className="relative divide-y divide-gray-200 bg-white">
							{users.map((user: any) => (
								<tr key={user.email}>
									<ResourceComponent user={user} />
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}
