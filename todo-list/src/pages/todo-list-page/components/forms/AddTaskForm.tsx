import {
  Button,
  Grid,
  InputLabel,
  Paper,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import type { ITask } from "../../../../interface"
import { useTasksStore } from "../../../../store/useTasksStore"
import { useEffect } from "react"

const AddTaskForm = () => {
  const { addTask, loadTasks } = useTasksStore()
  const form = useForm<ITask>({
    initialValues: {
      title: "",
      content: "",
    },

    validate: {
      title: (value: string) => (value ? null : "Invalid title"),
    },
  })

  const handleSubmitForm = async (values: ITask) => {
    await addTask(values)

    form.setValues({ title: "", content: "" })
  }

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <Paper shadow='md' p='xl'>
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Title order={3}>Add Task</Title>

        <Grid>
          <Grid.Col span={12}>
            <InputLabel size='sm'>Title:</InputLabel>

            <TextInput {...form.getInputProps("title")} />
          </Grid.Col>

          <Grid.Col span={12}>
            <InputLabel size='sm'>Content:</InputLabel>

            <Textarea {...form.getInputProps("content")} />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button type='submit'>Add</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}

export default AddTaskForm
