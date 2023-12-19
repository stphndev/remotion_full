import { z } from 'zod'
import { useVideoRendering } from '@/libs/helpers/use-video-rendering'
import { VIDEO_COMP_NAME, videoCompSchema } from '@/libs/types/constants'
import {
  Box,
  Input,
  Stack,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/joy'

export const RenderVideoControls: React.FC<{
  segments: { title: string; sentences: string[]; videoUrl: string }[]
  setSegments: React.Dispatch<
    React.SetStateAction<
      { title: string; sentences: string[]; videoUrl: string }[]
    >
  >
  audioUrl: string
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof videoCompSchema>
}> = ({
  segments,
  setSegments,

  audioUrl,

  setAudioUrl,

  inputProps,
}) => {
  const { renderMedia, state } = useVideoRendering(VIDEO_COMP_NAME, inputProps)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setSegments(
      (
        prevSegments: { title: string; sentences: string[]; videoUrl: string }[]
      ) => {
        const newSegments = prevSegments.map(
          (
            segment: { title: string; sentences: string[]; videoUrl: string },
            index
          ) => {
            if (index === textIndex) {
              return {
                ...segment,
                [e.target.name]: e.target.value,
              }
            }
            return segment
          }
        )
        return newSegments
      }
    )
  }

  const handleSentenceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number,
    textidx: number
  ) => {
    setSegments(
      (
        prevSegments: { title: string; sentences: string[]; videoUrl: string }[]
      ) => {
        const newSegments = prevSegments.map(
          (
            segment: { title: string; sentences: string[]; videoUrl: string },
            index
          ) => {
            if (index === textIndex) {
              return {
                ...segment,
                text: segment.sentences.map((sentence, idx) => {
                  if (idx === textidx) {
                    return e.target.value
                  }
                  return sentence
                }),
              }
            }
            return segment
          }
        )
        return newSegments
      }
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <Stack sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary>Segments</AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              {segments?.map((segment, index) => (
                <Stack key={index}>
                  <Typography>{`Segment ${index + 1}`}</Typography>
                  <Stack>
                    <Typography>Title</Typography>
                    <Input
                      placeholder='title'
                      name='title'
                      value={segment.title}
                      onChange={(e) => handleChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                    <Typography>Sentence(s)</Typography>
                    {segment.sentences.length > 0 &&
                      segment.sentences.map((sentence: string, idx: number) => (
                        <Input
                          key={idx}
                          sx={{ mb: 2 }}
                          placeholder='sentence'
                          value={sentence}
                          onChange={(e) => handleSentenceChange(e, index, idx)}
                        />
                      ))}
                    <Typography>Video URL</Typography>
                    <Input
                      placeholder='video url'
                      name='videoUrl'
                      value={segment.videoUrl}
                      onChange={(e) => handleChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                  </Stack>
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Audio Url</AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Input
                placeholder='audio url'
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                sx={{ mb: 2 }}
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
