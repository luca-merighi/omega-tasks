import { ReactNode } from 'react'

import Header from '@/components/header'

interface MainLayoutProps {
    children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-screen bg-neutral-950">
            <Header />
            {children}
        </div>
    )
}