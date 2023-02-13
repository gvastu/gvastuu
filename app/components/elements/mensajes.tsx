export const Mensaje = () => {
	return (
		<div className="max-w-fit rounded-md bg-slate-50 p-3 text-brand-light sm:max-w-md">
			<div className="max-w-lg">
				<div className="grid gap-x-3 gap-y-2 md:grid-flow-col">
					<div className="flex gap-3">
						<img
							className="avatar"
							src="https://picsum.photos/id/237/200/200"
							alt="persona"
						/>
						<p className="flex flex-col items-baseline">
							<span className="text-links text-sm">michventura</span>
							<span className="text-xs">01/15/2021</span>
						</p>
					</div>
					<p className="text-sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ad
						maxime veniam mollitia ab excepturi animi perspiciatis aut sunt
						architecto.
					</p>
				</div>
			</div>
		</div>
	)
}
