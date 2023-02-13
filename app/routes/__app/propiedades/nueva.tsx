import { withZod } from '@remix-validated-form/with-zod'
import type { ActionFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { Link, useActionData } from '@remix-run/react'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { FormInput, SubmitBtn } from '~/components/elements'
import { MoreIcon } from '~/components/icons'
import { createLocation } from '~/models/location.server'
import { Alert } from '~/components/elements/alert'
import { getUserId } from '~/models/user.server'
import { BackButton } from '~/components/shared'

export let validator = withZod(
	z.object({
		name: z.string({ required_error: 'Escribe el nombre de la propiedad' }),
		address: z.string({
			required_error: 'Escribe la dirección de la propiedad',
		}),
	}),
)

export let action: ActionFunction = async ({
	request,
}: {
	request: Request
}) => {
	let id = (await getUserId(request)) as string
	let data = await validator.validate(await request.formData())
	if (data.error) return validationError(data.error)
	let { name, address } = data.data
	await createLocation(name, address, id)
	return json(
		{
			title: `Has creado una nueva propiedad`,
		},
		{ status: 201 },
	)
}

export default function () {
	let data = useActionData()
	return (
		<>
			<div className="relative p-0 sm:p-4">
				<div className="rounded-xl bg-slate-50 px-4 pt-6 sm:px-8">
					<div>
						<h3 className="font-sans text-base text-brand">
							Crear nueva propiedad
						</h3>
					</div>
					<ValidatedForm
						validator={validator}
						method="post"
						className="mt-5 border-t border-gray-200"
					>
						<div className="divide-y divide-gray-200">
							{/* Nombre */}
							<div className="relative py-4 sm:flex sm:py-5">
								<FormInput
									labelClass="w-1/3 leading-loose text-sm text-gray-500"
									errorClass="absolute top-0 right-2 text-xs text-red-400"
									label="Nombre"
									className='focus:outline-none" w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none'
									type="text"
									name="name"
								/>
							</div>
							{/* Dirección */}
							<div className="relative py-4 sm:flex sm:py-5">
								<FormInput
									labelClass="w-1/3 leading-loose text-sm text-gray-500"
									errorClass="absolute top-0 right-2 text-xs text-red-400"
									label="Dirección"
									className='focus:outline-none" w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none'
									type="text"
									name="address"
								/>
							</div>
							{data && (
								<Alert
									variant="info"
									title={data.title}
									details={data.description}
								/>
							)}
							<div className="flex py-4 sm:py-5">
								<div className="ml-auto text-sm">
									<SubmitBtn>Crea propiedad</SubmitBtn>
								</div>
							</div>
						</div>
					</ValidatedForm>
				</div>
			</div>
			<div className="px-2 pt-4 text-sm text-brand sm:px-7 sm:pt-3.5">
				<BackButton to="/propiedades" />
			</div>
		</>
	)
}
