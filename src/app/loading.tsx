import { LoaderCircle } from 'lucide-react'

export default function Loading() {
	return (
		<div className='h-full flex items-center justify-center'>
			<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
			Loading...
		</div>
	)
}
