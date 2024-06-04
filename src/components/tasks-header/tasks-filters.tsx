'use client'

import { useTasks } from '@/contexts/tasks'

export default function TasksFilters() {
    const { filters, selectedFilter, findFilter } = useTasks()

    function handleOnClick(filter: string) {
        findFilter(filter)
    }

    return (
        <nav className="flex gap-1 items-center">
            {filters.map(filter => {
                return (
                    <button
                        key={filter.id}
                        type="button"
                        onClick={() => handleOnClick(filter.id)}
                        data-set={selectedFilter === filter.id ? 'active' : ''}
                        className="
                            px-2 py-1 bg-transparent
                            text-sm text-neutral-500
                            border border-neutral-500 rounded-full
                            transition-colors hover:text-sky-300 hover:border-sky-300
                            focus:outline-none focus-visible:text-sky-300 focus-visible:border-sky-300
                            data-[set=active]:bg-neutral-800 data-[set=active]:text-sky-400 data-[set=active]:border-sky-400">
                        {filter.title}
                    </button>
                )
            })}
        </nav>
    )
}