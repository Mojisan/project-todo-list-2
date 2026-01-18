import { Box, Flex } from "@mantine/core"
import TaskCard from "./cards/TaskCard"
import { useTasksStore } from "../../../store/useTasksStore"

const DisplayTasks = () => {
  const { taskRecords } = useTasksStore()

  return (
    <Flex direction='column' gap='md'>
      {taskRecords.map((task, index) => (
        <Box key={index} w={400}>
          <TaskCard task={task} id={index} />
        </Box>
      ))}
    </Flex>
  )
}

export default DisplayTasks
