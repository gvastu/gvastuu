import * as React from 'react'
import {
	AlertDialogLabel,
	AlertDialogDescription,
	AlertDialogOverlay,
	AlertDialogContent,
} from '@reach/alert-dialog'
// import 'node_modules/@reach/dialog/styles.css'
import { DelIcon } from '~/components/icons'

export function ConfirmAlert({
	cta = <DelIcon />,
	descriptionTitle,
	descriptionBody,
	className = 'dialog-open',
	children,
}: {
	cta?: any
	descriptionTitle: string
	descriptionBody: string
	className?: string
	children: React.ReactNode
}) {
	let [showDialog, setShowDialog] = React.useState(false)
	let cancelRef = React.useRef()
	let open = () => setShowDialog(true)
	let close = () => setShowDialog(false)
	return (
		<>
			<button className={className} onClick={open}>
				{cta}
			</button>
			{showDialog && (
				<>
					<AlertDialogOverlay
						isOpen={showDialog}
						onDismiss={close}
						className="fixed inset-0 overflow-auto bg-slate-700/70 transition-all delay-300 duration-300"
						// @ts-ignore
						leastDestructiveRef={cancelRef}
					>
						<AlertDialogContent className="z-50 my-[20vh] ml-20 w-[73vw] scale-90 rounded-md bg-slate-200 p-6 shadow-lg outline-none sm:mx-auto sm:w-[50vw]">
							<AlertDialogLabel className="sr-only">Confirmar</AlertDialogLabel>
							<AlertDialogDescription className="text-brand">
								<p className="text-bold pb-3 text-lg text-brand-dark">
									{descriptionTitle}
								</p>
								<p className="my-2 w-11/12 pb-4">{descriptionBody}</p>
							</AlertDialogDescription>
							<div className="mt-2 flex justify-between">
								{children}
								<button
									className="btn mt-2 text-sm sm:text-base"
									// @ts-ignore
									ref={cancelRef}
									onClick={close}
								>
									Cancelar
								</button>
							</div>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</>
			)}
		</>
	)
}
