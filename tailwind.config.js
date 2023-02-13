/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./app/**/*.{ts,tsx}'],
	theme: {
		screens: {
			// xs: '475px',
			...defaultTheme.screens,
		},
		fontWeight: {
			light: '300',
			normal: '400',
			bold: '700',
		},
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
				heading: 'Bold, sans-serif',
				light: 'Light, sans-serif',
			},
			fontSize: {
				xxs: ['0.625rem', { lineHeight: '0.75rem' }],
			},
			colors: {
				slate: {
					750: '#293649',
				},
				brand: {
					DEFAULT: 'var(--clr-default)',
					light: 'var(--clr-light)',
					dark: 'var(--clr-dark)',
				},
				bell: {
					DEFAULT: 'var(--clr-bell)',
					light: 'var(--clr-bell-light)',
					strong: 'var(--clr-bell-strong)',
				},
			},
			backgroundImage: {
				glass:
					'linear-gradient(262.6deg, rgba(48, 49, 58, 0.1) 0%, rgba(48, 49, 58, 0.1) 101.18%, rgba(48, 49, 58, 0.1) 101.18%);',
			},
			gridTemplateColumns: {
				'auto-fill': 'repeat(auto-fill, minmax(300px, 1fr))',
			},
			width: {
				'1/7': '14.2857143%',
				'2/7': '28.5714286%',
				'3/7': '42.8571429%',
				'4/7': '57.1428571%',
				'5/7': '71.4285714%',
				'6/7': '85.7142857%',
			},
		},
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				body: {
					fontFamily: theme('fontFamily.sans'),
				},
				h1: { fontSize: theme('fontSize.2xl') },
				h2: { fontSize: theme('fontSize.xl') },
				h3: { fontSize: theme('fontSize.lg') },
				h4: { fontSize: theme('fontSize.base') },
				button: {
					color: theme('colors.white'),
					background: theme('colors.indigo.700'),
					padding: '0.65rem 1.25rem',
					transition: 'all 200ms ease-in-out',
					'&:hover': {
						backgroundColor: theme('colors.indigo.600'),
					},
				},
			})
		}),
		plugin(({ addComponents, theme }) => {
			addComponents({
				'.btn': {
					color: theme('colors.white'),
					background: theme('colors.indigo.700'),
					padding: '0.65rem 1.25rem',
					boxShadow: '0px 0px 0px 2px rgba(0, 0, 0, 0.1)',
					borderRadius: theme('borderRadius.md'),
					transition: 'all 200ms ease-in-out',
					'&:hover': {
						backgroundColor: theme('colors.indigo.600'),
					},
				},
				'.card': {
					padding: '0.5rem 2rem',
					fontSize: theme('fontSize.sm'),
					borderRadius: theme('borderRadius.lg'),
					boxShadow: theme('boxShadow.md'),
					outline: '1px solid theme(colors.slate.300)',
					transition: 'all 300ms ease-in',
					'&:hover': {
						background: theme('colors.slate.50'),
						boxShadow: theme('boxShadow.none'),
						outline: '1px solid theme(colors.indigo.600)',
						cursor: 'pointer',
					},
					'&:hover > *': {
						color: theme('colors.indigo.600'),
					},
					'&:focus-within': {
						cursor: 'pointer',
					},
					'&:focus': {
						background: theme('colors.slate.50'),
						outline: '1px solid theme(colors.indigo.600)',
					},
					'&:focus > *': {
						color: theme('colors.indigo.600'),
					},
				},
			})
		}),
		require('@tailwindcss/forms'),
	],
}
