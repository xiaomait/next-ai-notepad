'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Send,
	MessageCirclePlus,
	MessageCircleDashed,
	Plus,
} from 'lucide-react'
import useSWR from 'swr'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import useSWRMutation from 'swr/mutation'
import { MessageHistoryType } from '@/types/chat'
import ChatMessageHistory from '@/components/chat-message-history'
import ChatMessage from '@/components/chat-message'
import { LoadingChatMsg, LoadingChatMsgList } from '@/components/loading-page'

// 获取对话消息记录列表
const getChatMsgFetch = (url: string) => fetch(url).then((res) => res.json())
const newChatMsgFetch = (url: string) =>
	fetch(url, { method: 'POST' }).then((res) => res.json())

// 获取具体的对话消息
const getChatFetch = (url: string, { arg }: { arg: { chatId: number } }) => {
	return fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) =>
		res.json()
	)
}
export default function AiBotPage() {
	const { data } = useSWR('/api/message', getChatMsgFetch)
	const newChatMsg = useSWRMutation('/api/message', newChatMsgFetch)
	// 获取具体的对话消息
	const getChat = useSWRMutation('/api/chatHistory', getChatFetch)
	const chatMsgList: MessageHistoryType[] = data?.chatMsg || []
	const [activeMsgId, setActiveMsgId] = useState<number | undefined>(undefined)

	async function clickActiveMsg(chatId: number) {
		if (chatId === activeMsgId) return
		setActiveMsgId(chatId)
		await getChat.trigger({ chatId })
		//console.log(getChat)
		setMessages(getChat.data.chatList)
	}
	async function newChatMsgFn() {
		await newChatMsg.trigger()
		setActiveMsgId(newChatMsg.data.id)
		setMessages([])
	}

	const {
		isLoading,
		messages,
		input,
		error,
		handleInputChange,
		handleSubmit,
		reload,
		setMessages,
	} = useChat({
		body: {
			chatId: activeMsgId,
		},
	})
	// 初始化机器人
	const msg = {
		role: 'assistant', //assistant user '你好！有什么我可以帮助你的吗？
		content: '你好！有什么我可以帮助你的吗？',
	}

	const scrollRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
	}, [messages])
	return (
		<div className='flex-1 overflow-hidden'>
			<ResizablePanelGroup direction='horizontal'>
				<ResizablePanel className='max-w-xs' defaultSize={30}>
					<div className='h-full flex flex-col p-2 pb-0'>
						<div className='flex items-center'>
							<Input disabled className='mr-2' placeholder='是的，还没有做' />
							<Button title='新增对话' onClick={newChatMsgFn}>
								<MessageCirclePlus />
							</Button>
						</div>

						{!chatMsgList && (
							<div className='flex flex-col items-center mt-4 text-gray-400'>
								<MessageCircleDashed size={36} /> 暂无对话
							</div>
						)}
						{!chatMsgList.length ? (
							<LoadingChatMsgList />
						) : (
							<div className='overflow-scroll no-scrollbar'>
								{chatMsgList.map((messageHistory: MessageHistoryType) => {
									return (
										<div
											key={messageHistory.id}
											onClick={() => {
												clickActiveMsg(messageHistory.id)
											}}
										>
											<ChatMessageHistory
												key={messageHistory.id}
												messageHistory={messageHistory}
												activeMsgId={activeMsgId}
											/>
										</div>
									)
								})}
							</div>
						)}
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel>
					{!activeMsgId ? (
						<div className='h-full flex flex-col justify-center items-center px-8 py-4'>
							<Image
								src={'/add_chat.png'}
								alt='添加对话'
								width={500}
								height={500}
							/>
							<Button onClick={newChatMsgFn}>
								<Plus /> 新增对话
							</Button>
						</div>
					) : (
						<div className='h-full flex flex-col px-8 py-4'>
							<div className='flex-1 overflow-y-auto no-scrollbar pb-4'>
								{getChat.isMutating ? (
									<LoadingChatMsg />
								) : (
									<div>
										<div ref={scrollRef}>
											{messages.map((m) => (
												<ChatMessage key={m.id} message={m} />
											))}
										</div>

										{/* 错误处理状态 */}
										{error && (
											<div className='my-2 flex flex-col justify-center items-center'>
												<div>发生了一些错误，请重试</div>
												<Button
													size='sm'
													variant='destructive'
													onClick={() => reload()}
												>
													Retry
												</Button>
											</div>
										)}
										{/* 加载中状态 */}
										{isLoading && (
											<div className='my-2 flex flex-col justify-center items-center'>
												<Button size='sm' onClick={() => stop()}>
													Stop...
												</Button>
											</div>
										)}
									</div>
								)}
							</div>

							<form onSubmit={handleSubmit} className='flex items-center'>
								<Input
									value={input}
									placeholder='Say something...'
									disabled={isLoading}
									onChange={handleInputChange}
								/>
								<Button
									disabled={isLoading}
									title='发送'
									type='submit'
									className='ml-2'
								>
									<Send />
								</Button>
							</form>
						</div>
					)}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
