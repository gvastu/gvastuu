import * as React from 'react'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import type { MessageData } from '~/models/message.server'
import { useActionData, useLoaderData } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { TextAreaInput, SubmitBtn } from '~/components/elements'
import { updateTicket } from '~/models/comment.server'
import { getMessage } from '~/models/message.server'
import { Alert } from '~/components/elements/alert'
import { Messages } from '~/components/soporte/messages'
import invariant from 'tiny-invariant'
import { BackButton } from '~/components/shared'

export async function loader({ params }: LoaderArgs) {
	let id = params.id
	invariant(id, 'id must be a string')
	return (await getMessage(id)) as MessageData
}

export let validator = withZod(
	z.object({
		id: z.string(),
		comment: zfd.text(
			z.string({
				required_error: 'Escribe tu mensaje',
			}),
		),
		isSolved: zfd.checkbox().nullable(),
		value: zfd.checkbox({ trueValue: 'true' }),
	}),
)

export async function action({ request }: ActionArgs) {
	let result = await validator.validate(await request.formData())
	if (result.error) return validationError(result.error)
	let { id, comment, isSolved } = result.data
	return await updateTicket(id as string, isSolved, comment)
}

export default function () {
	let [showPostComment, setShowPostComment] = React.useState(false)
	let actionData = useActionData()
	let message = useLoaderData()
	return (
		<>
			<Messages
				id={message.id}
				title={message.title}
				body={message.body}
				category={message.category}
				createdAt={message.createdAt}
				isSolved={message.isSolved}
			>
				<Comments comments={message.comments} />
				{!message.isSolved ? (
					<div className="grid">
						<button
							className={`btn-reply ${showPostComment && 'show-form hidden'}`}
							onClick={() => setShowPostComment(true)}
						>
							Responder mensaje
						</button>
						<ValidatedForm
							className="reply-form"
							validator={validator}
							method="post"
							reloadDocument
						>
							<input type="hidden" name="id" value={message.id} />
							<div className="relative flex pt-1">
								<TextAreaInput
									// @ts-ignore
									cols={30}
									// @ts-ignore
									rows={10}
									labelClass="sr-only"
									placeholder="Redacta tu respuesta"
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
							<div className="flex h-20 items-center text-brand">
								<div className="grid self-start pt-4">
									<div className="flex items-center gap-2">
										<input
											className="rounded-sm"
											name="isSolved"
											type="checkbox"
										/>
										<span className="text-sm">Marcar como resuelto</span>
									</div>
								</div>
								<div className="ml-auto text-sm sm:text-base">
									<SubmitBtn>Enviar</SubmitBtn>
								</div>
							</div>
						</ValidatedForm>
					</div>
				) : null}
			</Messages>
			<div className="px-2 text-sm text-brand sm:px-0">
				<BackButton />
			</div>
		</>
	)
}

type CommentProps = {
	comment: string
	commentBy: 'INQUILINO' | 'STAFF'
	idx: string
}[]

function Comments({ comments }: { comments: CommentProps }) {
	return (
		<>
			{!comments.length
				? null
				: comments.map(comment =>
						comment.commentBy === 'INQUILINO' ? (
							<div
								key={comment.idx}
								className="my-4 mb-7 w-11/12 rounded-lg border-[1px] border-slate-200 bg-slate-200 px-4  py-3 shadow-md outline-1"
							>
								<p className="text-xs text-blue-600 sm:text-sm">
									Inquilino:{' '}
									<span className="mt-2 block indent-2 text-sm text-brand">
										{comment.comment}
									</span>
								</p>
							</div>
						) : (
							<div
								key={comment.idx}
								className="my-5 mb-7 ml-auto w-11/12 rounded-lg border-[1px] border-slate-200 bg-slate-200 px-4  py-3 shadow-md outline-1"
							>
								<p className="text-xs text-blue-600 sm:text-sm">
									Mi respuesta:{' '}
									<span className="mt-2 block indent-2 text-sm text-brand">
										{comment.comment}
									</span>
								</p>
							</div>
						),
				  )}
		</>
	)
}
