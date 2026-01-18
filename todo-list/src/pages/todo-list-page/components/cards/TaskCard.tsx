import { Card, Modal, Text, Title } from "@mantine/core"
import type { ITask } from "../../../../interface"
import { useDisclosure } from "@mantine/hooks"

interface ITaskCardProps {
  task: ITask
}

const TaskCard = ({ task }: ITaskCardProps) => {
  const [openedTask, closedTask] = useDisclosure(false)

  return (
    <>
      <Card shadow='sm' radius='md' withBorder onClick={closedTask.open}>
        <Title order={4}>{task.title}</Title>
      </Card>

      <Modal opened={openedTask} onClose={closedTask.close} centered title={task.title}>
        <Text>Content: {task.content}</Text>
      </Modal>
    </>
  )
}

export default TaskCard
