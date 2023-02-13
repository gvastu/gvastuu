import { Link } from '@remix-run/react'
import { AvisoIcon, MoreIcon } from '~/components/icons'

export default () => {
	return (
		<div className="layout">
			<div />
			<div className="grid h-screen gap-y-10 sm:gap-y-14">
				<div className="mx-8 mt-4 grid w-2/3 -skew-x-12 grid-flow-col place-content-center bg-brand text-white sm:mx-12 sm:max-w-max">
					<h2 className="flex items-center gap-2 py-3 px-2 text-center text-sm sm:px-5 sm:text-lg">
						<span>
							<AvisoIcon />
						</span>
						Aviso de privacidad
					</h2>
				</div>
				<div className="-ml-4 pr-5 text-lg leading-relaxed sm:m-auto sm:max-w-6xl">
					<h1 className="sr-only">Aviso de privacidad</h1>
					<p className="inline pr-1">
						Le informamos que los datos personales que recabemos con motivo de
						la relación jurídica que tengamos con usted en virtud de los
						servicios prestados, aún los sensibles, se tratan con fines de:
					</p>
					<ol className="inline-flex flex-wrap gap-0.5">
						<li>identificación,</li>
						<li>operación,</li>
						<li>administración,</li>
						<li>análisis,</li>
						<li>ofrecimiento</li>
						<li>y promoción de bienes,</li>
					</ol>
					<p className="inline">
						productos y/o servicios para, en su caso, establecer una relación
						jurídica y cumplir obligaciones derivadas de la misma y otros fines
						compatibles o análogos, pudiéndose transferir a entidades
						relacionadas con{' '}
						<span className="font-bold">GRUPO VASTUU, S.C.</span>
					</p>
					<p className="py-2">
						Asimismo, le informamos que al presentarnos cualquier solicitud para
						establecer cualquier relación jurídica, usted nos deberá informar si
						acepta o no, que sus datos personales sean transferidos.
					</p>
					<p className="py-2">
						Consiento y autorizo que mis datos sean transferidos en los términos
						que señala el presente aviso de privacidad.
					</p>
					<p className="py-2">
						Para limitar el uso y divulgación de sus datos, mantendremos
						políticas y procedimientos de seguridad y confidencialidad.
					</p>
					<p className="py-2">
						El ejercicio de sus derechos de acceso, rectificación, cancelación u
						oposición y la revocación del consentimiento, podrá efectuarse por
						escrito que presente en las oficinas de{' '}
						<span className="font-bold">GRUPO VASTUU, S.C.</span> ubicadas en
						Calzada de Tlalpan 1955, Depto 3, Colonia Parque de San Andrés,
						Alcaldía Coyoacan, C.P. 04040, en la Ciudad de México.
					</p>
					<p className="py-2">
						Le informaremos los cambios realizados al presente aviso, a través
						de comunicados colocados en las oficinas antes citadas o enviados
						por cualquier medio de comunicación que tengamos con usted.
					</p>
					<Link
						className="flex min-w-max items-center gap-1 pt-3 text-indigo-500 hover:text-indigo-600 focus:bg-transparent focus:text-inherit focus:outline-none"
						to=".."
					>
						<MoreIcon className="rotate-180 transform" aria-hidden="true" />
						<span>regresar</span>
					</Link>
				</div>
				<p className="mx-auto w-11/12 text-right text-xxs sm:text-xs">
					Grupo Vastuu © {new Date().getFullYear()}.
				</p>
			</div>
		</div>
	)
}
