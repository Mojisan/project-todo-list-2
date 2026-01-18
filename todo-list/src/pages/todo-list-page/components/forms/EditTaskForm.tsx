import { Grid, InputLabel, TextInput, Textarea, Button } from "@mantine/core"
import { useTasksStore } from "../../../../store/useTasksStore"
import { useForm } from "@mantine/form"
import type { ITask } from "../../../../interface"

interface IEditTaskFormProps {
  id: number
  closed: () => void
}

const EditTaskForm = ({ id, closed }: IEditTaskFormProps) => {
  const { editTask, taskRecords } = useTasksStore()
  const form = useForm<ITask>({
    initialValues: {
      title: taskRecords[id].title,
      content: taskRecords[id].content,
    },

    validate: {
      title: (value: string) => (value ? null : "Invalid title"),
    },
  })

  const handleSubmitForm = async (values: ITask) => {
    await editTask(id, values)

    form.setValues({ title: "", content: "" })

    closed()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmitForm)}>
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
          <Button type='submit'>Update</Button>
        </Grid.Col>
      </Grid>
    </form>
  )
}

export default EditTaskForm
