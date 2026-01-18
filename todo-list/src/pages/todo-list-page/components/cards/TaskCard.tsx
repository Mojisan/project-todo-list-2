import { Card, Title } from "@mantine/core"
import type { ITask } from "../../../../interface"

interface ITaskCardProps {
  task: ITask
}

const TaskCard = ({ task }: ITaskCardProps) => {
  return (
    <Card shadow='sm' radius='md' withBorder>
      <Title order={4}>{task.title}</Title>
    </Card>
  )
}

export default TaskCard
