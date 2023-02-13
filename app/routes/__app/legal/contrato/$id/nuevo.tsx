import type { LoaderArgs, ActionArgs, UploadHandler } from '@remix-run/node'
import type { ICloudinaryUploadResponse } from '~/utils'
import {
	redirect,
	unstable_composeUploadHandlers as composeUploadHandlers,
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { useActionData, useLoaderData } from '@remix-run/react'
import { getAvailableOnes } from '~/models/location.server'
import { upload } from '~/utils'
import { createBooking } from '~/models/booking.server'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { FormInput, SubmitBtn } from '~/components/elements'
import { Alert } from '~/components/elements/alert'
import { getUserById } from '~/models/user.server'
import { BackButton } from '~/components/shared'

export async function loader({ params }: LoaderArgs) {
	let { id } = params as { id: string }
	const [user, locations] = await Promise.all([
		getUserById(id),
		getAvailableOnes(),
	])
	return { user, locations }
}

let schema = z.object({
	userId: z.string(),
	locationId: z.string(),
	startDate: z
		.string()
		.min(1, 'Debes seleccionar una fecha de inicio')
		.transform(value => new Date(value)),
	amount: z
		.string()
		.min(1, ' Debes seleccionar una cantidad')
		.transform(amount => Number(amount)),
})

let clientv = withZod(
	schema.and(
		z.object({
			contrato: zfd.file(z.instanceof(File)),
		}),
	),
)

let serverv = withZod(
	schema.and(
		z.object({
			contrato: zfd.file(z.string()),
		}),
	),
)

export async function action({ request }: ActionArgs) {
	let uploadHandler: UploadHandler = composeUploadHandlers(
		async ({ name, data }) => {
			if (name !== 'contrato') return undefined
			let uploadedImage = (await upload({
				data,
			})) as unknown as ICloudinaryUploadResponse
			return uploadedImage?.secure_url
		},
		createMemoryUploadHandler(),
	)
	let data = await serverv.validate(
		await parseMultipartFormData(request, uploadHandler),
	)
	if (data.error) return validationError(data.error)
	let { userId, locationId, contrato, startDate, amount } = data.data
	await createBooking(userId, locationId, contrato as string, startDate, amount)
	return redirect('/legal')
}

export default function () {
	let data = useActionData()
	let { user, locations } = useLoaderData()
	return (
		<>
			{!locations ? (
				<div className="text-sm sm:text-base">
					<p className="p-2">
						Para realizar un contrato, necesitas una propiedad disponible.
					</p>
				</div>
			) : (
				<>
					<div className="relative p-4">
						<div className="mb-2 rounded-xl bg-slate-50 px-8 py-8 sm:py-6">
							<div>
								<h3 className="font-sans text-base text-brand">
									Contrato de {user.name}
								</h3>
							</div>
							<ValidatedForm
								validator={clientv}
								className="mt-5 border-t border-gray-200"
								method="post"
								encType="multipart/form-data"
							>
								<input type="hidden" name="userId" value={user.id} />
								<dl className="divide-y divide-gray-200">
									<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="font-medium text-sm leading-loose text-gray-500">
											Servicio relacionado
										</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<select
												name="locationId"
												className="w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
											>
												<>
													{locations.map((location: any) => (
														<option key={location.id} value={location.id}>
															{location.name}
														</option>
													))}
												</>
											</select>
										</dd>
									</div>
								</dl>
								<dl className="divide-y divide-gray-200">
									<div className="relative py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="font-medium text-sm leading-loose text-gray-500">
											Fecha de inicio
										</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<FormInput
												className='focus:outline-none" w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none'
												labelClass="sr-only"
												label="startDate"
												errorClass="absolute top-0 right-2 text-xs text-red-400"
												type="date"
												name="startDate"
												defaultValue={new Date().toISOString().slice(0, 10)}
											/>
										</dd>
									</div>
								</dl>
								<dl className="divide-y divide-gray-200">
									<div className="relative py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="font-medium text-sm leading-loose text-gray-500">
											Renta mensual
										</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<FormInput
												labelClass="sr-only"
												label="amount"
												errorClass="absolute top-0 right-2 text-xs text-red-400"
												type="number"
												name="amount"
												className="w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
											/>
											{/* <input
                        type="number"
                        name="amount"
                        className="w-full appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
                      /> */}
										</dd>
									</div>
								</dl>
								<dl className="divide-y divide-gray-200">
									<div className="relative py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
										<dt className="font-medium text-sm leading-loose text-gray-500">
											Contrato
										</dt>
										<dd className="mt-1 flex text-sm text-brand sm:col-span-2 sm:mt-0">
											<FormInput
												type="file"
												className="w-min py-2"
												name="contrato"
												label="Adjuntar contrato"
											/>
										</dd>
									</div>
								</dl>
								{data && <Alert variant="info" title={data.title} />}
								<div className="mt-5 grid">
									<div className="grid place-content-end text-sm">
										<SubmitBtn>Crear contrato</SubmitBtn>
									</div>
								</div>
							</ValidatedForm>
						</div>
					</div>
					<div className="px-2 text-sm text-brand sm:px-0">
						<BackButton to="/legal" />
					</div>
				</>
			)}
		</>
	)
}
