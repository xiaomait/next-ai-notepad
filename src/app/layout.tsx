import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider, useTheme } from 'next-themes'
import NavBar from '@/components/nav-bar'
import { Toaster } from '@/components/ui/toaster'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Ai-Notepad',
	description: '带有AI功能的笔记应用',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='zh-CN' suppressHydrationWarning>
			<body className={inter.className}>
				<Toaster />
				<ThemeProvider attribute='class'>
					<ClerkProvider
						appearance={{
							variables: { colorPrimary: '#0F172A' },
						}}
					>
						<div className='h-screen flex flex-col'>
							<NavBar />
							{children}
						</div>
					</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
