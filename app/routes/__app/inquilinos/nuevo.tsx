import type { ActionArgs, UploadHandler } from '@remix-run/node'
import {
	json,
	unstable_composeUploadHandlers as composeUploadHandlers,
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { FormInput, SubmitBtn } from '~/components/elements'
import { Alert } from '~/components/elements/alert'
import { BackButton } from '~/components/shared'
import { createUser } from '~/models/submission.server'
import { checkIfExists } from '~/models/user.server'
import { upload } from '~/utils'
import type { ICloudinaryUploadResponse } from '~/utils/upload.server'

let schema = z.object({
	name: zfd.text(
		z.string({
			required_error: 'Escribe el nombre completo',
		}),
	),
	email: zfd.text(
		z
			.string({
				required_error: 'Escribe el correo electrónico',
			})
			.email('Correo no válido, inténtalo nuevamente'),
	),
	phone: zfd.text(
		z
			.string({
				required_error: 'Escribe el número telefónico',
			})
			.min(8, 'El número telefónico debe contener al menos 8 dígitos'),
	),
	referral: zfd.text(
		z
			.string({
				required_error: 'Escribe el número telefónico de referencia',
			})
			.min(8, 'El número telefónico debe contener al menos 8 dígitos'),
	),
})

let clientv = withZod(
	schema.and(
		z.object({
			credential: zfd.file(
				z.instanceof(File, {
					message: 'Adjunta una identificación',
				}),
			),
			consent: zfd.file(
				z.instanceof(File, {
					message: 'Adjunta el comprobante de domicilio',
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
		return json({ error: 'Ya existe un usuario con ese correo.' })
	} else {
		await createUser(name, email, phone, referral, credential, consent)
	}

	return json({
		message: `Usuario creado.`,
	})
}

export default function Registro() {
	let actionData = useActionData()
	return (
		<div className="relative grid">
			<div className="h-auto flex-1 rounded-md text-brand-light sm:px-4">
				<div className="flex h-full flex-col justify-between gap-3 sm:gap-0">
					<div className="grid gap-y-3 leading-6">
						<p className="pb-3 text-sm italic sm:text-base">
							Agregar nuevo inquilino
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
								<div className="m-auto w-max">
									{actionData.message ? (
										<Alert variant="success" title={actionData.message} />
									) : (
										<Alert variant="error" title={actionData.error} />
									)}
								</div>
							)}
							<div className="grid place-content-end">
								<SubmitBtn>Enviar</SubmitBtn>
							</div>
						</ValidatedForm>
					</div>
					<div className="px-2 text-sm text-brand sm:-mt-2">
						<BackButton />
					</div>
				</div>
			</div>
		</div>
	)
}
