import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
// 根据提交的ChatId获取对话
export async function POST(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
	}
	try {
		const { chatId } = await req.json()
		if (!chatId) {
			return NextResponse.json({ msg: '缺少参数' }, { status: 400 })
		}
		const chatList = await prisma.message.findMany({
			where: {
				chatId,
			},
		})
		// console.log(chatList)
		return NextResponse.json({ msg: '获取成功！', chatList }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
