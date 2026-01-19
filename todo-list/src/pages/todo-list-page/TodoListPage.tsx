import { Flex } from "@mantine/core"
import AddTaskForm from "./components/forms/AddTaskForm"
import { useTasksStore } from "../../store/useTasksStore"
import { useEffect } from "react"
import DisplayTasks from "./components/DisplayTasks"
import SearchTaskForm from "./components/forms/SearchTaskForm"
import { useStatusesStore } from "../../store/useStatusesStore"
import AddStatusForm from "./components/forms/AddStatus"
import AddTagForm from "./components/forms/AddTag"
import { useTagsStore } from "../../store/useTagsStore"

const TodoListPage = () => {
  const loadTasks = useTasksStore().loadTasks
  const loadStatuses = useStatusesStore().loadStatuses
  const loadTags = useTagsStore().loadTags

  useEffect(() => {
    loadTasks()
    loadStatuses()
    loadTags()
  }, [loadTasks, loadStatuses, loadTags])

  return (
    <Flex align='center' h='150vh' bg='blue' direction='column' gap='md'>
      <AddStatusForm />

      <AddTagForm />

      <SearchTaskForm />

      <AddTaskForm />

      <DisplayTasks />
    </Flex>
  )
}

export default TodoListPage
