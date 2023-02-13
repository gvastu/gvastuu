interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string
	icon?: React.ReactNode
	navigation?: React.ReactNode
	notifications?: React.ReactNode
	className?: string
	copyright?: string
	children?: React.ReactNode
}

let SectionTitle = ({ title, icon }: LayoutProps) => (
	<div className="mx-8 mt-4 grid w-2/3 -skew-x-12 grid-flow-col place-content-center bg-brand text-white sm:mx-12 sm:max-w-max">
		<h2 className="flex items-center gap-2 py-3 px-2 text-center text-sm sm:px-5 sm:text-lg">
			<span>{icon}</span>
			{title}
		</h2>
	</div>
)

let Copyright = () => (
	<p className="mx-auto w-11/12 text-right text-xxs sm:text-xs">
		Grupo Vastuu © {new Date().getFullYear()}.
	</p>
)

export let Layout: React.FC<LayoutProps> = function Layout({ ...props }) {
	return (
		<div className="layout">
			{props.navigation}
			<div className="grid h-screen gap-y-10 sm:gap-y-14">
				{props.notifications}
				<SectionTitle title={props.title} icon={props.icon} />
				<div className={props.className}>{props.children}</div>
				<Copyright />
			</div>
		</div>
	)
}
