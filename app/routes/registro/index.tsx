import type { ActionArgs, UploadHandler } from '@remix-run/node'
import type { ICloudinaryUploadResponse } from '~/utils/upload.server'
import { withZod } from '@remix-validated-form/with-zod'
import {
	json,
	unstable_composeUploadHandlers as composeUploadHandlers,
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import { Link, useActionData } from '@remix-run/react'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { upload } from '~/utils'
import { checkIfExists } from '~/models/user.server'
import { createUserSubmission } from '~/models/submission.server'
import { FormInput, SubmitBtn } from '~/components/elements'
import { Alert } from '~/components/elements/alert'

let schema = z.object({
	name: zfd.text(
		z.string({
			required_error: 'Escribe tu nombre completo',
		}),
	),
	email: zfd.text(
		z
			.string({
				required_error: 'Escribe tu correo electrónico',
			})
			.email('El correo que ingresaste no es válido, inténtalo nuevamente'),
	),
	phone: zfd.text(
		z
			.string({
				required_error: 'Escribe tu número telefónico',
			})
			.min(8, 'Escribe un número telefónico de al menos 8 dígitos'),
	),
	referral: zfd.text(
		z
			.string({
				required_error: 'Escribe un número telefónico de referencia',
			})
			.min(8, 'Escribe un número telefónico de al menos 8 dígitos'),
	),
})

let clientv = withZod(
	schema.and(
		z.object({
			credential: zfd.file(
				z.instanceof(File, {
					message: 'Debes adjuntar tu identificación',
				}),
			),
			consent: zfd.file(
				z.instanceof(File, {
					message: 'Debes adjuntar tu documento de aceptación',
				}),
			),
		}),
	),
)

let serverv = withZod(
	schema.and(
		z.object({
			credential: zfd.file(z.string()),
			consent: zfd.file(z.string()),
		}),
	),
)

export async function action({ request }: ActionArgs) {
	let uploadHandler: UploadHandler = composeUploadHandlers(
		async ({ name, data }) => {
			if (name !== 'credential' && name !== 'consent') return undefined
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
	let { name, email, phone, referral, credential, consent } = data.data

	let userExists = await checkIfExists(email)

	if (userExists) {
		return json({ error: 'Ya existe un registro con ese correo.' })
	} else {
		console.table({
			name: name,
			email: email,
			phone: phone,
			referral: referral,
			credential: credential,
			consent: consent,
		})
		await createUserSubmission(
			name,
			email,
			phone,
			referral,
			credential,
			consent,
		)
	}

	return json({
		message: `Te has registrado de manera exitosa.`,
	})
}

export default function Registro() {
	let actionData = useActionData()
	return (
		<div className="relative grid">
			<div className="h-auto flex-1 rounded-md p-4 text-brand-light sm:pt-8">
				<div className="flex h-full flex-col justify-between gap-3 sm:gap-0">
					<div className="grid gap-y-3 leading-6">
						<p className="text-sm sm:text-base">
							El primer paso que debes realizar es llenar la siguiente
							solicitud.
						</p>
						<ValidatedForm
							validator={clientv}
							method="post"
							className="w-auto space-y-6 text-sm text-brand-light"
							encType="multipart/form-data"
						>
							<div className="grid grid-cols-2 gap-y-3 gap-x-8 sm:grid-cols-4">
								<div className="col-span-2">
									<label htmlFor="name">Nombre</label>
									<div>
										<FormInput
											label="Nombre"
											name="name"
											type="text"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label htmlFor="email">Correo</label>
									<div>
										<FormInput
											label="Correo"
											name="email"
											type="email"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label htmlFor="phone">Teléfono</label>
									<div>
										<FormInput
											label="Teléfono"
											name="phone"
											type="number"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label htmlFor="referral">Teléfono de contacto</label>
									<div>
										<FormInput
											label="Teléfono de contacto"
											name="referral"
											type="number"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label
										htmlFor="credential"
										className="block text-sm text-brand-light"
									>
										Identificación
									</label>
									<div>
										<FormInput
											label="Identificación"
											name="credential"
											type="file"
											accept="image/*"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label
										htmlFor="consent"
										className="block text-sm text-brand-light"
									>
										Comprobante de domicilio
									</label>
									<div>
										<FormInput
											label="Comprobante de domicilio"
											name="consent"
											type="file"
											accept="image/*"
											className="my-2 w-full rounded-md border-gray-300 p-2 text-brand shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>
							</div>
							{actionData && (
								<div className="m-auto w-max py-3">
									{actionData.message ? (
										<Alert variant="success" title={actionData.message} />
									) : (
										<Alert variant="error" title={actionData.error} />
									)}
								</div>
							)}
							<div className="items-center justify-center text-center text-sm text-slate-400 sm:flex">
								<input
									type="checkbox"
									required
									className="-translate-y-0.5 transform rounded-sm sm:transform-none"
								/>
								<span className="pl-1.5 leading-loose">
									He leído y estoy de acuerdo con el
								</span>
								<Link
									className="block pl-1 text-indigo-400 underline sm:inline"
									to="/aviso-privacidad"
								>
									aviso de privacidad
								</Link>
							</div>
							<div className="grid place-content-center py-2 pb-4">
								<SubmitBtn>Enviar</SubmitBtn>
							</div>
						</ValidatedForm>
						<div className="flex items-center justify-center">
							<div className="text-center text-sm text-slate-400 sm:text-base">
								¿Tienes una cuenta?{' '}
								<Link className="pl-1 text-indigo-400 underline" to="/login">
									Inicia sesión
								</Link>
							</div>
						</div>
						<div className="my-4 py-4 sm:mb-5 sm:pb-0 sm:pt-4">
							<div className="grid gap-4">
								<nav className="text-sm text-white" aria-label="Progress">
									<ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
										<li className="relative hover:cursor-pointer md:flex md:flex-1">
											<span
												className="group flex items-center px-6 py-4"
												aria-current="step"
											>
												<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-200 group-hover:border-blue-100">
													<span className="text-blue-200 group-hover:text-blue-100">
														01
													</span>
												</span>
												<span className="ml-4 text-blue-200 group-hover:text-blue-100">
													Llena la solicitud
												</span>
											</span>
											<div
												className="absolute top-0 right-0 hidden h-full w-5 md:block"
												aria-hidden="true"
											>
												<svg
													className="h-full w-full"
													viewBox="0 0 22 80"
													fill="none"
													preserveAspectRatio="none"
												>
													<path
														d="M0 -2L20 40L0 82"
														vectorEffect="non-scaling-stroke"
														stroke="currentcolor"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
										</li>
										<li className="relative hover:cursor-pointer md:flex md:flex-1">
											<span className="group flex items-center">
												<span className="flex items-center px-6 py-4">
													<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light group-hover:border-blue-200">
														<span className="text-brand-light group-hover:text-blue-200">
															02
														</span>
													</span>
													<span className="ml-4 text-brand-light group-hover:text-blue-200">
														Revisamos tu información
													</span>
												</span>
											</span>
											<div
												className="absolute top-0 right-0 hidden h-full w-5 md:block"
												aria-hidden="true"
											>
												<svg
													className="h-full w-full"
													viewBox="0 0 22 80"
													fill="none"
													preserveAspectRatio="none"
												>
													<path
														d="M0 -2L20 40L0 82"
														vectorEffect="non-scaling-stroke"
														stroke="currentcolor"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
										</li>
										<li className="relative hover:cursor-pointer md:flex md:flex-1">
											<span className="group flex items-center">
												<span className="flex items-center px-6 py-4">
													<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light group-hover:border-blue-200">
														<span className="text-brand-light group-hover:text-blue-200">
															03
														</span>
													</span>
													<span className="ml-4 text-brand-light group-hover:text-blue-200">
														Realiza tu pago
													</span>
												</span>
											</span>
											<div
												className="absolute top-0 right-0 hidden h-full w-5 md:block"
												aria-hidden="true"
											>
												<svg
													className="h-full w-full"
													viewBox="0 0 22 80"
													fill="none"
													preserveAspectRatio="none"
												>
													<path
														d="M0 -2L20 40L0 82"
														vectorEffect="non-scaling-stroke"
														stroke="currentcolor"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
										</li>
										<li className="relative hover:cursor-pointer md:flex md:flex-1">
											<span className="group flex items-center">
												<span className="flex items-center px-6 py-4">
													<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light group-hover:border-blue-200">
														<span className="text-brand-light group-hover:text-blue-200">
															04
														</span>
													</span>
													<span className="ml-4 text-brand-light group-hover:text-blue-200">
														Firma el contrato
													</span>
												</span>
											</span>
										</li>
									</ol>
								</nav>
							</div>
						</div>
						<p className="absolute inset-0 top-auto left-auto pr-4 pb-4 text-xs text-brand-light sm:pb-2">
							Grupo Vastuu © {new Date().getFullYear()}.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
