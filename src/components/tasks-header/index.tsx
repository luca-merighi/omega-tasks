import NewTaskModal from './new-task-modal'
import TasksFilters from './tasks-filters'

export default function TasksHeader() {
    return (
        <header className="
            flex items-center justify-between
            w-full h-fit pb-3
            border-b border-neutral-800">
            <NewTaskModal />

            <TasksFilters />
        </header>
    )
}