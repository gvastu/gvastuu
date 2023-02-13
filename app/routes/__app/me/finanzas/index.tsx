import type { ActionArgs, LoaderArgs, UploadHandler } from '@remix-run/node'
import {
	json,
	unstable_composeUploadHandlers as composeUploadHandlers,
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { UserNotifications } from '~/components/notifications'
import { UserLayout as Layout } from '~/components/dashboards/layouts'
import { FormInput, SubmitBtn } from '~/components/elements'
import { PagosIcon } from '~/components/icons'
import { BackButton, FechaFull } from '~/components/shared'
import { createPaymentMessage } from '~/models/message.server'
import type { AccountPaymentUserData as LoaderData } from '~/models/user.server'
import { getAccountPaymentUserData, getUser } from '~/models/user.server'
import type { ICloudinaryUploadResponse } from '~/utils/upload.server'
import { upload } from '~/utils/upload.server'

const schema = z.object({
	title: zfd.text(),
	body: zfd.text(),
	notification: z.enum(['PAYMENT']),
	userId: zfd.text(),
})

const clientv = withZod(
	schema.and(
		z.object({
			attachment: zfd.file(
				z.instanceof(File, {
					message: 'Debes adjuntar tu comprobante de pago',
				}),
			),
		}),
	),
)

const serverv = withZod(
	schema.and(
		z.object({
			attachment: zfd.file(z.string()),
		}),
	),
)

export async function action({ request }: ActionArgs) {
	let uploadHandler: UploadHandler = composeUploadHandlers(
		async ({ name, data }) => {
			if (name !== 'attachment') return undefined
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
	let { title, body, attachment, notification, userId } = data.data

	return await createPaymentMessage(
		title as string,
		body as string,
		attachment as string,
		notification as any,
		userId as string,
	)
}

export async function loader({ request }: LoaderArgs) {
	let data = await getUser(request)
	let user = (await getAccountPaymentUserData(data.providerId)) as LoaderData

	return json({
		...user,
	})
}

export default function () {
	let user = useLoaderData()
	let { data } = useMatches()[1]?.data
	return (
		<>
			<UserNotifications
				notifications={[
					...data.userAnnouncementDetails,
					...data.userCommentNotifications,
				]}
			/>
			<Layout
				className="mx-auto w-11/12 max-w-5xl"
				title="Mis pagos"
				icon={<PagosIcon />}
			>
				{!user.account ? (
					<div className="my-5 grid gap-4 self-center px-2 text-sm text-brand sm:px-0">
						<p>
							Para poder realizar pagos, debes tener contrato vigente o algún
							servicio relacionado.
						</p>
						<BackButton />
					</div>
				) : !user.paymentsMade ? (
					<NewUser user={user} />
				) : (
					<User user={user} />
				)}
			</Layout>
		</>
	)
}

function User({ user }: { user: LoaderData }) {
	return (
		<>
			<div className="px-4 sm:px-5 lg:px-6">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<p className="mt-2 text-sm text-brand">Lista de pagos realizados</p>
					</div>
				</div>
				<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
					<table className="min-w-full divide-y divide-gray-300">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="py-3.5 pl-4 pr-3 text-left text-sm text-brand sm:pl-6"
								>
									Fecha
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm text-brand"
								>
									Monto
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only"></span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{user.payments.map(({ id, date, amount }: any) => (
								<>
									<tr key={id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
											<FechaFull
												day={date.split('T')[0].split('-')[2]}
												month={date.split('T')[0].split('-')[1]}
												year={date.split('T')[0].split('-')[0]}
											/>
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:text-xs">
											{Number(amount)
												.toLocaleString('es-MX', {
													style: 'currency',
													currency: 'MXN',
												})
												.slice(0)}{' '}
											<span className="hidden sm:text-xs">MXN</span>
										</td>
										<td className="whitespace-nowrap py-4 pl-3 pr-2 text-right text-sm">
											<span className="sr-only"></span>
										</td>
									</tr>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mt-5 text-sm text-brand sm:px-6">
				<BackButton />
			</div>
			<FormPaymentUpload user={user} />
		</>
	)
}

function NewUser({ user }: { user: LoaderData }) {
	return (
		<>
			<div className="grid px-2 sm:px-0">
				<div
					className="place-center grid h-16 grid-flow-col"
					style={{ gridTemplateColumns: '1fr auto' }}
				>
					<p className="self-center px-2 text-sm text-brand sm:px-0">
						No has realizado ningún pago
					</p>
				</div>
			</div>
			<FormPaymentUpload user={user} />
			<div className="relative text-sm text-brand">
				<div className="absolute top-4 left-2">
					<BackButton />
				</div>
			</div>
		</>
	)
}

function FormPaymentUpload({ user }: { user: LoaderData }) {
	return (
		<div className="form-payment mx-auto max-w-max pt-5">
			{user.isCurrentPaid ? (
				<p className="text-sm">Tu pago del mes está cubierto</p>
			) : (
				<>
					{
						// @ts-ignore
						!user.notifications.length ? (
							<div>
								<p className="text-sm">Para verificar tu pago, súbelo aquí.</p>
								<ValidatedForm
									className="grid space-y-2"
									validator={clientv}
									method="post"
									encType="multipart/form-data"
								>
									<input
										type="hidden"
										name="title"
										value={user.payment.title}
									/>
									<input type="hidden" name="body" value={user.payment.body} />
									<input
										type="hidden"
										name="notification"
										value={user.payment.notification}
									/>
									<FormInput
										type="file"
										className="m-auto w-[105px] py-2"
										name="attachment"
										label="Adjuntar comprobante"
									/>
									<input type="hidden" name="userId" value={user.userId} />
									<div className="m-auto max-w-fit py-2 text-sm">
										<SubmitBtn>Enviar comprobante</SubmitBtn>
									</div>
								</ValidatedForm>
							</div>
						) : (
							<p className="text-sm">Tu comprobante de pago ha sido enviado.</p>
						)
					}
				</>
			)}
		</div>
	)
}
