'use client'
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import ModeToggle from './mode-toggle'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import AiBot from './ai-bot'

import { useState } from 'react'
import NoteDialog from './note-dialog'
import { Plus } from 'lucide-react'

export default function NavBar() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<div className='min-w-full px-8 py-3 shadow flex justify-between items-center dark:border-sky-100 dark:border-b'>
				<Link href='/' className='flex items-center flex-1'>
					<Image src='/logo.png' alt='logo' width={40} height={40} />
					<span className='hidden sm:inline-block text-2xl font-bold ml-2'>
						NotePad
					</span>
				</Link>
				<div className='flex space-x-4'>
					<SignedOut>
						<Button>
							<Link href='/sign-in'>Login</Link>
						</Button>
					</SignedOut>
					<SignedIn>
						<AiBot />
						<Button onClick={() => setOpen(true)}>
							<Plus className='sm:mr-1 h-5 w-5' />
							<span className='hidden sm:inline'>Add Note</span>
						</Button>
						<UserButton />
					</SignedIn>
					<ModeToggle />
				</div>
			</div>
			<NoteDialog open={open} setOpen={setOpen} />
		</>
	)
}
