import React, { useState } from 'react'
import { Button } from './ui/button'
import { Copy, Check, Code } from 'lucide-react'

export default function MarkdownCopy({
	language,
	id,
}: {
	language: string
	id: string
}) {
	const [isCopy, setIsCopy] = useState<boolean>(false)
	const copyToClipboard = async () => {
		try {
			setIsCopy(true)
			const text = document.getElementById(id)!.innerText
			await navigator.clipboard.writeText(text)
			setTimeout(() => {
				setIsCopy(false)
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='bg-slate-700 w-full rounded-t-md flex items-center justify-between px-2 text-white'>
			<div className='flex gap-1 '>
				<Code />
				{language}
			</div>

			<Button variant='ghost' size='sm' onClick={copyToClipboard}>
				<div className='mr-1'>
					{isCopy ? <Check size={16}></Check> : <Copy size={16}></Copy>}
				</div>
				复制
			</Button>
		</div>
	)
}
