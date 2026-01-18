import { Box, Button, Card, Flex, Modal, Text, Title } from "@mantine/core"
import type { ITask } from "../../../../interface"
import { useDisclosure } from "@mantine/hooks"
import EditTaskForm from "../forms/EditTaskForm"

interface ITaskCardProps {
  task: ITask
  id: number
}

const TaskCard = ({ task, id }: ITaskCardProps) => {
  const [taskOpened, taskHandlers] = useDisclosure(false)
  const [editOpened, editHandlers] = useDisclosure(false)

  return (
    <>
      <Card shadow='sm' radius='md' withBorder onClick={taskHandlers.open}>
        <Flex justify='space-between'>
          <Box>
            <Title order={4}>{task.title}</Title>
          </Box>
          <Box>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                editHandlers.open()
              }}
            >
              Edit
            </Button>
          </Box>
        </Flex>
      </Card>

      <Modal
        opened={taskOpened}
        onClose={taskHandlers.close}
        centered
        title={task.title}
      >
        <Text>Content: {task.content}</Text>
      </Modal>

      <Modal
        opened={editOpened}
        onClose={editHandlers.close}
        centered
        title='Edit Task'
      >
        <EditTaskForm id={id} closed={editHandlers.close}/>
      </Modal>
    </>
  )
}

export default TaskCard
