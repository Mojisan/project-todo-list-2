import {
  Button,
  Grid,
  InputLabel,
  MultiSelect,
  Paper,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import type { ITask } from "../../../../interface"
import { useTasksStore } from "../../../../store/useTasksStore"
import { useStatusesStore } from "../../../../store/useStatusesStore"
import { useTagsStore } from "../../../../store/useTagsStore"

const AddTaskForm = () => {
  const { addTask } = useTasksStore()
  const { statusRecords } = useStatusesStore()
  const { tagsRecords } = useTagsStore()
  const form = useForm<ITask>({
    initialValues: {
      title: "",
      content: "",
      status: "",
      tags: [],
    },

    validate: {
      title: (value: string) => (value ? null : "Invalid title"),
    },
  })

  const handleSubmitForm = async (values: ITask) => {
    await addTask(values)

    form.setValues({ title: "", content: "", status: "", tags: [] })
  }

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
            <InputLabel size='sm'>Status:</InputLabel>

            <Select
              placeholder='Pick status'
              data={statusRecords}
              {...form.getInputProps("status")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <InputLabel size='sm'>Tags:</InputLabel>

            <MultiSelect
              placeholder='Pick tags'
              data={tagsRecords}
              {...form.getInputProps("tags")}
            />
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
