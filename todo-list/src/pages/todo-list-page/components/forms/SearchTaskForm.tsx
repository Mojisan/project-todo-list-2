import { Autocomplete, Grid, Paper } from "@mantine/core"
import { useTasksStore } from "../../../../store/useTasksStore"

const SearchTaskForm = () => {
  const { taskRecords, updateFilter } = useTasksStore()
  const taskTitles = taskRecords.map((task) => task.title)
  const handleSearchForm = (keyword: string) => {
    updateFilter(keyword)
  }

  return (
    <Paper shadow='md' p='xl'>
      <form>
        <Grid>
          <Grid.Col span={12}>
            <Autocomplete
              w={450}
              placeholder='Search task name'
              limit={4}
              data={taskTitles}
              onChange={(value) => handleSearchForm(value)}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  )
}

export default SearchTaskForm
