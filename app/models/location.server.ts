import type { Location, User } from '@prisma/client'
import { json, redirect } from '@remix-run/server-runtime'
import { db } from '~/utils/db.server'

// create location
async function createLocation(
	name: Location['name'],
	address: Location['address'],
	userId: User['id'],
) {
	return json(
		await db.location.create({
			data: {
				name,
				address,
			},
		}),
		201,
	)
}

// get location
async function getLocation(id: Location['id']) {
	return json(
		await db.location.findFirst({ where: { id }, include: { payments: true } }),
	)
}

// get locations
async function getLocations() {
	return await db.location.findMany()
}

// get available locations
async function getAvailableOnes() {
	let locations = await db.location.findMany({
		where: {
			isAvailable: true,
		},
	})
	if (!locations.length) return null
	return locations
}

// update location
async function updateLocation(
	name: Location['name'],
	address: Location['address'],
	id: Location['id'],
) {
	return await db.location.update({
		where: { id },
		data: {
			name,
			address,
		},
	})
}

// delete location
async function deleteLocation(id: Location['id']) {
	await db.location.delete({
		where: {
			id: id,
		},
	})
	return redirect(`/propiedades`)
}

// archive location
async function archiveLocation(id: Location['id']) {
	await db.location.update({
		where: { id },
		data: {
			archived: true,
		},
	})
	return redirect(`/propiedades`)
}

export type { Location } from '@prisma/client'

export {
	createLocation,
	getLocation,
	getLocations,
	getAvailableOnes,
	updateLocation,
	deleteLocation,
	archiveLocation,
}
