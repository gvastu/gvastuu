import { v2 as cloudinary } from 'cloudinary'
import { writeAsyncIterableToWritable } from '@remix-run/node'
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { env } from '~/utils'

cloudinary.config({
	cloud_name: env('CLOUD_NAME'),
	api_key: env('CLOUD_API_KEY'),
	api_secret: env('CLOUD_API_SECRET'),
})

export interface ICloudinaryUploadResponse {
	asset_id: string
	public_id: string
	version: number
	version_id: string
	signature: string
	width: number
	height: number
	format: string
	resource_type: string
	created_at: string
	tags: []
	pages: number
	bytes: number
	type: string
	etag: string
	placeholder: boolean
	url: string
	secure_url: string
	access_mode: string
	original_filename: string
}

interface IUploadProps {
	data: AsyncIterable<Uint8Array>
}

async function upload({ data }: IUploadProps) {
	const uploadPromise = new Promise<
		UploadApiResponse | UploadApiErrorResponse | undefined
	>(async (resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ folder: 'solicitudes' },
			(error, result) => {
				if (error) {
					console.log(`error: ${JSON.stringify(error, null, 2)}`)
					reject(error)
					return
				}
				resolve(result)
			},
		)
		await writeAsyncIterableToWritable(data, uploadStream)
	})
	return uploadPromise
}

export { upload }
