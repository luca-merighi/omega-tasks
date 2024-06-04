'use client'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTasks } from '@/contexts/tasks'

import { LuArrowRight } from 'react-icons/lu'

import Tiptap from '../tiptap'

const formSchema = zod.object({
    title: zod.string().min(1).max(50),
    description: zod.string().trim()
})

type FormInputs = zod.infer<typeof formSchema>

interface NewTaskFormProps {
    onClick: () => void
}

export default function NewTaskForm({ onClick }: NewTaskFormProps) {
    const form = useForm<FormInputs>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            description: ''
        }
    })

    const { control, handleSubmit, watch, register } = form

    const { createNewTask } = useTasks()

    const title = watch('title')
    const isSubmitDisabled = !title

    function handleCreateNewTask(data: FormInputs) {
        console.log(data)
        createNewTask(data)

        onClick()
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateNewTask)}
            className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Título"
                {...register('title')}
                className="
                    px-3 py-2 bg-neutral-800
                    text-base text-neutral-200 placeholder:text-neutral-400
                    border-2 border-neutral-700 rounded-lg
                    transition-colors focus:outline-none focus-visible:border-sky-400" />

            <FormProvider {...form}>
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => {
                        return (
                            <Tiptap
                            description={field.value}
                            onChange={field.onChange} />
                        )}} />
            </FormProvider>

            <button
                type="submit"
                disabled={isSubmitDisabled}
                className="
                    group flex gap-2 items-center justify-center
                    py-3 bg-sky-400
                    text-lg text-stone-200 font-medium
                    border-2 border-sky-400 rounded-lg
                    transition-colors enabled:hover:bg-transparent enabled:hover:text-sky-400
                    disabled:opacity-75 disabled:cursor-not-allowed">
                Cadastrar Tarefa
                <LuArrowRight className="
                    opacity-0 -translate-x-4
                    transition-all text-sky-400
                    group-hover:opacity-100 group-hover:translate-x-0" />
            </button>
        </form>
    )
}