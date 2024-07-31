import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// 格式化时间
export function formatTime(time: any) {
	return new Date(time).toLocaleString('zh-cn')
}
