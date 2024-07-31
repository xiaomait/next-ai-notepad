import { z } from 'zod'

export const noteSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	content: z.string().min(1, { message: 'content is required' }),
})
export const editNoteSchema = z.object({
	id: z.number(),
	title: z.string().min(1, { message: 'Title is required' }),
	content: z.string().min(1, { message: 'content is required' }),
})
export type AddNoteSchema = z.infer<typeof noteSchema>
export type EditNoteSchema = z.infer<typeof editNoteSchema>
