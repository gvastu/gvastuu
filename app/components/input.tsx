import React, { forwardRef } from 'react'
import { useField } from 'remix-validated-form'

type InputProps = {
	name: string
	label: string
	type?: string
	value?: string
	placeholder?: string
	hideErrors?: boolean
	'data-id'?: string
	form?: string
	className?: string
	labelClassName?: string
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
	(
		{
			name,
			label,
			type = 'text',
			value,
			placeholder,
			hideErrors: noErrors,
			'data-id': dataId,
			form,
			className,
			labelClassName,
		}: InputProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		const { getInputProps, error } = useField(name)
		return (
			<div>
				<label className={labelClassName} htmlFor={name}>
					{label}
				</label>
				<input
					className={className}
					placeholder={placeholder}
					data-id={dataId}
					{...getInputProps({
						form,
						type,
						ref,
						id: name,
						value,
					})}
				/>
				{/* {error && !noErrors && <span className="sr-only">{error}</span>} */}
				{error && !noErrors && (
					<span className="block pt-1 text-sm text-red-400">{error}</span>
				)}
			</div>
		)
	},
)
