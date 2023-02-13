import clsx from 'clsx'
import {
	CheckIcon,
	XCircleIcon,
	InfoCircleIcon,
	ExclamationIcon,
} from '~/components/icons'
import type { FC, ReactNode } from 'react'

export type AlertVariants = 'error' | 'info' | 'success' | 'warning'

export type AlertProps = {
	title?: string
	details?: ReactNode
	className?: string
	variant: AlertVariants
	action?: ReactNode
}

const variantIcons = {
	error: XCircleIcon,
	info: InfoCircleIcon,
	success: CheckIcon,
	warning: ExclamationIcon,
}

export let Alert: FC<AlertProps> = ({
	title,
	details,
	className,
	variant,
	action,
}) => {
	const Icon = variantIcons[variant]

	return (
		<div
			className={clsx(
				'rounded-md border border-red-400 p-4',
				variant === 'error' && 'border-red-400 bg-red-50',
				variant === 'info' && 'border-blue-400 bg-blue-50',
				variant === 'warning' && 'border-yellow-400 bg-yellow-50',
				variant === 'success' && 'border-green-400 bg-green-50',
				className,
			)}
		>
			<div className="flex">
				<div className="flex-shrink-0">
					<Icon
						className={clsx(
							'h-5 w-5',
							variant === 'error' && 'text-red-500',
							variant === 'info' && 'text-blue-500',
							variant === 'warning' && 'text-yellow-500',
							variant === 'success' && 'text-green-500',
						)}
					/>
				</div>
				<div className="ml-3 flex-1">
					{title && (
						<h3
							className={clsx(
								'font-medium text-sm',
								variant === 'error' && 'text-red-800',
								variant === 'info' && 'text-blue-800',
								variant === 'warning' && 'text-yellow-800',
								variant === 'success' && 'text-green-800',
							)}
						>
							{title}
						</h3>
					)}
					{details && (
						<div
							className={clsx(
								'text-sm',
								!!title && 'mt-2',
								variant === 'error' && 'text-red-600',
								variant === 'info' && 'text-blue-600',
								variant === 'warning' && 'text-yellow-600',
								variant === 'success' && 'text-emerald-600',
							)}
						>
							{details}
						</div>
					)}
				</div>
				{action && <div className="flex-shrink-0">{action}</div>}
			</div>
		</div>
	)
}
