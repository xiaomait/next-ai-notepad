'use client'
import NoteCard from '@/components/note-card'
import useSWR from 'swr'
import { Skeleton } from '@/components/ui/skeleton'
import NotNote from '@/components/not-note'
import { toast } from '@/components/ui/use-toast'

type NoteType = {
	id: number
	title: string
	content: string
	userId: string
	createdAt: string
	updatedAt: string
}
const getNotes = (url: string) => fetch(url).then((res) => res.json())
export default function Home() {
	const { data, error, isLoading } = useSWR('/api/notes', getNotes)
	const notes: NoteType[] = data?.note

	if (error) {
		toast({
			variant: 'destructive',
			description: error,
		})
	}

	return (
		<div className='p-8 '>
			{isLoading ? (
				<div className='flex flex-col space-y-3'>
					<div className='space-y-2'>
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[250px]' />
					</div>
					<Skeleton className='h-[125px] w-[250px] rounded-xl' />
				</div>
			) : (
				<>
					{!notes.length ? (
						<NotNote />
					) : (
						<div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6'>
							{notes.map((note) => (
								<NoteCard key={note.id} note={note} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}
