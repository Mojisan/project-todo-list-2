import { Box, Text } from "@mantine/core"
import type { ITask } from "../../../interface"

interface ITaskDetailModalProps {
  task: ITask
}

const TaskDetailModal = ({ task }: ITaskDetailModalProps) => {
  return (
    <Box>
      <Text>Content: {task.content}</Text>
      
      <Text>Status: {task.status}</Text>
    </Box>
  )
}

export default TaskDetailModal
