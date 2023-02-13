import { saveAs } from 'file-saver'
import { DownloadIcon } from '~/components/icons'

export let FileDownload = ({
	doc,
	filename,
}: {
	doc: string
	filename: string
}) => {
	const saveFile = () => {
		saveAs(`${doc}`, `${filename}`)
	}
	return (
		<button
			className="flex items-center gap-1 bg-transparent p-0 text-indigo-600 hover:bg-transparent hover:text-indigo-500 focus:outline-none"
			onClick={saveFile}
		>
			<span>descargar</span> <DownloadIcon aria-hidden="true" />
		</button>
	)
}
