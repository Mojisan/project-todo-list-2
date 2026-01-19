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
import type { ITag } from "../../../../interface"
import { useTagsStore } from "../../../../store/useTagsStore"

const AddTagForm = () => {
  const { addTag, tagsRecords } = useTagsStore()
  const form = useForm<ITag>({
    initialValues: {
      tag: "",
    },
    validate: {
      tag: (value: string) => {
        const transformedTags: string[] = tagsRecords.map((tag) =>
          tag.toLowerCase(),
        )

        return transformedTags.includes(value.toLowerCase())
          ? "This tag is already achieved."
          : null
      },
    },
  })

  const handleSubmitForm = async (value: ITag) => {
    await addTag(value.tag)

    form.setValues({ tag: "" })
  }

  return (
    <Paper shadow='md' p='xl'>
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Title order={3}>Add Tag</Title>

        <Grid>
          <Grid.Col span={12}>
            <TextInput {...form.getInputProps("tag")} />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button type='submit'>Add</Button>
          </Grid.Col>
        </Grid>
      </form>

      <Flex direction='row' gap='md'>
        {tagsRecords.map((tag, index) => {
          return <Text key={index}>{tag}</Text>
        })}
      </Flex>
    </Paper>
  )
}

export default AddTagForm
