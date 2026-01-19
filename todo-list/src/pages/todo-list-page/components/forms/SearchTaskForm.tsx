import {
  Button,
  Grid,
  MultiSelect,
  Paper,
  Select,
  TextInput,
} from "@mantine/core"
import { useTasksStore } from "../../../../store/useTasksStore"
import type { IFilterTask } from "../../../../interface"
import { useStatusesStore } from "../../../../store/useStatusesStore"
import { useForm } from "@mantine/form"
import { useTagsStore } from "../../../../store/useTagsStore"

const SearchTaskForm = () => {
  const { updateFilter, filter } = useTasksStore()
  const { statusRecords } = useStatusesStore()
  const { tagsRecords } = useTagsStore()
  const form = useForm<IFilterTask>({
    initialValues: {
      keyword: filter.keyword || "",
      status: filter.status || "",
      tags: filter.tags || [],
    },
  })

  const handleSearchForm = (filter: IFilterTask) => {
    updateFilter(filter)
  }

  return (
    <Paper shadow='md' p='xl'>
      <form onSubmit={form.onSubmit(handleSearchForm)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              w={450}
              placeholder='Search task name'
              {...form.getInputProps("keyword")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Select
              placeholder='Pick status'
              data={statusRecords}
              {...form.getInputProps("status")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <MultiSelect
              placeholder='Pick tags'
              data={tagsRecords}
              {...form.getInputProps("tags")}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Button type='submit'>Search</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}

export default SearchTaskForm
