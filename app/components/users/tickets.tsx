import { Link } from '@remix-run/react'
import { CategoryIcon } from '~/components/icons'
import { FullDate } from '~/components/shared'

type MessagesProps = {
	messages: MessageProps[]
}

type MessageProps = {
	id: string
	title: string
	createdAt: string
	updatedAt: string
	body: string
	attachment: string
	category: string
	isSolved: boolean
	comments: string[]
	userId: string
}

export let Tickets = ({ messages }: MessagesProps) => {
	return (
		<ul className="mb-6">
			{messages.map((message: MessageProps) => (
				<li
					key={message.id}
					className="card mx-auto mt-5 h-auto w-auto divide-y divide-gray-200 overflow-hidden rounded-lg bg-white p-2.5 shadow first-of-type:mt-0 sm:h-24 sm:p-0"
				>
					<Link to={message.id}>
						<div className="sm:p-4">
							<div className="flex items-center justify-between">
								<p className="max-w-[200px] truncate text-sm text-brand sm:max-w-none">
									{message.title}
								</p>
								<div className="ml-2 flex flex-shrink-0">
									{message.isSolved ? (
										<p className="font-semibold inline-flex rounded-full bg-emerald-100 px-2 text-xs leading-5 text-emerald-800">
											resuelto
										</p>
									) : (
										<div className="font-semibold inline-flex rounded-full bg-red-100 px-2 text-xs leading-5 text-red-800">
											no resuelto
										</div>
									)}
								</div>
							</div>
							<div className="mt-2 sm:flex sm:justify-between">
								<div className="sm:flex">
									<p className="mt-5 grid grid-flow-col place-content-start gap-1 text-sm leading-3 text-brand-light">
										<CategoryIcon className="self-center" aria-hidden="true" />
										{message.category}
									</p>
								</div>
								<div className="flex items-center sm:mt-0">
									<p className="mt-2 ml-1 text-xs text-brand-light sm:mt-5 sm:ml-0">
										<FullDate
											day={new Date(message.createdAt).getDate()}
											month={new Date(message.createdAt).getMonth()}
											year={new Date(message.createdAt).getFullYear()}
										/>
									</p>
								</div>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}
