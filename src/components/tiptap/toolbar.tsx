'use client'

import { type Editor } from '@tiptap/react'
import { LuBold, LuStrikethrough, LuItalic, LuList, LuListOrdered, LuHeading2 } from 'react-icons/lu'

type ToolbarProps = {
    editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps) {
    if(!editor) {
        return null
    }

    return (
        <div className="flex gap-1 bg-neutral-800 p-2 border-2 border-neutral-700 rounded-md">
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('heading') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2}).run()}>
                <LuHeading2 />
            </button>
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('bold') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleBold().run()}>
                <LuBold />
            </button>
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('italic') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleItalic().run()}>
                <LuItalic />
            </button>
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('strike') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleStrike().run()}>
                <LuStrikethrough />
            </button>
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('bulletList') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}>
                <LuList />
            </button>
            <button
                type="button"
                className="markdown-buttons"
                data-set={editor.isActive('orderedList') ? 'active' : 'not-active'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <LuListOrdered />
            </button>
        </div>
    )
}