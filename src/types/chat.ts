export type MessageHistoryType = {
	id: number
	title: string
	userId?: string
	createdAt: Date | number
	updatedAt: Date | number
}
export type MessageType = {
	role: string
	content: string
	createdAt?: Date
}
