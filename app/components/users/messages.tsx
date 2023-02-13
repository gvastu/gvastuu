import clsx from 'clsx'
import { CategoryIcon } from '~/components/icons'
import { FechaFull, FullDate } from '~/components/shared'

export let Messages = ({
	id,
	title,
	body,
	category,
	createdAt,
	isSolved,
	children,
}: any) => {
	return (
		<>
			<div
				key={id}
				className={clsx(
					'grid max-w-prose gap-2 rounded-md border bg-white px-3 pt-2 pb-3 text-brand sm:max-w-none sm:rounded-md sm:p-4 sm:shadow-lg',
					{
						'border-red-300': !isSolved,
						'border-none bg-slate-300/90': isSolved,
					},
				)}
			>
				<h2 className="text-base font-bold text-brand-dark">{title}</h2>
				<div className="text-sm">
					<p>{body}</p>
				</div>
				<div className="grid grid-flow-col">
					<p className="mt-5 grid grid-flow-col place-content-start text-sm leading-3">
						<CategoryIcon className="text-slate-500" aria-hidden="true" />
						<span className="pl-0.5 lowercase text-slate-500 first-letter:uppercase">
							{category}
						</span>
					</p>
					<div className="ml-auto self-end font-sans text-xs text-slate-500">
						<FechaFull
							day={
								new Date(createdAt).toLocaleDateString('es-MX').split('/')[0]
							}
							month={
								(new Date(createdAt).getMonth() + 1).toLocaleString().length ===
								1
									? '0' + (new Date(createdAt).getMonth() + 1)
									: new Date(createdAt).getMonth() + 1
							}
							year={
								new Date(createdAt).toLocaleDateString('es-MX').split('/')[2]
							}
						/>
					</div>
				</div>
			</div>
			{children}
			{isSolved && (
				<p className="px-3 py-4 text-sm text-emerald-700">Ticket solucionado</p>
			)}
		</>
	)
}

type MessageProps = {
	id: string
	title: string
	body: string
	category: string
	createdAt: string
	isSolved: boolean
	location: string
	comments: string[]
}

export function Message({
	message,
	children,
}: {
	message: MessageProps
	children: React.ReactNode
}) {
	return (
		<>
			<div
				key={message.id}
				className={clsx(
					'grid max-w-prose gap-2 rounded-md border bg-white px-3 pt-2 pb-3 text-brand sm:max-w-none sm:rounded-md sm:p-4 sm:shadow-lg',
					{
						'border-red-300': !message.isSolved,
						'border-none bg-slate-300/90': message.isSolved,
					},
				)}
			>
				<h2 className="text-base font-bold text-brand-dark">{message.title}</h2>
				<div className="text-sm">
					<p>{message.body}</p>
				</div>
				<div className="grid grid-flow-col">
					<p className="mt-5 grid grid-flow-col place-content-start text-sm leading-3">
						<CategoryIcon className="text-slate-500" aria-hidden="true" />
						<span className="pl-0.5 lowercase text-slate-500 first-letter:uppercase">
							{message.category}
						</span>
					</p>
					<div className="ml-auto self-end font-sans text-xs text-slate-500">
						<FullDate
							day={new Date(message.createdAt).getDate()}
							month={new Date(message.createdAt).getMonth()}
							year={new Date(message.createdAt).getFullYear()}
						/>
					</div>
				</div>
			</div>
			{children}
			{message.isSolved && (
				<p className="px-3 py-4 text-sm text-emerald-700">Ticket solucionado</p>
			)}
		</>
	)
}
