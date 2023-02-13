import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getUserContract, requireStaffRole } from '~/models/user.server'
import { deleteBooking } from '~/models/booking.server'
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill'
import { BackButton } from '~/components/shared'
import { ConfirmAlert } from '~/components/alert'

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let userId = formData.get('userId')
	let locationId = formData.get('locationId')
	if (typeof userId !== 'string' || typeof locationId !== 'string') return null
	await deleteBooking(userId, locationId)
	return redirect('/legal')
}

export async function loader({ params, request }: LoaderArgs) {
	// @ts-ignore
	// eslint-disable-next-line
	Date.prototype.toTemporalInstant = toTemporalInstant
	let { id } = params as { id: string }
	let [, user] = await Promise.all([
		requireStaffRole(request, ['legal']),
		getUserContract(id),
	])
	if (!user) return null
	// @ts-ignore
	let inicio = new Date(user.startDate)
		// @ts-ignore
		.toTemporalInstant()
		.toZonedDateTimeISO(Temporal.Now.timeZone())
		.toPlainDate()
		.toString()
	// @ts-ignore
	let fin = new Date(user.endDate)
		// @ts-ignore
		.toTemporalInstant()
		.toZonedDateTimeISO(Temporal.Now.timeZone())
		.toPlainDate()
		.toString()
	let hoy = new Date()
		// @ts-ignore
		.toTemporalInstant()
		.toZonedDateTimeISO(Temporal.Now.timeZone())
		.toPlainDate()
	let dias = hoy.until(fin).toString().slice(1, -1)
	let userData = { ...user, inicio, dias }
	return json({ user: userData }, { status: 200 })
}

export default function () {
	let { user } = useLoaderData()
	return (
		<>
			<div className="relative p-4">
				<div className="relative mb-2 rounded-xl bg-slate-50 px-8 py-8 sm:py-6">
					<EliminarContrato userId={user.userId} locationId={user.locationId} />
					<div>
						<h3 className="font-sans text-base text-brand">
							Contrato de {user.name}
						</h3>
					</div>
					<div className="mt-5 border-t border-gray-200">
						<dl className="divide-y divide-gray-200">
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Servicio relacionado</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">
										Renta de {user.location.name}
									</span>
								</dd>
							</div>
							<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
								<dt className="text-sm text-gray-500">Renta mensual</dt>
								<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
									<span className="flex-grow">{user.amount}</span>
								</dd>
							</div>
							{user.active ? (
								<>
									<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="text-sm text-gray-500">Fecha de inicio</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<span className="flex-grow">{user.inicio}</span>
										</dd>
									</div>
									<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="text-sm text-gray-500">
											Días para renovación
										</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<span className="flex-grow">{user.dias}</span>
										</dd>
									</div>
								</>
							) : (
								<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
									<p className="text-sm text-red-800">
										* Por confirmar aceptación de contrato
									</p>
								</div>
							)}
						</dl>
					</div>
				</div>
				<div className="px-2 pt-4 text-sm text-brand">
					<BackButton />
				</div>
			</div>
		</>
	)
}

function EliminarContrato({
	userId,
	locationId,
}: {
	userId: string
	locationId: string
}) {
	return (
		<ConfirmAlert
			descriptionTitle="Confirma que deseas eliminar el contrato"
			descriptionBody="Esta acción no es reversible y se eliminará el contrato del sistema de manera permanente."
		>
			<Form method="post" reloadDocument>
				<input type="hidden" name="userId" value={userId} />
				<input type="hidden" name="locationId" value={locationId} />
				<button
					className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
					type="submit"
				>
					Confirmar
				</button>
			</Form>
		</ConfirmAlert>
	)
}
