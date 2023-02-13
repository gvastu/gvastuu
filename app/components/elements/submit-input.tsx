import { useFormContext, useIsSubmitting } from 'remix-validated-form'

export let SubmitBtn = ({ children }: { children: React.ReactNode }) => {
	let isSubmitting = useIsSubmitting()
	let { isValid } = useFormContext()
	let disabled = isSubmitting || !isValid

	return (
		<button
			type="submit"
			disabled={disabled}
			className={
				disabled
					? 'bg-slate-500 hover:cursor-not-allowed hover:bg-slate-500'
					: 'btn'
			}
		>
			{isSubmitting ? 'enviando...' : children}
		</button>
	)
}
