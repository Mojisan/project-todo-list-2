import { create } from "zustand"
import { TAGS_KEY } from "../constant"

type TagsState = {
  tagsRecords: string[]
}

type TagsAction = {
  addTag: (tag: string) => void
  loadTags: () => void
}

const initialState: TagsState = {
  tagsRecords: [],
}

export const useTagsStore = create<TagsState & TagsAction>((set, get) => ({
  ...initialState,

  addTag: (tag: string) => {
    try {
      get().loadTags()

      const tags: string[] = get().tagsRecords
      const updateTags: string[] = [...tags, tag]

      localStorage.setItem(TAGS_KEY, JSON.stringify(updateTags))

      get().loadTags()
    } catch {
      throw Error("Failed to add tag")
    }
  },

  loadTags: () => {
    try {
      const tagsString = localStorage.getItem(TAGS_KEY)
      const transformedTags: string[] = tagsString ? JSON.parse(tagsString) : []

      set({ tagsRecords: transformedTags })
    } catch {
      throw Error("Failed to fetch tags")
    }
  },
}))
