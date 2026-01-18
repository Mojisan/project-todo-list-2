import { create } from "zustand"
import type { ITask } from "../interface"
import { TASKS_KEY } from "../constant"

type TasksState = {
  taskRecords: ITask[]
}

type TasksAction = {
  addTask: (task: ITask) => void
  loadTasks: () => void
  editTask: (id: number, task: ITask) => void
  deleteTask: (id: number) => void
}

const initialState: TasksState = {
  taskRecords: [],
}

export const useTasksStore = create<TasksState & TasksAction>((set, get) => ({
  ...initialState,
  addTask: (task: ITask) => {
    try {
      get().loadTasks()

      const currentTasks: ITask[] = get().taskRecords
      const updateTasks: ITask[] = [...currentTasks, task]

      localStorage.setItem(TASKS_KEY, JSON.stringify(updateTasks))

      get().loadTasks()
    } catch (error) {
      throw Error("Failed to add task")
    }
  },
  loadTasks: () => {
    try {
      const tasksString = localStorage.getItem(TASKS_KEY)
      const transformedTasks: ITask[] = tasksString
        ? JSON.parse(tasksString)
        : []

      set({ taskRecords: transformedTasks })
    } catch (error) {
      throw Error("Failed to fetch tasks")
    }
  },
  editTask: (id: number, task: ITask) => {
    try {
      get().loadTasks()

      const tasks: ITask[] = get().taskRecords
      const updateTasks = tasks.map((currentTask, index) =>
        id === index ? task : currentTask,
      )

      localStorage.setItem(TASKS_KEY, JSON.stringify(updateTasks))

      get().loadTasks()
    } catch (error) {
      throw Error("Failed to edit task")
    }
  },
  deleteTask: (id: number) => {
    try {
      get().loadTasks()

      const tasks: ITask[] = get().taskRecords
      const updateTasks = tasks.filter((_, index) => id !== index)

      localStorage.setItem(TASKS_KEY, JSON.stringify(updateTasks))

      get().loadTasks()
    } catch (error) {
      throw Error("Failed to delete task")
    }
  },
}))
