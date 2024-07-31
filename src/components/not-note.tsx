import React from 'react'
import Image from 'next/image'

export default function NotNote() {
	return (
		<div className='flex justify-center items-center  flex-col'>
			<Image
				src={'/add_note.png'}
				alt={'add_note'}
				width={300}
				height={300}
			></Image>
			<h1 className='text-4xl font-bold'>Not Note!</h1>
			<p className='text-lg mt-6 text-center'>
				这是一个基于Next的AI笔记应用 <br />
				你可以在这里记录你的想法和灵感。
			</p>
		</div>
	)
}
