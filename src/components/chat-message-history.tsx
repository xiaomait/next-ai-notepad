import { cn, formatTime } from '@/lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Bot, Edit, Menu, MessageCircleX } from 'lucide-react'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Button } from './ui/button'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { MessageHistoryType } from '@/types/chat'

const delChatMsgFetch = async (
	url: string,
	{ arg }: { arg: { id: number | undefined } }
) => {
	await fetch(url, { method: 'DELETE', body: JSON.stringify(arg) })
}
const updateChatMsgFetch = async (
	url: string,
	{ arg }: { arg: { id: number; title: string | number } }
) => {
	await fetch(url, { method: 'PUT', body: JSON.stringify(arg) })
}
export default function ChatMessageHistory({
	messageHistory,
	activeMsgId,
}: {
	messageHistory: MessageHistoryType
	activeMsgId: number | undefined
}) {
	const time = formatTime(messageHistory?.updatedAt)
	const delChatMsg = useSWRMutation('/api/message', delChatMsgFetch)
	const updateChatMsg = useSWRMutation('/api/message', updateChatMsgFetch)

	const [open, setOpen] = useState(false)
	const [chatTitle, setChatTitle] = useState(messageHistory.title)

	return (
		<div
			className={cn(
				'flex items-center border-2  rounded-md p-2 mt-2',
				activeMsgId == messageHistory.id && 'border-primary bg-gray-200'
			)}
		>
			<Bot className='shrink-0 mr-2 h-10 w-10' />
			<div className='flex-1'>
				<div className='text-base'>{messageHistory.title}</div>
				<div className='text-xs text-gray-500'>{time}</div>
			</div>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button size='icon' variant='ghost'>
						<Menu className='h-5 w-5'></Menu>
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className='w-36 flex flex-col'>
					{/* 修改标题 */}
					<Button size='sm' variant='ghost' onClick={() => setOpen(true)}>
						<Edit className='h-4 w-4 mr-1' /> 修改标题
					</Button>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Title</DialogTitle>
							</DialogHeader>
							<Input
								value={chatTitle}
								onChange={(e) => {
									setChatTitle(e.target.value)
									console.log(chatTitle)
								}}
							/>
							<DialogFooter>
								<Button
									onClick={() => {
										if (
											chatTitle.trim() === '' ||
											chatTitle == messageHistory.title
										) {
											return
										}
										updateChatMsg.trigger({
											id: messageHistory.id,
											title: chatTitle,
										})
										setOpen(false)
									}}
								>
									Save changes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					{/* 删除对话 */}
					<Button
						variant='ghost'
						onClick={() => {
							delChatMsg.trigger({ id: messageHistory.id })
						}}
					>
						<MessageCircleX size='sm' className='h-4 w-4 mr-1' />
						删除对话
					</Button>
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
