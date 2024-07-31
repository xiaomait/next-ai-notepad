import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { LoaderCircle } from 'lucide-react'

export function LoadingChatMsgList() {
	return (
		<div>
			<Skeleton className='mt-2 h-[10px] w-[310px] ' />
			<Skeleton className='mt-2 h-[10px] w-[310px] ' />
			<Skeleton className='mt-2 h-[10px] w-[310px] ' />
			<Skeleton className='mt-2 h-[10px] w-[250px] ' />
			<Skeleton className='mt-2 h-[10px] w-[150px] ' />
		</div>
	)
}

export function LoadingChatMsg() {
	return (
		<div className='h-full flex items-center justify-center'>
			<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
			Loading...
		</div>
	)
}
