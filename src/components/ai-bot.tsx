import React from 'react'
import { Button } from './ui/button'
import { Bot } from 'lucide-react'
import Link from 'next/link'

export default function AiBot() {
	return (
		<div>
			<Button>
				<Link className='flex' href='/ai-bot'>
					<Bot className='sm:mr-1 h-5 w-5' />
					<span className='hidden sm:inline'>AI Bot</span>{' '}
				</Link>
			</Button>
		</div>
	)
}
