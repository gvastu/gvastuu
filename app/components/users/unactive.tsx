import { UnactiveLayout } from '~/components/dashboards/layouts'
import { UserIcon } from '~/components/icons'
import { BackButton } from '~/components/shared'
import type { UserProfileProps } from '~/components/users/profile'
import { ContratoFormBox, UserProfile } from '~/components/users/profile'

export function UnactiveUser({ user }: { user: UserProfileProps }) {
	return (
		<UnactiveLayout
			className="mx-auto w-11/12 max-w-5xl"
			title="Mi perfil"
			icon={<UserIcon />}
		>
			<UserProfile user={user} />
			{user.contrato && (
				<>
					<div className="mt-6" />
					<div className="grid gap-y-3">
						<div
							key={user.id}
							className="overflow-hidden rounded-lg bg-white pb-3 shadow"
						>
							<div className="font-medium relative p-4 text-sm text-gray-500 sm:p-6">
								<p>
									Al dar clic en <i className="text-brand">aceptar contrato </i>
									yo, <span className="text-brand">{user.name}</span>, acepto
									los términos y condiciones del contrato.
								</p>
								<ContratoFormBox
									userId={user.id}
									locationId={user.locationId}
								/>
								<p className="absolute right-2 grid place-content-end py-2 text-xs sm:py-3">
									<div>
										<sup>*</sup>
										<i>Al dar clic, deberás reiniciar sesión.</i>
									</div>
								</p>
							</div>
						</div>
					</div>
					<div className="mt-5 text-sm text-brand">
						<BackButton />
					</div>
				</>
			)}
		</UnactiveLayout>
	)
}
