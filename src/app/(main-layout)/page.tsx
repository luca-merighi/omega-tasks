import TasksHeader from '@/components/tasks-header'

import TasksContainer from '@/components/tasks/tasks-container'

export default function Home() {

    return (
        <main className="h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="py-12 w-full h-full max-w-3xl flex flex-col gap-4">
                <TasksHeader />

                <TasksContainer />
            </div>
        </main>
    )
}