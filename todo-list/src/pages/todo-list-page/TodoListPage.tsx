import { Flex } from "@mantine/core"
import AddTaskForm from "./components/forms/AddTaskForm"

const TodoListPage = () => {
  return (
    <Flex justify='center' align='center' h='100vh' bg='blue'>
      <AddTaskForm />
    </Flex>
  )
}

export default TodoListPage
