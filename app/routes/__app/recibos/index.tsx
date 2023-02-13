import type { ActionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import {
	verifyPayment,
	deletePaymentMessage,
	getPaymentReceipts,
} from '~/models/payment.server'
import {
	CheckIcon,
	DelIcon,
	DownloadIcon,
	PropiedadIcon,
} from '~/components/icons'
import { saveAs } from 'file-saver'
import { BackButton, FullDate } from '~/components/shared'

export async function loader() {
	let receipts = await getPaymentReceipts()
	if (!receipts) return json(null, { status: 404 })
	return receipts
}

export async function action({ request }: ActionArgs) {
	let formData = await request.formData()
	let { _action, ...values } = Object.fromEntries(formData)
	if (_action === 'create') {
		let { id, amount: a, locationId } = values
		if (typeof id !== 'string') return null
		if (typeof locationId !== 'string') return null
		let amount = Number(a)
		return json(await verifyPayment(id, amount, locationId), { status: 201 })
	}
	if (_action === 'delete') {
		let { id } = values
		if (typeof id !== 'string') return null
		return json(await deletePaymentMessage(id), { status: 200 })
	}
}

export default () => {
	let receipts = useLoaderData()
	return (
		<>
			{!receipts.length ? (
				<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
					<p>No hay recibos pendientes por revisar</p>
					<BackButton />
				</div>
			) : (
				receipts.map((receipt: any) => (
					<li
						key={receipt.id}
						className="card mx-auto mt-5 h-auto w-auto divide-y divide-gray-200 overflow-hidden rounded-lg bg-white p-2.5 shadow first-of-type:mt-0 hover:cursor-default hover:bg-white hover:outline-indigo-400 sm:h-24 sm:p-0"
					>
						<div className="receipt">
							<p className="flex items-center pl-1 sm:items-start sm:pl-2">
								{receipt.title}
							</p>
							<p className="ml-auto mr-1 flex items-center text-xs text-brand-light sm:items-start">
								<FullDate
									day={new Date(receipt.createdAt).getDate()}
									month={new Date(receipt.createdAt).getMonth()}
									year={new Date(receipt.createdAt).getFullYear()}
								/>
							</p>
							<div>
								<PropiedadIcon aria-hidden="true" />
								<p className="border border-transparent leading-relaxed">
									{receipt.location}
								</p>
							</div>
							<div>
								<button
									type="button"
									className="grid max-w-max place-items-center border px-4 py-2 text-brand-light hover:border-indigo-400 hover:bg-slate-50 hover:text-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
									onClick={() => {
										saveAs(receipt.attachment, 'recibo.png')
									}}
								>
									<span className="sr-only">Descargar</span>
									<DownloadIcon />
								</button>
								<Form method="post">
									<input type="hidden" name="id" value={receipt.id} />
									<input type="hidden" name="amount" value={receipt.amount} />
									<input
										type="hidden"
										name="locationId"
										value={receipt.locationId}
									/>
									<button
										type="submit"
										name="_action"
										value="create"
										className="grid max-w-max place-items-center border px-4 py-2 text-brand-light hover:border-emerald-400 hover:bg-slate-50 hover:text-emerald-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
									>
										<span className="sr-only">Aprobar</span>
										<CheckIcon className="mt-1" />
									</button>
								</Form>
								<Form method="post">
									<input type="hidden" name="id" value={receipt.id} />
									<button
										type="submit"
										name="_action"
										value="delete"
										className="grid max-w-max place-items-center border px-4 py-2 text-brand-light hover:border-red-400 hover:bg-slate-50 hover:text-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
									>
										<span className="sr-only">Eliminar</span>
										<DelIcon />
									</button>
								</Form>
							</div>
						</div>
					</li>
				))
			)}
			{!!receipts.length && (
				<div className="mt-6 px-2 text-sm text-brand sm:px-0">
					<BackButton />
				</div>
			)}
		</>
	)
}
