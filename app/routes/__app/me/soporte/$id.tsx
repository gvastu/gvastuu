import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { useActionData, useLoaderData, useMatches } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import * as React from 'react'
import { ValidatedForm, validationError } from 'remix-validated-form'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { UserNotifications } from '~/components/notifications'
import { UserLayout as Layout } from '~/components/dashboards/layouts'
import { SubmitBtn, TextAreaInput } from '~/components/elements'
import { Alert } from '~/components/elements/alert'
import { SoporteIcon, SendIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'
import { Message } from '~/components/users/messages'
import { postComment } from '~/models/comment.server'
import { getMessage } from '~/models/message.server'

export let validator = withZod(
	z.object({
		id: z.string(),
		comment: zfd.text(z.string().min(1, 'Redacta tu mensaje')),
	}),
)

export async function action({ request }: ActionArgs) {
	let result = await validator.validate(await request.formData())
	if (result.error) return validationError(result.error)
	let { id, comment } = result.data
	return await postComment(id, comment)
}

export async function loader({ params }: LoaderArgs) {
	invariant(params.id, 'Missing id')
	return await getMessage(params.id)
}

export default function () {
	let { data } = useMatches()[1]?.data
	let actionData = useActionData()
	let [showPostComment, setShowPostComment] = React.useState(false)
	let message = useLoaderData()
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
				title="Mi ticket"
				icon={<SoporteIcon />}
			>
				<Message message={message}>
					<Comments comments={message.comments} />
					{!message.isSolved ? (
						<div className="mt-4 grid">
							<button
								className={`btn-reply relative ${
									showPostComment && 'show-form hidden'
								}`}
								onClick={() => setShowPostComment(true)}
							>
								<SendIcon className="absolute right-0 bottom-0.5" />
								Redactar mensaje
							</button>
							<div className="reply-form">
								<ValidatedForm
									reloadDocument
									validator={validator}
									method="post"
								>
									<input type="hidden" name="id" value={message.id} />
									<div className="relative flex pt-1">
										<TextAreaInput
											// @ts-ignore
											cols={30}
											// @ts-ignore
											rows={10}
											labelClass="sr-only"
											placeholder="Redacta tu nuevo mensaje"
											errorClass="absolute top-1 right-2 text-xs text-red-400"
											label="comment"
											className="w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
											name="comment"
										/>
									</div>
									{actionData && (
										<div className="grid">
											<div className="ml-auto">
												<Alert variant="success" title="Mensaje enviado" />
											</div>
										</div>
									)}
									<div className="my-4 grid">
										<div className="ml-auto text-sm sm:text-base">
											<SubmitBtn>Enviar</SubmitBtn>
										</div>
									</div>
								</ValidatedForm>
							</div>
						</div>
					) : null}
				</Message>
				<div className="px-2 text-sm text-brand">
					<BackButton to="/me/soporte" />
				</div>
			</Layout>
		</>
	)
}

type CommentsProps = {
	comments: {
		id: string
		comment: string
		commentBy: 'INQUILINO' | ''
	}[]
}

function Comments({ comments }: CommentsProps) {
	return (
		<>
			{!comments.length
				? null
				: comments.map(({ id, comment, commentBy }) =>
						commentBy === 'INQUILINO' ? (
							<div
								key={id}
								className="my-4 mb-7 w-11/12 rounded-lg border-[1px] border-slate-200 bg-slate-200 px-4  py-3 shadow-md outline-1"
							>
								<p className="text-xs text-blue-600 sm:text-sm">
									Mi mensaje:{' '}
									<span className="mt-2 block indent-2 text-sm text-brand">
										{comment}
									</span>
								</p>
							</div>
						) : (
							<div
								key={id}
								className="my-5 mb-7 ml-auto w-11/12 rounded-lg border-[1px] border-slate-200 bg-slate-200 px-4  py-3 shadow-md outline-1"
							>
								<p className="text-xs text-blue-600 sm:text-sm">
									Respuesta recibida:{' '}
									<span className="mt-2 block indent-2 text-sm text-brand">
										{comment}
									</span>
								</p>
							</div>
						),
				  )}
		</>
	)
}
