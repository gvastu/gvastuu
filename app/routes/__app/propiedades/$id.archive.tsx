import type { ActionFunction } from '@remix-run/node'
import { archiveLocation } from '~/models/location.server'

export let action: ActionFunction = async ({ params }: any) => {
	return await archiveLocation(params.id)
}

export default () => null
