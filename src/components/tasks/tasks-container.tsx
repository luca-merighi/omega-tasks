'use client'

import { useTasks } from '@/contexts/tasks'

import TasksList from './tasks-list'
import EmptyTasksList from './empty-tasks-list'

export default function TasksContainer() {
    const { tasks } = useTasks()

    if(tasks.length >= 1) {
        return <TasksList tasks={tasks} />
    } else if(tasks.length === 0) {
        return <EmptyTasksList />
    }
}