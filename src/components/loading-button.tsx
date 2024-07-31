import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

export function LoadingButton() {
	return (
		<Button disabled>
			<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
			Please wait
		</Button>
	)
}
