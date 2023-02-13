import { Link } from '@remix-run/react'
import { MoreIcon } from '~/components/icons'

export function Pago({ payments }: { payments: any }) {
	return (
		<>
			{Object.entries(payments).map(([, i]: any) => (
				<tr key={i.id}>
					<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-slate-600 sm:w-auto sm:max-w-none sm:pl-6">
						{i?.booking[0]?.location?.name}
						<dl className="lg:hidden">
							<dt className="sr-only">{i.username}</dt>
							<dd className="mt-1 truncate text-slate-600">
								{i.role !== 'USERARCHIVED' ? (
									i.username
								) : (
									<del className="text-red-600">{i.username}</del>
								)}
							</dd>
							<dt className="sr-only sm:hidden">
								{Number(i?.booking[0]?.location?.payments[0]?.amount)
									.toLocaleString('es-MX', {
										style: 'currency',
										currency: 'MXN',
									})
									.slice(1)}
							</dt>
							<dd className="mt-1 truncate text-slate-600 sm:hidden">
								{Number(i?.booking[0]?.location?.payments[0]?.amount)
									.toLocaleString('es-MX', {
										style: 'currency',
										currency: 'MXN',
									})
									.slice(1)}
							</dd>
						</dl>
					</td>
					<td className="hidden px-3 py-4 text-sm text-slate-600 lg:table-cell">
						{i.role !== 'USERARCHIVED' ? (
							i.username
						) : (
							<p className="text-red-600">
								<del>{i.username}</del>{' '}
								<span className="text-red-900">(archivado)</span>
							</p>
						)}
					</td>
					<td className="hidden px-3 py-4 text-sm text-slate-600 sm:table-cell">
						{Number(i?.booking[0]?.location?.payments[0]?.amount)
							.toLocaleString('es-MX', {
								style: 'currency',
								currency: 'MXN',
							})
							.slice(1)}
					</td>
					<td className="px-3 py-4 text-sm text-slate-600">Pagado</td>
					<td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
						<Link
							reloadDocument
							className="text-indigo-600 hover:text-indigo-900"
							to={`./${i?.payment[0]?.id}`}
						>
							<MoreIcon
								className="translate-y-1 transform"
								aria-hidden="true"
							/>
							<span className="sr-only">{i.username}</span>
						</Link>
					</td>
				</tr>
			))}
		</>
	)
}
