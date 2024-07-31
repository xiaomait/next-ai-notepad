import { NextRequest, NextResponse } from 'next/server'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/db'

const openai = createOpenAI({
	baseURL: process.env.OPENAI_BASE_URL,
	apiKey: process.env.OPENAI_API_KEY,
})
export const maxDuration = 30

// 对话生成
export async function POST(req: NextRequest) {
	try {
		const { userId } = auth()
		if (!userId) {
			return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
		}
		// OPENAI 逻辑
		const { messages, chatId } = await req.json()
		// 获取最好一条数据插入数据库
		await prisma.message.create({
			data: {
				chatId,
				...messages[messages.length - 1],
			},
		})

		//generateText函数生成文本。此函数非常适合需要编写文本的非交互式用例
		const result = await streamText({
			model: openai('gpt-3.5-turbo'),
			messages: messages,
			onFinish: async ({ text }) => {
				await prisma.message.create({
					data: {
						chatId,
						role: 'assistant',
						content: text,
					},
				})
			},
		})

		return result.toAIStreamResponse()
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
