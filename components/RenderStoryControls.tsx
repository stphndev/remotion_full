import { z } from 'zod'
import {
  storyCompSchema,
  coinRowSchema,
  STORY_COMP_NAME,
} from '@/libs/types/constants'
import { useStoryRendering } from '@/libs/helpers/use-story-rendering'
import {
  Box,
  Input,
  Select,
  Stack,
  Typography,
  Option,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/joy'

export const RenderStoryControls: React.FC<{
  coinRows: z.infer<typeof coinRowSchema>[]
  setCoinRows: React.Dispatch<
    React.SetStateAction<z.infer<typeof coinRowSchema>[]>
  >
  inputProps: z.infer<typeof storyCompSchema>
}> = ({ coinRows, setCoinRows, inputProps }) => {
  const { renderMedia, state } = useStoryRendering(STORY_COMP_NAME, inputProps)

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return { ...coinRow, [e.target.name]: e.target.value.toUpperCase() }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number,
    name: string
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex && name === e.target.name) {
            return {
              ...coinRow,
              [`${e.target.name}`]: e.target.value,
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleDoubleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return {
              ...coinRow,
              [`${e.target.name}`]: Number(e.target.value),
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return {
              ...coinRow,
              [`${e.target.name}`]: Number(e.target.value),
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleSelect = (
    e: React.SyntheticEvent | null,
    newValue: string | null,
    textIndex: number
  ) => {
    if (newValue) {
      setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
        const newCoinRows = prevCoinRows.map(
          (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
            if (index === textIndex) {
              return { ...coinRow, ['direction']: newValue }
            }
            return coinRow
          }
        )
        return newCoinRows
      })
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <Stack sx={{ width: '100%' }}>
          {coinRows?.map((coinRow, index) => (
            <Stack key={index}>
              <Accordion>
                <AccordionSummary>{`CoinRow${index + 1}`}</AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  <Stack>
                    <Typography>Name:</Typography>
                    <Input
                      name='name'
                      value={coinRow.name.toUpperCase()}
                      onChange={(e) => handleNameChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                  </Stack>

                  <Stack>
                    <Typography>Change:</Typography>
                    <Input
                      name='change'
                      value={coinRow.change}
                      type='number'
                      onChange={(e) => handleDoubleChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                  </Stack>

                  <Stack>
                    <Typography>Value:</Typography>
                    <Input
                      name='value'
                      value={coinRow.value}
                      type='number'
                      onChange={(e) => handleValueChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                  </Stack>

                  <Stack>
                    <Typography>Image URL:</Typography>
                    <Input
                      name='imageUrl'
                      value={coinRow.imageUrl}
                      onChange={(e) => handleImageChange(e, index, 'imageUrl')}
                      sx={{ mb: 2 }}
                    />
                  </Stack>

                  <Stack>
                    <Typography>Direction:</Typography>
                    <Select
                      name='direction'
                      defaultValue={coinRow.direction}
                      onChange={(e, newValue) =>
                        handleSelect(e, newValue, index)
                      }
                      sx={{ mb: 2 }}
                    >
                      <Option value='up'>up</Option>
                      <Option value='down'>down</Option>
                    </Select>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Stack>
          ))}

          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              mt: 2,
            }}
          >
            <Button
              disabled={state.status === 'invoking'}
              loading={state.status === 'invoking'}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </Stack>
          {state.status === 'error' ? (
            <Typography color='danger'>{state.error.message}</Typography>
          ) : null}
        </Stack>
      ) : null}
      {state.status === 'done' ? (
        <>
          <Typography>{state.message}</Typography>
          <Typography>Access Video in (out) folder</Typography>
        </>
      ) : null}
    </Box>
  )
}
