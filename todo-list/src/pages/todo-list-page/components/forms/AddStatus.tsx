import {
  Button,
  Flex,
  Grid,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import type { IStatus } from "../../../../interface"
import { useStatusesStore } from "../../../../store/useStatusesStore"

const AddStatusForm = () => {
  const { addStatus, statusRecords } = useStatusesStore()
  const form = useForm<IStatus>({
    initialValues: {
      status: "",
    },
    validate: {
      status: (value: string) => {
        const transformedStatuses: string[] = statusRecords.map((status) =>
          status.toLowerCase(),
        )

        return transformedStatuses.includes(value.toLowerCase())
          ? "This status is already achieved."
          : null
      },
    },
  })

  const handleSubmitForm = async (value: IStatus) => {
    await addStatus(value.status)

    form.setValues({ status: "" })
  }

  return (
    <Paper shadow='md' p='xl'>
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Title order={3}>Add Status</Title>

        <Grid>
          <Grid.Col span={12}>
            <TextInput {...form.getInputProps("status")} />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button type='submit'>Add</Button>
          </Grid.Col>
        </Grid>
      </form>

      <Flex direction='row' gap='md'>
        {statusRecords.map((status, index) => {
          return <Text key={index}>{status}</Text>
        })}
      </Flex>
    </Paper>
  )
}

export default AddStatusForm
