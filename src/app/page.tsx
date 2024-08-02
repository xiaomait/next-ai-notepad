import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
	const { userId } = auth()
	if (userId) redirect('/notes')
	return (
		<div className='p-8 flex justify-center items-center  flex-col   h-[90vh]'>
			<h1 className='text-4xl font-bold text-center'>
				欢迎来到
				<br />
				AI-NotePad
			</h1>
			<p className='text-lg mt-6 text-center'>
				这是一个基于Next的AI笔记应用 <br />
				你可以在这里记录你的想法和灵感。 <br />
				立即登录体验吧！ 🤖 And 📒
			</p>
			<Button className='mt-6' size={'lg'} asChild>
				<Link href='/sign-in'>立即登录</Link>
			</Button>
		</div>
	)
}
