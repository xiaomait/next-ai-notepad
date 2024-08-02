import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// 获取对话记录
export async function GET() {
	try {
		const { userId } = auth()
		if (!userId) {
			return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
		}
		const chatMsg = await prisma.chat.findMany({
			where: {
				userId,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})
		if (!chatMsg)
			return NextResponse.json(
				{ msg: '无对话记录', chatMsg: [] },
				{ status: 200 }
			)
		return NextResponse.json(
			{ msg: '获取对话记录成功', chatMsg },
			{ status: 200 }
		)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}

// 新增对话记录
export async function POST() {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
	}
	try {
		// 创建Chat对话数据
		const chat = await prisma.chat.create({
			data: {
				userId,
			},
		})
		return NextResponse.json({ msg: '新增成功', id: chat.id }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}

// 更新对话记录
export async function PUT(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
	}
	try {
		const body = await req.json()
		const { id, title } = body
		if (!id) return NextResponse.json({ msg: '缺少参数' }, { status: 400 })
		const chat = await prisma.chat.findUnique({ where: { id } })
		if (!chat)
			return NextResponse.json({ msg: '对话记录不存在' }, { status: 400 })
		if (chat.userId !== userId)
			return NextResponse.json({ msg: '权限校验失败！' }, { status: 401 })
		await prisma.chat.update({
			where: {
				id,
			},
			data: {
				title: title.substring(0, 20),
			},
		})
		return NextResponse.json({ msg: '更新成功' }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
// 删除对话记录
export async function DELETE(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
	}
	try {
		const body = await req.json()
		const id = body.id
		if (!id) return NextResponse.json({ msg: '缺少参数' }, { status: 400 })
		const chat = await prisma.chat.findUnique({ where: { id } })
		if (!chat)
			return NextResponse.json({ msg: '对话记录不存在' }, { status: 400 })
		if (chat.userId !== userId)
			return NextResponse.json({ msg: '权限校验失败！' }, { status: 401 })
		await prisma.chat.delete({
			where: {
				id,
			},
		})
		return NextResponse.json({ msg: '删除成功' }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
