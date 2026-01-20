import { create } from "zustand"
import type { IFilterTask, ITask } from "../interface"
import { TASKS_KEY } from "../constant"

type TasksState = {
  taskRecords: ITask[]
  filter: IFilterTask
}

type TasksAction = {
  addTask: (task: ITask) => void
  loadTasks: () => void
  editTask: (id: number, task: ITask) => void
  deleteTask: (id: number) => void
  updateFilter: (filter: IFilterTask) => void
}

const initialState: TasksState = {
  taskRecords: [],
  filter: {
    keyword: "",
    status: "",
    tags: [],
  },
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
    } catch {
      throw Error("Failed to add task")
    }
  },

  loadTasks: () => {
    try {
      const filter = get().filter
      const tasksString = localStorage.getItem(TASKS_KEY)
      const transformedTasks: ITask[] = tasksString
        ? JSON.parse(tasksString)
        : []

      const filterTasks = transformedTasks.filter(
        (task) =>
          ((task.title.toLowerCase().includes(filter.keyword.toLowerCase()) || filter.keyword === "") 
      )).filter(
        (task) => filter.status === "" ? transformedTasks : filter.status === task.status
      )/* .filter(
        (task) => filter.tags.some((tag) => task.tags.includes(tag) || filter.tags.length === 0)
      ) */

      set({ taskRecords: filterTasks })
    } catch {
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
    } catch {
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
    } catch {
      throw Error("Failed to delete task")
    }
  },

  updateFilter: (filter: IFilterTask) => {
    set({ filter })

    get().loadTasks()
  },
}))
