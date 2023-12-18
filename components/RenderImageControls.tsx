import { z } from 'zod'
import { useImageRendering } from '@/libs/helpers/use-image-rendering'
import { imageCompSchema, IMAGE_COMP_NAME } from '@/libs/types/constants'
import { MyColorPicker } from './MyColorPicker'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Input,
  Stack,
  Button,
  Typography,
} from '@mui/joy'

export const RenderImageControls: React.FC<{
  text: string
  color: string
  setText: React.Dispatch<React.SetStateAction<string>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  pageHeading: string
  setPageHeading: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof imageCompSchema>
}> = ({
  text,
  setText,
  color,
  setColor,
  pageHeading,
  setPageHeading,
  inputProps,
}) => {
  const { renderMedia, state } = useImageRendering(IMAGE_COMP_NAME, inputProps)

  return (
    <Box sx={{ width: '100%' }}>
      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <Stack sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary>Heading</AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Input
                value={pageHeading}
                onChange={(e) => setPageHeading(e.target.value)}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Text</AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Input value={text} onChange={(e) => setText(e.target.value)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Color</AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <MyColorPicker
                initialColor={color}
                description='Text Color'
                setMyColor={setColor}
              />
            </AccordionDetails>
          </Accordion>
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
              Render image
            </Button>
          </Stack>
          {state.status === 'error' ? (
            <Typography color='danger'> {state.error.message}</Typography>
          ) : null}
        </Stack>
      ) : null}
      {state.status === 'done' ? (
        <>
          <Typography>{state.message}</Typography>
          <Typography>Access Image in (out) folder</Typography>
        </>
      ) : null}
    </Box>
  )
}
