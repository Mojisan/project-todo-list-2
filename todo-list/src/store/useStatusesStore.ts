import { create } from "zustand"
import { STATUSES_KEY } from "../constant"

type StatusesState = {
  statusRecords: string[]
}

type StatusesAction = {
  addStatus: (status: string) => void
  loadStatuses: () => void
}

const initialState: StatusesState = {
  statusRecords: [],
}

export const useStatusesStore = create<StatusesState & StatusesAction>(
  (set, get) => ({
    ...initialState,

    addStatus: (status: string) => {
      try {
        get().loadStatuses()

        const statuses: string[] = get().statusRecords
        const updateStatuses: string[] = [...statuses, status]

        localStorage.setItem(STATUSES_KEY, JSON.stringify(updateStatuses))

        get().loadStatuses()
      } catch (error) {
        throw Error("Failed to add status")
      }
    },

    loadStatuses: () => {
      try {
        const statusesString = localStorage.getItem(STATUSES_KEY)
        const transformedStatuses: string[] = statusesString
          ? JSON.parse(statusesString)
          : []

        set({ statusRecords: transformedStatuses })
      } catch (error) {
        throw Error("Failed to fetch statuses")
      }
    },
  }),
)
