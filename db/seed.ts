import { PrismaClient } from '@prisma/client'

let db = new PrismaClient()

async function seed() {
	await db.location.createMany({
		data: [
			{
				name: 'Barbados 01',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Barbados 02',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Barbados 03',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Barbados 04',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Barbados 05',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Barbados 06',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Barbados J-4',
			},
			{
				name: 'Candelaria',
				address: 'Prol. Lázaro Cárdenaz #50-B',
			},
			{
				name: 'Ecuador',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Ecuador 206',
			},
			{
				name: 'Guatemala 205',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Guatemala C',
			},
			{
				name: 'Guatemala 603',
				address: 'Unidad Integración Latinoamericana #2014, Ed. Guatemala C',
			},
			{
				name: 'MAQ 06',
				address:
					'MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN',
			},
			{
				name: 'MAQ 07',
				address:
					'MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN',
			},
			{
				name: 'MAQ CAJON 42 Y/O 47',
				address:
					'MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN',
			},
			{
				name: 'MAQ CAJON 43',
				address:
					'MIGUEL ANGEL DE QUEVEDO 765, COLONIA BARRIO DEL NIÑO JESUS, COYOACAN',
			},
			{
				name: 'MEXICO G-201',
				address:
					'UNIDAD INTEGRACION LATINOAMERICANA ED MEXICO ENTRADA G, ROMERO DE TERREROS, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 01',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 02',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 03',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 04',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 05',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 06',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 07',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 08',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 09',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 10',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 11',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 12',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 13',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 14',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 15',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 16',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 17',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'ODONTOLOGIA 18',
				address: 'ODONTOLOGIA 87, COPILCO UNIVERSIDAD, COYOACAN',
			},
			{
				name: 'PACIFICO 301',
				address: 'AV. PACIFICO 219. LAS ROSAS, COYOACAN.',
			},
			{
				name: 'TLALPAN 02',
				address: 'CALZADA DE TLALPAN 1955, PARQUE SAN ANDRES, COYOACAN',
			},
			{
				name: 'TLALPAN 03',
				address: 'CALZADA DE TLALPAN 1955, PARQUE SAN ANDRES, COYOACAN',
			},
			{
				name: 'WISCONSIN TORRE B- 308',
				address:
					'CALLE WISCONSIN 118 TORRE B, DEPTO 308. COL. PALACIO DE LOS DEPORTES, BENITO JUAREZ',
			},
			{
				name: 'ARQUITECTURA 01',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 02',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 03',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 06',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 07',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 08',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 09',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 10',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 11',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 12',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 13',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 14',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 15',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 16',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 17',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 18',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 19',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 20',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 21',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 22',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 23',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 24',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 25',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
			{
				name: 'ARQUITECTURA 26',
				address: 'CALLE ARQUITECTURA 13, COL. COPILCO UNIVERSIDAD, COYOACAN.',
			},
		],
	})

	console.log(`Database has been seeded. 🌱`)
}
seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
