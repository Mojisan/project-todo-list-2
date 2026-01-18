import { Flex } from "@mantine/core"
import AddTaskForm from "./components/forms/AddTaskForm"
import { useTasksStore } from "../../store/useTasksStore"
import { useEffect } from "react"
import DisplayTasks from "./components/DisplayTasks"

const TodoListPage = () => {
  const { loadTasks } = useTasksStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <Flex
      justify='center'
      align='center'
      h='100vh'
      bg='blue'
      direction='column'
      gap='md'
    >
      <AddTaskForm />

      <DisplayTasks />
    </Flex>
  )
}

export default TodoListPage
