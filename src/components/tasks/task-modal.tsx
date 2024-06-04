'use client'

import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Task, useTasks } from '@/contexts/tasks'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { LuCheck, LuX, LuCalendar, LuTrash } from 'react-icons/lu'

interface TaskModal {
    task: Task
}

export default function TaskModal({ task }: TaskModal) {
    const [isTaskModalOpen, setTaskModalOpen] = useState(false)

    const { deleteTask, changeTaskCheck } = useTasks()

    const createdDateFormatted = format(new Date(Number(task.createdAt)), "d 'de' LLLL 'às' HH:mm", {
        locale: ptBR
    })

    function toggleTaskModal() {
        isTaskModalOpen === false ? setTaskModalOpen(true) : setTaskModalOpen(false)
    }

    function toggleChecked() {
        changeTaskCheck(task.id)
    }

    function handleDeleteTask() {
        deleteTask(task.id)
        toggleTaskModal()
    }

    return (
        <Dialog.Root
            open={isTaskModalOpen}
            onOpenChange={toggleTaskModal}
            data-set={isTaskModalOpen === true ? 'open' : 'closed'}>
            <li className="
                px-3 py-2 flex gap-4 items-center
                border-2 border-transparent rounded-lg
                transition-colors hover:cursor-pointer hover:bg-neutral-900">
                <Checkbox.Root
                    checked={task.checked}
                    onCheckedChange={toggleChecked}
                    className="
                        h-6 w-6 bg-neutral-800
                        flex items-center justify-center
                        rounded-md appearance-none
                        outline-none transition-colors
                        data-[state=checked]:bg-sky-500">
                    <Checkbox.Indicator className="
                        text-neutral-50">
                        <LuCheck />
                    </Checkbox.Indicator>
                </Checkbox.Root>


                <Dialog.Trigger asChild>
                    <div className="flex flex-1">
                        <span className="flex-1 text-xl text-neutral-50 font-medium">
                            {task.title}
                        </span>

                        <div className="flex gap-2 items-center">
                            <time dateTime={createdDateFormatted} className="text-sm text-neutral-400">
                                {createdDateFormatted}
                            </time>
                        </div>
                    </div>
                </Dialog.Trigger>
            </li>
            <Dialog.Portal>
                <Dialog.Overlay className="
                    fixed inset-0 bg-neutral-950/50
                    data-[state=open]:animate-overlayShow
                    data-[state=closed]:animate-overlayHide" />
                <Dialog.Content className="
                    fixed top-[50%] left-[50%]
                    translate-x-[-50%] translate-y-[-50%]
                    bg-neutral-900
                    border-2 border-neutral-700 rounded-lg focus:outline-none
                    data-[state=open]:animate-contentShow
                    data-[state=closed]:animate-contentHide">
                    <ScrollArea.Root className="overflow-hidden">
                        <ScrollArea.Viewport className="w-full h-full">
                            <div className="w-[48rem] h-[35rem] p-12 pr-4 flex flex-col gap-8">
                                <header className="
                                    relative
                                    pb-2 flex flex-col gap-4
                                    border-b border-neutral-700">
                                    <Dialog.Close asChild>
                                        <button
                                            type="button"
                                            title="Fechar Tarefa"
                                            className="
                                                absolute -top-8 -left-8
                                                p-1 bg-transparent
                                                text-lg text-neutral-500
                                                border border-transparent rounded-md
                                                transition-colors hover:text-neutral-400 hover:bg-neutral-700/50
                                                focus:outline-none focus-visible:text-neutral-400
                                                focus-visible:bg-neutral-700/50 focus-visible:border-neutral-500">
                                            <LuX />
                                        </button>
                                    </Dialog.Close>

                                    <strong className="text-2xl text-neutral-50 font-bold">
                                        {task.title}
                                    </strong>

                                    <div className="flex gap-2 items-center text-lg text-neutral-400">
                                        <LuCalendar />

                                        <time dateTime={createdDateFormatted}>
                                            {createdDateFormatted}
                                        </time>
                                    </div>
                                </header>

                                <div
                                    dangerouslySetInnerHTML={{ __html: task.description }}
                                    className="markdown-text pb-12" />

                                <button
                                    type="button"
                                    title="Deletar Tarefa"
                                    onClick={handleDeleteTask}
                                    className="
                                        fixed bottom-4 right-6
                                        flex items-center justify-center
                                        p-1.5 bg-transparent
                                        text-base text-red-500
                                        border border-transparent rounded-lg
                                        transition-colors hover:bg-neutral-700/50
                                        focus:outline-none focus-visible:bg-neutral-700/50
                                        focus-visible:border-neutral-500">
                                    <LuTrash />
                                </button>
                            </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                            orientation="vertical"
                            className="
                                flex select-none touch-none bg-transparent
                                data-[orientation=vertical]:w-2.5">
                            <ScrollArea.Thumb className="
                                relative cursor-pointer
                                flex-1 bg-neutral-800
                                transition-colors hover:bg-neutral-700
                                before:content-[''] before:absolute before:top-1/2 before:left-1/2
                                before:-translate-x-1/2 before:-translate-y-1/2
                                before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}