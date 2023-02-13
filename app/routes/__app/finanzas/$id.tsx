import type { ActionFunction, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { InfoCircleIcon, MoreIcon } from '~/components/icons'
import {
	getPayment,
	getPaymentsCount,
	deletePayment,
} from '~/models/payment.server'
import { FechaFull } from '~/components/shared'
import { ConfirmAlert } from '~/components/alert'
import { redirect } from '@remix-run/server-runtime'

export async function loader({ params }: LoaderArgs) {
	let payment = await getPayment(params.id as string)
	let count = await getPaymentsCount(payment?.locationId as string)
	return json({ payment, count })
}

export let action: ActionFunction = async ({ request }) => {
	let formData = await request.formData()
	let id = formData.get('id') as string
	await deletePayment(id)
	return redirect('/finanzas')
}

export default () => {
	let { payment, count } = useLoaderData<typeof loader>()
	return (
		<>
			<div className="grid gap-y-2">
				<div className="relative overflow-hidden rounded-lg border border-emerald-300 bg-white text-brand shadow">
					<ConfirmAlert
						descriptionTitle="Confirma que deseas eliminar el pago"
						descriptionBody="Esta acción no es reversible y se eliminará el pago del sistema de manera permanente."
					>
						<Form method="post" reloadDocument>
							<input type="hidden" name="id" value={payment?.id} />
							<button
								type="submit"
								className="btn mt-2 bg-red-600 text-sm text-slate-200 transition duration-300 hover:bg-red-700 hover:text-white sm:text-base"
							>
								Confirmar
							</button>
						</Form>
					</ConfirmAlert>
					<div className="grid gap-y-2 px-4 py-5 sm:p-6">
						<pre>
							<div className="mb-2 flex gap-1">
								<span className="-mt-2 font-sans font-bold">
									Pago {count} de <span>{payment?.location.name}</span>
								</span>
							</div>
						</pre>
						<div className="flex gap-1 text-sm">
							Recibido el
							<FechaFull
								className="inline-flex gap-1 lowercase text-blue-600"
								day={payment?.date.split('T')[0].split('-')[2]}
								month={payment?.date.split('T')[0].split('-')[1]}
								year={payment?.date.split('T')[0].split('-')[0]}
							/>
						</div>
						<div className="flex gap-1 text-sm">
							<span>
								Por el monto de{' '}
								<span className="text-sm tracking-tight text-blue-600">
									{Number(payment?.amount).toLocaleString('es-MX', {
										style: 'currency',
										currency: 'MXN',
									})}{' '}
									MXN
								</span>
							</span>
						</div>
						{!payment?.location.booking ? null : (
							<div className="-mb-2 flex gap-1 pt-4 text-sm text-brand">
								<p>Fecha limite:</p>{' '}
								<span className="text-blue-600">
									{
										payment?.location.booking.startDate
											.split('T')[0]
											.split('-')[2]
									}
								</span>
								<FechaFull
									className="lowercase text-blue-600"
									month={(
										Number(
											payment?.location.booking.startDate
												.split('T')[0]
												.split('-')[1],
										) + 1
									)
										.toString()
										.padStart(2, '0')}
									year={Number(
										payment?.location.booking.startDate
											.split('T')[0]
											.split('-')[0],
									)}
								/>
							</div>
						)}
						{count >= Number(11) ? (
							<>
								<div className="mt-4 flex max-w-max items-center gap-1 rounded-lg bg-blue-300 p-4 text-sm text-gray-900/80">
									<InfoCircleIcon />
									<span>Notificar a usuario la renovación de contrato</span>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
			<div className="mt-4 max-w-max">
				<Link
					to=".."
					className="grid grid-flow-col place-items-center gap-1 px-3 pt-2 text-indigo-600 hover:text-indigo-500"
				>
					<MoreIcon className="rotate-180 transform" aria-hidden="true" />
					<p className="text-sm leading-none">Regresar</p>
				</Link>
			</div>
		</>
	)
}
