import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import {
	Checkbox,
	CheckboxGroup,
	CustomCheckbox,
	CustomCheckboxGroup,
	FormInput,
	SubmitBtn,
	TextAreaInput,
} from '~/components/elements'
import { Alert } from '../elements/alert'
import { BackButton } from './backbutton'

export let validator = withZod(
	z.object({
		title: z.string().min(1, 'Escribe un título'),
		content: z.string().min(1, 'Escribe un mensaje'),
		user: zfd
			.repeatable(z.array(z.string()).min(1, 'Selecciona destinatario'))
			.transform(value => value.map(user => ({ user }))),
	}),
)

export type ComposedUserList = {
	value: string
	name: string
}

type AnnouncementData = {
	title: string
	description: string
}

function Announcement({
	users,
	title,
	audience,
	data,
}: {
	users: ComposedUserList[]
	title: string
	audience?: string
	data?: AnnouncementData
}) {
	return (
		<>
			<h2 className="px-1 py-2 text-sm text-brand sm:text-base">{title}</h2>
			<ValidatedForm
				validator={validator}
				method="post"
				className="col-span-2 mt-3 grid gap-4 border-t border-gray-200"
			>
				<FormInput
					labelClass="sr-only"
					placeholder="Título"
					errorClass="text-xs text-red-400"
					label="Título"
					className="w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
					type="text"
					name="title"
				/>
				<TextAreaInput
					// @ts-ignore
					rows={10}
					labelClass="sr-only"
					placeholder="Mensaje"
					errorClass="text-xs text-red-400"
					label="Mensaje"
					className="w-full flex-1 appearance-none rounded border border-slate-300 bg-slate-200 text-sm leading-tight text-slate-500 focus:bg-white focus:outline-none"
					name="content"
				/>
				<div className="relative grid place-content-end gap-y-6 pt-2">
					{audience === 'general' ? (
						<CustomCheckboxGroup name="user" label="">
							<>
								{users.map((user: ComposedUserList) => {
									return (
										<div key={user.value}>
											<CustomCheckbox
												value={user.value}
												label={user.name}
												name="user"
											/>
										</div>
									)
								})}
							</>
						</CustomCheckboxGroup>
					) : (
						<CheckboxGroup name="user" label="Selecciona destinatario">
							<>
								{users.map((user: ComposedUserList) => {
									return (
										<div key={user.value}>
											<Checkbox
												value={user.value}
												label={user.name}
												name="user"
											/>
										</div>
									)
								})}
							</>
						</CheckboxGroup>
					)}
					<SubmitBtn>Enviar</SubmitBtn>
					<div className="absolute top-3 left-2 text-sm text-brand">
						<BackButton to="/anuncios" />
					</div>
				</div>
			</ValidatedForm>
			{data && (
				<div className="grid">
					<div className="ml-auto">
						<Alert
							variant="success"
							title={data.title}
							details={data.description}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export { Announcement }
