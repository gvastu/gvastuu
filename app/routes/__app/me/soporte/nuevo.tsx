import { ActionArgs, json } from '@remix-run/node'
import { useActionData, useLocation, useMatches } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { UserNotifications } from '~/components/notifications'
import { UserLayout as Layout } from '~/components/dashboards/layouts'
import { FormInput, SubmitBtn, TextAreaInput } from '~/components/elements'
import { Alert } from '~/components/elements/alert'
import { SoporteIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'
import { createMessage } from '~/models/message.server'
import { getUserId } from '~/models/user.server'

const schema = z.object({
	title: z.string().min(4, 'Escribe tu título'),
	body: z.string().min(10, 'Escribe tu mensaje'),
	category: z.enum(['ELECTRICO', 'FUGA', 'GAS', 'OTROS']),
})

const clientv = withZod(schema)
const validator = withZod(schema)

export async function action({ request }: ActionArgs) {
	let id = (await getUserId(request)) as string
	const result = await validator.validate(await request.formData())
	if (result.error) return validationError(result.error)
	let { title, body, category } = result.data
	await createMessage(title, body, category, id)
	return json({
		title: `Tu ticket ha sido enviado`,
	})
}

export default function () {
	let { data } = useMatches()[1]?.data
	let location = useLocation()
	let actionData = useActionData()
	return (
		<>
			<UserNotifications
				notifications={[
					...data.userAnnouncementDetails,
					...data.userCommentNotifications,
				]}
			/>
			<Layout
				className="w-11/12 max-w-5xl sm:m-auto"
				title="Nuevo ticket"
				icon={<SoporteIcon />}
			>
				<div className="relative p-1 sm:p-4">
					<div className="rounded-xl bg-slate-50 px-5 pt-6 sm:px-8">
						<div>
							<h3 className="font-sans text-sm text-brand sm:text-base">
								Crear un ticket
							</h3>
						</div>
						<ValidatedForm
							validator={clientv}
							method="post"
							replace
							className="mt-5 border-t border-gray-200"
						>
							<div>
								{/* Título */}
								<div className="relative flex pt-6">
									<FormInput
										labelClass="sr-only"
										placeholder="Título"
										errorClass="absolute top-1 right-2 text-xs text-red-400"
										label="Título"
										className="w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
										type="text"
										name="title"
									/>
								</div>
								{/* Mensaje */}
								<div className="relative flex pt-6">
									<TextAreaInput
										// @ts-ignore
										rows={10}
										labelClass="sr-only"
										placeholder="Mensaje"
										errorClass="absolute top-1 right-2 text-xs text-red-400"
										label="Mensaje"
										className="w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
										name="body"
									/>
								</div>
								{/* Categoria */}
								<div className="grid text-sm text-brand">
									<div className="mb-2 mt-4 ml-auto grid gap-y-1">
										<span className="block leading-loose">
											Elige una categoria
										</span>
										<select
											className="appearance-none rounded border border-slate-300 bg-slate-200 text-sm focus:bg-white focus:outline-none"
											name="category"
										>
											<option value="ELECTRICO">Electrico</option>
											<option value="FUGA">Fuga</option>
											<option value="GAS">Gas</option>
											<option value="OTROS">Otros</option>
										</select>
									</div>
								</div>
								{actionData?.fieldErrors && (
									<div className="grid">
										<div className="ml-auto">
											<Alert
												variant="error"
												title="Error"
												details="Inténtalo nuevamente"
											/>
										</div>
									</div>
								)}
								{actionData?.title && (
									<div className="grid">
										<div className="ml-auto">
											<Alert variant="success" title={actionData.title} />
										</div>
									</div>
								)}
								<div className="flex pb-3">
									<div className="my-3 ml-auto text-sm sm:text-base">
										<input
											type="hidden"
											name="redirectTo"
											value={location.pathname}
										/>
										<SubmitBtn>Enviar ticket</SubmitBtn>
									</div>
								</div>
							</div>
						</ValidatedForm>
					</div>
					<div className="px-2 pt-6 text-sm text-brand">
						<BackButton />
					</div>
				</div>
			</Layout>
		</>
	)
}
