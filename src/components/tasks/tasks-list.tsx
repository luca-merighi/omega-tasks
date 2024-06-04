'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Task } from '@/contexts/tasks'

import TaskModal from './task-modal'

interface TasksListProps {
    tasks: Task[]
}

export default function TasksList({ tasks }: TasksListProps) {
    return (
        <ScrollArea.Root className="overflow-hidden">
            <ScrollArea.Viewport className="w-full h-full">
                    <ul className="flex flex-col pr-2">
                        {tasks.map(task => {
                            return (
                                <TaskModal
                                key={task.id}
                                task={task} />
                            )
                        })}
                    </ul>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="
                        flex select-none touch-none p-0.5 bg-transparent
                        data-[orientation=vertical]:w-2.5">
                    <ScrollArea.Thumb
                        className="
                            relative cursor-pointer
                            flex-1 bg-neutral-800
                            rounded-lg
                            transition-colors hover:bg-neutral-700
                            before:content-[''] before:absolute before:top-1/2 before:left-1/2
                            before:-translate-x-1/2 before:-translate-y-1/2
                            before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}