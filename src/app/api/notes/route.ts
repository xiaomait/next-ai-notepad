import prisma from '@/lib/db'
import { editNoteSchema, noteSchema } from '@/lib/validation/note'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// 获取
export async function GET() {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
	}
	try {
		const note = await prisma.note.findMany({
			where: {
				userId,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})
		if (!note) {
			return NextResponse.json({ msg: '暂无计划任务' }, { status: 400 })
		}
		console.log(note)
		return NextResponse.json({ msg: '获取成功', note }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
// 新增
export async function POST(req: NextRequest) {
	try {
		const { userId } = auth()
		if (!userId) {
			return NextResponse.json({ msg: '用户未登录' }, { status: 401 })
		}
		const body = await req.json()
		const parseResult = noteSchema.safeParse(body)
		if (!parseResult.success) {
			console.error(parseResult.error)
			return NextResponse.json({ error: '请求参数有误' }, { status: 400 })
		}
		const { title, content } = parseResult.data
		const note = await prisma.note.create({
			data: {
				title,
				content,
				userId,
			},
		})
		return NextResponse.json({ msg: '添加成功', note }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
// 删除
export async function DELETE(req: NextRequest) {
	try {
		const body = await req.json()
		const id = body.id
		if (!id) return NextResponse.json({ msg: '缺少参数' }, { status: 400 })
		const note = await prisma.note.findUnique({ where: { id } })
		if (!note) return NextResponse.json({ msg: '笔记不存在' }, { status: 400 })
		const { userId } = auth()
		if (note.userId !== userId || !userId)
			return NextResponse.json({ msg: '权限校验失败！' }, { status: 401 })
		await prisma.note.delete({ where: { id } })
		return NextResponse.json({ msg: '删除成功', note }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
// 更新
export async function PUT(req: NextRequest) {
	try {
		const body = await req.json()
		const parseResult = editNoteSchema.safeParse(body)
		if (!parseResult.success) {
			console.error(parseResult.error)
			return NextResponse.json({ error: '请求参数有误' }, { status: 400 })
		}
		const { id, title, content } = parseResult.data
		const note = await prisma.note.findUnique({ where: { id } })
		if (!note) return NextResponse.json({ msg: '笔记不存在' }, { status: 400 })
		const { userId } = auth()
		if (note.userId !== userId || !userId)
			return NextResponse.json({ msg: '权限校验失败！' }, { status: 401 })
		await prisma.note.update({ where: { id }, data: { title, content } })
		return NextResponse.json({ msg: '更新成功', note }, { status: 200 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ msg: '服务器出错啦！' }, { status: 500 })
	}
}
