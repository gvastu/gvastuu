import * as React from 'react'
import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import clsx from 'clsx'

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'danger'
	size?: 'medium' | 'large'
	children: React.ReactNode | React.ReactNode[]
}

export type AnchorProps = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>

export const AnchorOrLink = React.forwardRef<
	HTMLAnchorElement,
	AnchorProps & {
		reload?: boolean
		to?: LinkProps['to']
		prefetch?: LinkProps['prefetch']
	}
>(function AnchorOrLink(props, ref) {
	const {
		to,
		href,
		download,
		reload = false,
		prefetch,
		children,
		...rest
	} = props
	let toUrl = ''
	let shouldUserRegularAnchor = reload || download

	if (!shouldUserRegularAnchor && typeof href === 'string') {
		shouldUserRegularAnchor = href.includes(':') || href.startsWith('#')
	}

	if (!shouldUserRegularAnchor && typeof to === 'string') {
		toUrl = to
		shouldUserRegularAnchor = to.includes(':')
	}

	if (!shouldUserRegularAnchor && typeof to === 'object') {
		toUrl = `${to.pathname ?? ''}${to.hash ? `#${to.hash}` : ''}${
			to.search ? `?${to.search}` : ''
		}`
		shouldUserRegularAnchor = to.pathname?.includes(':')
	}

	if (shouldUserRegularAnchor) {
		return (
			<a {...rest} download={download} href={href ?? toUrl} ref={ref}>
				{children}
			</a>
		)
	} else {
		return (
			<Link prefetch={prefetch} to={to ?? href ?? ''} {...rest} ref={ref}>
				{children}
			</Link>
		)
	}
})

function getClassName({ className }: { className?: string }) {
	return clsx(
		'group relative inline-flex focus:outline-none opacity-100 disabled:opacity-70 transition',
		className,
	)
}

function ButtonInner({
	children,
	variant,
	size,
}: Pick<ButtonProps, 'children' | 'variant' | 'size'>) {
	return (
		<>
			<div
				className={clsx(
					'focus-ring absolute inset-0 transform rounded-full opacity-100 transition disabled:opacity-50',
					{
						'border-secondary bg-primary border-2 group-hover:border-transparent group-focus:border-transparent':
							variant === 'secondary' || variant === 'danger',
						danger: variant === 'danger',
						'bg-inverse': variant === 'primary',
					},
				)}
			/>

			<div
				className={clsx(
					'relative flex h-full w-full items-center justify-center whitespace-nowrap',
					{
						'text-primary': variant === 'secondary',
						'text-inverse': variant === 'primary',
						'text-red-500': variant === 'danger',
						'space-x-5 px-11 py-6': size !== 'medium',
						'space-x-2 px-5 py-1': size === 'medium',
					},
				)}
			>
				{children}
			</div>
		</>
	)
}

function Button({
	children,
	variant = 'primary',
	size = 'medium',
	className,
	...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
	return (
		<button {...buttonProps} className={getClassName({ className })}>
			<ButtonInner variant={variant} size={size}>
				{children}
			</ButtonInner>
		</button>
	)
}

function LinkButton({
	className,
	underlined,
	...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
	return (
		<button
			{...buttonProps}
			className={clsx(
				className,
				underlined
					? 'underlined whitespace-nowrap focus:outline-none'
					: 'underline',
				'text-primary inline-block',
			)}
		/>
	)
}

const ButtonLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink(
	{ children, variant = 'primary', className, ...rest },
	ref,
) {
	return (
		<AnchorOrLink ref={ref} className={getClassName({ className })} {...rest}>
			<ButtonInner variant={variant}>{children}</ButtonInner>
		</AnchorOrLink>
	)
})

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef<
	HTMLInputElement,
	React.ComponentPropsWithRef<'input'>
>(({ className, children, ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={`${
				'inline-block rounded border border-gray-300 bg-white py-1 px-2 text-brand ' +
				' '
			}${className}`}
			type={props.type}
			{...props}
		/>
	)
})

export { Button, LinkButton, ButtonLink, TextInput }
