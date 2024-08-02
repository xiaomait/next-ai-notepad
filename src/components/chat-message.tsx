import { useUser } from '@clerk/nextjs'
import { Bot } from 'lucide-react'
import MarkdownRenderer from './mark-down'

import { MessageType } from '@/types/chat'
import { Avatar, AvatarImage } from './ui/avatar'

export default function ChatMessage({
	message: { role, content, createdAt },
}: {
	message: MessageType
}) {
	const { user } = useUser()
	const isAiMessage = role === 'assistant'

	return (
		<div className='mt-2'>
			{isAiMessage ? (
				<div className='flex'>
					<Bot className='shrink-0 mr-2 h-10 w-10' />
					<div className='max-w-2xl  border px-3 py-2 rounded-md'>
						<MarkdownRenderer markdown={content} />
					</div>
				</div>
			) : (
				<div className='flex flex-row-reverse'>
					<Avatar className='shrink-0 ml-2'>
						<AvatarImage src={user?.imageUrl} />
					</Avatar>
					<div className='max-w-2xl  border px-3 py-2 rounded-md bg-primary text-white dark:text-black'>
						<MarkdownRenderer markdown={content} />
					</div>
				</div>
			)}
		</div>
	)
}
