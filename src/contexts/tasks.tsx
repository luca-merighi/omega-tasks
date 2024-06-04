'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import api from '@/services/api'

export interface Task {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    checked: boolean
}

interface CreateNewTaskData {
    title: string,
    description: string
}

interface TasksContextProps {
    tasks: Task[],
    filters: {
        id: string,
        title: string
    }[],
    selectedFilter: string,
    createNewTask: (data: CreateNewTaskData) => void,
    changeTaskCheck: (id: string) => void,
    deleteTask: (id: string) => void,
    findFilter: (filter: string) => void
}

interface TasksProviderProps {
    children: ReactNode
}

export const TasksContext = createContext({} as TasksContextProps)

const filters = [
    {
        id: 'pending',
        title: 'Pendente'
    },
    {
        id: 'completed',
        title: 'Concluído'
    }
]

export function TasksProvider({ children }: TasksProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([])

    const [selectedFilter, setSelectedFilter] = useState('')

    async function createNewTask(data: CreateNewTaskData) {
        const createdTime = String(new Date().getTime())

        const newTask: Task = {
            id: createdTime,
            title: data.title,
            description: data.description,
            createdAt: String(new Date().getTime()),
            checked: false
        }

        await api.post('/tasks', newTask)

        setTasks(state => [newTask, ...state])
    }

    async function changeTaskCheck(id: string) {
        const task = tasks.find(task => task.id === id)

        if(task) {
            await api.put('/tasks/' + id, {
                ...task,
                checked: !task.checked
            })

            const tasks = await api.get('/tasks')
            const newTasksList: Task[] = tasks.data
            setTasks(newTasksList)
        }

    }

    async function deleteTask(id: string) {
        await api.delete('/tasks/' + id)

        const listWithoutDeletedTask = tasks.filter(
            task => task.id !== id)

        setTasks(listWithoutDeletedTask)
    }

    async function findFilter(filter: string) {
        if(filter === 'pending') {
            listAllPendingTasks(filter)
        } else if(filter === 'completed') {
            listAllCompletedTasks(filter)
        }
    }

    async function listAllPendingTasks(filter: string) {
        const tasks = await api.get('/tasks')
        const newTasksList: Task[] = tasks.data

        if(selectedFilter === '' || selectedFilter !== filter) {
            setSelectedFilter('pending')

            const pendingTasks = newTasksList.filter(task => task.checked === false)
            setTasks(pendingTasks)
        } else if(selectedFilter === 'pending') {
            setSelectedFilter('')

            setTasks(newTasksList)
        }

    }

    async function listAllCompletedTasks(filter: string) {
        const tasks = await api.get('/tasks')
        const newTasksList: Task[] = tasks.data

        if(selectedFilter === '' || selectedFilter !== filter) {
            setSelectedFilter('completed')

            const completedTasks = newTasksList.filter(task => task.checked === true)
            setTasks(completedTasks)
        } else if(selectedFilter === 'completed') {
            setSelectedFilter('')

            setTasks(newTasksList)
        }
    }

    useEffect(() => {
        async function loadTasks() {
            const tasks = await api.get('/tasks')

            setTasks(tasks.data)
        }

        loadTasks()
    }, [])

    return (
        <TasksContext.Provider value={{
            tasks,
            filters,
            createNewTask,
            changeTaskCheck,
            deleteTask,
            findFilter,
            selectedFilter
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)