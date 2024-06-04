'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { LuPlus, LuX } from 'react-icons/lu'
import NewTaskForm from './new-task-form'

export default function NewTaskModal() {
    const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false)

    function toggleNewTaskModal() {
        isNewTaskModalOpen === true ? setNewTaskModalOpen(false) : setNewTaskModalOpen(true)
    }

    return (
        <Dialog.Root
            open={isNewTaskModalOpen}
            onOpenChange={toggleNewTaskModal}
            data-set={isNewTaskModalOpen === true ? 'open' : 'closed'}>
            <Dialog.Trigger asChild>
                <button
                    type="button"
                    className="
                        flex gap-1 items-center justify-center
                        px-3 py-2 bg-sky-500 font-medium
                        text-sm text-neutral-50
                        border-2 border-sky-500 rounded-full
                        transition-colors hover:bg-transparent hover:text-sky-500
                        focus:outline-none focus-visible:bg-transparent focus-visible:text-sky-500">
                    <LuPlus />
                    Criar Nova Tarefa
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="
                    fixed inset-0 bg-neutral-950/50
                    data-[state=open]:animate-overlayShow
                    data-[state=closed]:animate-overlayHide" />
                <Dialog.Content className="
                    fixed top-[50%] left-[50%]
                    translate-x-[-50%] translate-y-[-50%]
                    flex flex-col gap-8
                    p-12 bg-neutral-900
                    border-2 border-neutral-700 rounded-lg focus:outline-none
                    data-[state=open]:animate-contentShow
                    data-[state=closed]:animate-contentHide">
                    <Dialog.Close asChild>
                        <button
                            type="button"
                            title="Fechar Formulário"
                            className="
                                absolute top-4 right-4
                                p-1 bg-transparent
                                text-lg text-stone-500
                                border border-transparent rounded-md
                                transition-colors hover:text-stone-400 hover:bg-neutral-700/50
                                focus:outline-none focus-visible:text-stone-400
                                focus-visible:bg-neutral-700/50 focus-visible:border-neutral-500">
                            <LuX />
                        </button>
                    </Dialog.Close>

                    <strong className="text-2xl text-stone-50 font-bold">
                        Crie uma nova Tarefa!
                    </strong>

                    <NewTaskForm onClick={toggleNewTaskModal} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}