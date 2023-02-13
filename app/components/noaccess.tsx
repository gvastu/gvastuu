import logo from '~/images/logo.png'
import * as Icons from '~/components/icons'
import { LogoutButton } from '~/services/auth/components'

export function NoAccess() {
	return (
		<div className="grid min-h-screen bg-brand-dark text-slate-300">
			<div className="m-auto w-11/12 sm:w-10/12">
				<div className="mx-auto mt-4 h-auto w-32 sm:mt-8 sm:h-36 sm:w-40">
					<h1>
						<img src={logo} alt="Grupo Vastuu" width={160} height={160} />
					</h1>
				</div>
				<main className="relative grid">
					<div className="h-auto flex-1 rounded-md p-4 text-brand-light sm:pt-8">
						<div className="flex h-full flex-col justify-between gap-3 sm:gap-0">
							<div className="grid leading-6">
								<p className="text-center text-sm leading-relaxed text-white sm:text-base">
									Tu información esta siendo evaluada.
								</p>
								<div className="mx-auto mt-8">
									<LogoutButton />
								</div>
							</div>
							<div className="my-4 py-4 sm:mb-5 sm:pb-0 sm:pt-4">
								<div className="grid gap-4">
									<nav className="text-sm text-white" aria-label="Progress">
										<ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
											<li className="relative hover:cursor-pointer md:flex md:flex-1">
												<span className="flex w-full items-center">
													<span className="flex items-center px-6 py-4">
														<span className="grid h-8 w-8 rounded-full bg-green-400">
															<Icons.CheckIcon
																className="ml-micro mt-1 h-full w-full self-center p-1 text-center text-white"
																aria-hidden="true"
															/>
														</span>
														<span className="ml-4">Llena tu solicitud</span>
													</span>
												</span>
												<div
													className="absolute top-0 right-0 hidden h-full w-5 md:block"
													aria-hidden="true"
												>
													<svg
														className="h-full w-full"
														viewBox="0 0 22 80"
														fill="none"
														preserveAspectRatio="none"
													>
														<path
															d="M0 -2L20 40L0 82"
															vectorEffect="non-scaling-stroke"
															stroke="currentcolor"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											</li>
											<li className="relative hover:cursor-pointer md:flex md:flex-1">
												<span
													className="group flex items-center px-6 py-4"
													aria-current="step"
												>
													<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-200 group-hover:border-blue-100">
														<span className="text-blue-200 group-hover:text-blue-100">
															02
														</span>
													</span>
													<span className="ml-4 text-blue-200 group-hover:text-blue-100">
														Revisamos tu información
													</span>
												</span>

												<div
													className="absolute top-0 right-0 hidden h-full w-5 md:block"
													aria-hidden="true"
												>
													<svg
														className="h-full w-full"
														viewBox="0 0 22 80"
														fill="none"
														preserveAspectRatio="none"
													>
														<path
															d="M0 -2L20 40L0 82"
															vectorEffect="non-scaling-stroke"
															stroke="currentcolor"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											</li>
											<li className="relative hover:cursor-pointer md:flex md:flex-1">
												<span className="group flex items-center">
													<span className="flex items-center px-6 py-4">
														<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light group-hover:border-blue-200">
															<span className="text-brand-light group-hover:text-blue-200">
																03
															</span>
														</span>
														<span className="ml-4 text-brand-light group-hover:text-blue-200">
															Realiza tu pago
														</span>
													</span>
												</span>
												<div
													className="absolute top-0 right-0 hidden h-full w-5 md:block"
													aria-hidden="true"
												>
													<svg
														className="h-full w-full"
														viewBox="0 0 22 80"
														fill="none"
														preserveAspectRatio="none"
													>
														<path
															d="M0 -2L20 40L0 82"
															vectorEffect="non-scaling-stroke"
															stroke="currentcolor"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											</li>
											<li className="relative hover:cursor-pointer md:flex md:flex-1">
												<span className="group flex items-center">
													<span className="flex items-center px-6 py-4">
														<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light group-hover:border-blue-200">
															<span className="text-brand-light group-hover:text-blue-200">
																04
															</span>
														</span>
														<span className="ml-4 text-brand-light group-hover:text-blue-200">
															Firma el contrato
														</span>
													</span>
												</span>
											</li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					<p className="absolute inset-0 top-auto left-auto pr-4 pb-4 text-xs text-brand-light sm:pb-2">
						Grupo Vastuu © {new Date().getFullYear()}.
					</p>
				</main>
			</div>
		</div>
	)
}
