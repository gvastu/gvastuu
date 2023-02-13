import * as React from 'react'
import { useField } from 'remix-validated-form'

type TFormInput = {
	name: string
	label: string
	labelClass?: string
	errorClass?: string
	type?: string
	accept?: string
	placeholder?: string
	defaultValue?: any
	ref?: React.Ref<HTMLInputElement>
	onBlur?: (e: any) => void
	className?: string
}

export const FormInput = ({
	name,
	label,
	labelClass = 'sr-only',
	errorClass = 'text-xs text-red-400 sm:text-sm',
	type = 'text',
	defaultValue,
	accept,
	ref,
	onBlur,
	placeholder,
	className,
}: TFormInput) => {
	let { error, getInputProps } = useField(name)
	return (
		<>
			<label className={labelClass} htmlFor={name}>
				{label}
			</label>
			<input
				ref={ref}
				className={className}
				placeholder={placeholder}
				defaultValue={defaultValue}
				type={type}
				accept={accept}
				onBlur={onBlur}
				{...getInputProps({ id: name })}
			/>
			{error && <span className={errorClass}>* {error}</span>}
		</>
	)
}

type TAreaInput = {
	name: string
	label: string
	labelClass?: string
	errorClass?: string
	type?: string
	accept?: string
	placeholder?: string
	ref?: React.Ref<HTMLInputElement>
	cols: React.Ref<HTMLTextAreaElement>
	rows: React.Ref<HTMLTextAreaElement>
	onBlur?: (e: any) => void
	className?: string
}

export const TextAreaInput = ({
	name,
	type = 'text',
	errorClass = 'text-xs text-red-400 sm:text-sm',
	cols,
	rows,
	onBlur,
	placeholder,
	className,
}: TAreaInput) => {
	let { error, getInputProps } = useField(name)
	return (
		<>
			<textarea
				// @ts-ignore
				cols={cols}
				// @ts-ignore
				rows={rows}
				className={className}
				placeholder={placeholder}
				onBlur={onBlur}
				{...getInputProps({ id: name })}
			/>
			{error && <span className={errorClass}>* {error}</span>}
		</>
	)
}

export type CheckboxProps = {
	label: string
	name: string
	value?: string
	className?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, value }) => {
	const { getInputProps } = useField(name)
	return (
		<div className="relative flex items-start py-3 pr-5">
			<div className="min-w-0 flex-1 text-sm">
				<label className="flex justify-between">
					{label}
					<input {...getInputProps({ type: 'checkbox', value })} />
				</label>
			</div>
		</div>
	)
}

export const CustomCheckbox: React.FC<CheckboxProps> = ({
	label,
	name,
	value,
}) => {
	const { getInputProps } = useField(name)
	return (
		<label>
			{label}
			<input
				type="hidden"
				{...getInputProps({ type: 'checkbox', value })}
				checked
			/>
		</label>
	)
}

export const CustomCheckboxGroup: React.FC<CheckboxGroupProps> = ({
	label,
	children,
}) => {
	return (
		<fieldset className="hidden">
			<legend>{label}</legend>
			{children}
		</fieldset>
	)
}

export type CheckboxGroupProps = {
	label: string
	name: string
	children: React.ReactNode
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
	label,
	name,
	children,
}) => {
	const { error } = useField(name)
	return (
		<fieldset className="relative h-32 w-40 overflow-y-scroll">
			{error && <p className="py-1 text-xs text-red-400">* {error}</p>}
			<legend className="border-b pb-2 text-sm">{label}</legend>
			<div className="grid divide-y divide-gray-200 border-t border-b border-gray-200 first-of-type:border-none">
				{children}
			</div>
		</fieldset>
	)
}
