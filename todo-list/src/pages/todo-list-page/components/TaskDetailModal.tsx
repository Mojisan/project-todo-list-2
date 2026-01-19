import { Box, Text } from "@mantine/core"
import type { ITask } from "../../../interface"

interface ITaskDetailModalProps {
  task: ITask
}

const TaskDetailModal = ({ task }: ITaskDetailModalProps) => {
  const transformedTags = task.tags.join(",") || ""

  return (
    <Box>
      <Text>Content: {task.content}</Text>

      <Text>Status: {task.status}</Text>

      <Text>Tags: {transformedTags}</Text>
    </Box>
  )
}

export default TaskDetailModal
