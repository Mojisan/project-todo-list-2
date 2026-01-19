import { Button, Grid, Paper, Select, TextInput } from "@mantine/core"
import { useTasksStore } from "../../../../store/useTasksStore"
import type { IFilterTask } from "../../../../interface"
import { useStatusesStore } from "../../../../store/useStatusesStore"
import { useForm } from "@mantine/form"

const SearchTaskForm = () => {
  const { updateFilter, filter } = useTasksStore()
  const { statusRecords } = useStatusesStore()
  const form = useForm<IFilterTask>({
    initialValues: {
      keyword: filter.keyword,
      status: filter.status,
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

          <Grid.Col span={4}>
            <Button type='submit'>Search</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}

export default SearchTaskForm
