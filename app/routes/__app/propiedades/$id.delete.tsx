import type { ActionFunction } from '@remix-run/node'
import { deleteLocation } from '~/models/location.server'

export let action: ActionFunction = async ({ params }: any) => {
	return await deleteLocation(params.id)
}

export default () => null
