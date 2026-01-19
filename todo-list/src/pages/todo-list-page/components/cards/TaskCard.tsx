import { Box, Button, Card, Flex, Modal, Title } from "@mantine/core"
import type { ITask } from "../../../../interface"
import { useDisclosure } from "@mantine/hooks"
import EditTaskForm from "../forms/EditTaskForm"
import { useTasksStore } from "../../../../store/useTasksStore"
import TaskDetailModal from "../TaskDetailModal"

interface ITaskCardProps {
  task: ITask
  id: number
}

const TaskCard = ({ task, id }: ITaskCardProps) => {
  const { deleteTask } = useTasksStore()
  const [taskOpened, taskHandlers] = useDisclosure(false)
  const [editOpened, editHandlers] = useDisclosure(false)

  return (
    <>
      <Card shadow='sm' radius='md' withBorder onClick={taskHandlers.open}>
        <Flex justify='space-between'>
          <Box>
            <Title order={4}>{task.title}</Title>
          </Box>
          <Flex direction='row' gap='md'>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                editHandlers.open()
              }}
            >
              Edit
            </Button>

            <Button
              color='red'
              onClick={(e) => {
                e.stopPropagation()
                deleteTask(id)
              }}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Modal
        opened={taskOpened}
        onClose={taskHandlers.close}
        centered
        title={task.title}
      >
        <TaskDetailModal task={task} />
      </Modal>

      <Modal
        opened={editOpened}
        onClose={editHandlers.close}
        centered
        title='Edit Task'
      >
        <EditTaskForm id={id} closed={editHandlers.close} />
      </Modal>
    </>
  )
}

export default TaskCard
