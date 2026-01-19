import {
  Grid,
  InputLabel,
  TextInput,
  Textarea,
  Button,
  Select,
  MultiSelect,
} from "@mantine/core"
import { useTasksStore } from "../../../../store/useTasksStore"
import { useForm } from "@mantine/form"
import type { ITask } from "../../../../interface"
import { useStatusesStore } from "../../../../store/useStatusesStore"
import { useTagsStore } from "../../../../store/useTagsStore"

interface IEditTaskFormProps {
  id: number
  closed: () => void
}

const EditTaskForm = ({ id, closed }: IEditTaskFormProps) => {
  const { editTask, taskRecords } = useTasksStore()
  const { statusRecords } = useStatusesStore()
  const { tagsRecords } = useTagsStore()
  const form = useForm<ITask>({
    initialValues: {
      title: taskRecords[id].title,
      content: taskRecords[id].content,
      status: taskRecords[id].status,
      tags: taskRecords[id].tags,
    },

    validate: {
      title: (value: string) => (value ? null : "Invalid title"),
    },
  })

  const handleSubmitForm = async (values: ITask) => {
    await editTask(id, values)

    form.setValues({ title: "", content: "", status: "", tags: [] })

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
          <Button type='submit'>Update</Button>
        </Grid.Col>
      </Grid>
    </form>
  )
}

export default EditTaskForm
