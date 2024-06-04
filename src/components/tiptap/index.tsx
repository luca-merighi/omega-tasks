'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useFormContext } from 'react-hook-form'

import Toolbar from './toolbar'

interface TiptapProps {
    description: string,
    onChange: (richText: string) => void
}

export default function Tiptap({ description, onChange }: TiptapProps) {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: description,
        editorProps: {
            attributes: {
                class:
                    "w-[30rem] h-80 px-3 py-2 markdown-text focus:outline-none"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })
    const { register } = useFormContext()

    return (
        <div className="flex flex-col gap-2">
            <Toolbar editor={editor} />

            <ScrollArea.Root className="overflow-hidden">
                <ScrollArea.Viewport className="
                    w-full bg-neutral-800
                    border-2 border-neutral-700 rounded-lg
                    transition-colors focus:outline-none focus-within:border-sky-400">
                    <EditorContent
                        editor={editor}
                        {...register('description')} />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="
                        flex select-none touch-none p-0.5 bg-transparent
                        data-[orientation=vertical]:w-2">
                    <ScrollArea.Thumb
                        className="
                            relative cursor-pointer
                            flex-1 bg-neutral-700/50
                            rounded-lg
                            transition-colors hover:bg-neutral-600
                            before:content-[''] before:absolute before:top-1/2 before:left-1/2
                            before:-translate-x-1/2 before:-translate-y-1/2
                            before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}