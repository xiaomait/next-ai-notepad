'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
	EditNoteSchema,
	AddNoteSchema,
	noteSchema,
} from '@/lib/validation/note'
import { useToast } from './ui/use-toast'
import { NoteType } from '@/types/notes'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

type AddNoteProps = {
	open: boolean
	setOpen: (open: boolean) => void
	noteToEdit?: NoteType
}
const addNoteFetch = async (url: string, { arg }: { arg: AddNoteSchema }) => {
	await fetch(url, { method: 'POST', body: JSON.stringify(arg) })
}
const delNoteFetch = async (
	url: string,
	{ arg }: { arg: { id: number | undefined } }
) => {
	await fetch(url, { method: 'DELETE', body: JSON.stringify(arg) })
}

const updateNoteFetch = async (url: string, { arg }: { arg: EditNoteSchema }) =>
	await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(arg),
	})

export default function AddNote({ open, setOpen, noteToEdit }: AddNoteProps) {
	const { toast } = useToast()
	const form = useForm<AddNoteSchema>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			title: noteToEdit?.title || '',
			content: noteToEdit?.content || '',
		},
	})
	async function onSubmit(input: AddNoteSchema) {
		if (noteToEdit) {
			try {
				await update.trigger({ id: noteToEdit?.id, ...input })
				setOpen(false)
				toast({ description: '更新成功！' })
			} catch (error) {
				console.log(error)
				toast({
					variant: 'destructive',
					description: '更新失败！',
				})
			}
			/*  传统写法 狗都不用
			try {
				const res = await fetch('/api/notes', {
					method: 'PUT',
					body: JSON.stringify({
						id: noteToEdit?.id,
						...input,
					}),
				})
				if (res.ok) {
					setOpen(false)
					toast({ description: '更新成功！' })
				}
			} catch (err) {
				console.error(err)
				toast({
					variant: 'destructive',
					description: '更新失败！',
				})
			}*/
		} else {
			try {
				await add.trigger({ ...input })
				form.reset()
				setOpen(false)
				toast({ description: '添加成功！' })
			} catch (error) {
				console.log(error)
				toast({
					variant: 'destructive',
					description: '添加失败！',
				})
			}
			/* 对你没看错，狗🐶都不用
			try {
				const res = await fetch('/api/notes', {
					method: 'POST',
					body: JSON.stringify(input),
				})
				form.reset()
				if (res.ok) {
					setOpen(false)
					toast({ description: '添加成功！' })
				}
			} catch (err) {
				console.error(err)
				toast({
					variant: 'destructive',
					description: '添加失败！',
				})
			}*/
		}
	}
	const add = useSWRMutation('/api/notes', addNoteFetch)
	const update = useSWRMutation('/api/notes', updateNoteFetch)
	const del = useSWRMutation('/api/notes', delNoteFetch)

	async function delNote() {
		try {
			await del.trigger({ id: noteToEdit?.id })
			setOpen(false)
			toast({ description: '删除成功！' })
		} catch (error) {
			console.log(error)
			toast({
				variant: 'destructive',
				description: '删除失败！',
			})
		}

		/*  
		try {
			const res = await fetch('/api/notes', {
				method: 'DELETE',
				body: JSON.stringify({
					id: noteToEdit?.id,
				}),
			})

			if (res.ok) {
				setOpen(false)
				toast({ description: '删除成功！' })
				mutate('/api/notes')
			}
		} catch (err) {
			console.log(err)
			toast({
				variant: 'destructive',
				description: '删除失败！',
			})
		}*/
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* <DialogTrigger asChild>
				<Button>
					<Plus className='sm:mr-1 h-5 w-5' />
					<span className='hidden sm:inline'>Add Note</span>
				</Button>
			</DialogTrigger> */}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{noteToEdit ? 'Edit Note' : 'Add Note'} </DialogTitle>
					<DialogDescription>
						{noteToEdit ? '编辑你的计划任务表' : '添加你的计划任务表'}
					</DialogDescription>
				</DialogHeader>
				{/* 表单 */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>计划名称：</FormLabel>
									<FormControl>
										<Input placeholder='输入标题' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel>计划内容：</FormLabel>
									<FormControl>
										<Textarea rows={6} placeholder='输入内容' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className='mt-4'>
							{noteToEdit && (
								<Button
									type='button'
									onClick={delNote}
									variant='destructive'
									className='mt-1 sm:mt-0'
								>
									Delete
								</Button>
							)}

							<Button type='submit'>{noteToEdit ? 'Update' : 'Confirm'}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
