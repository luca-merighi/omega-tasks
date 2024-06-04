import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { TasksProvider } from '@/contexts/tasks'

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Omega Tasks',
  description: 'Gerencie suas tarefas diáruas com o Omega Tasks',
  authors: [{ name: 'Luca Merighi' }]
}

interface RootLayoutProps {
    children: Readonly<ReactNode>
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <TasksProvider>
            <html lang="en">
                <body className={inter.className}>
                    {children}
                </body>
            </html>
        </TasksProvider>
    )
}