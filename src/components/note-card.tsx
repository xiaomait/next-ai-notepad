'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { NoteType } from '@/types/notes'
import NoteDialog from './note-dialog'
import { useState } from 'react'
import { formatTime } from '@/lib/utils'

export default function NoteCard({ note }: { note: NoteType }) {
	const [open, setOpen] = useState(false)

	const dateTime = formatTime(note.updatedAt)
	return (
		<>
			<Card
				className='cursor-pointer  hover:shadow-lg translate-shadow'
				onClick={() => setOpen(true)}
			>
				<CardHeader>
					<CardTitle>{note.title}</CardTitle>
					<CardDescription>{dateTime}</CardDescription>
				</CardHeader>
				<CardContent>
					<p className=' whitespace-pre-line text-ellipsis overflow-hidden hover:overflow-y-auto max-h-48'>
						{note.content}
					</p>
				</CardContent>
			</Card>
			<NoteDialog open={open} setOpen={setOpen} noteToEdit={note} />
		</>
	)
}
