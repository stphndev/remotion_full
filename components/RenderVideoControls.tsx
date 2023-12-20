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
  setSegmentIndex: React.Dispatch<React.SetStateAction<number>>
  setSentenceIndex: React.Dispatch<React.SetStateAction<number>>
  setSegmentLength: React.Dispatch<React.SetStateAction<number>>
  inputProps: z.infer<typeof videoCompSchema>
}> = ({
  segments,
  setSegments,
  audioUrl,
  setAudioUrl,
  setSegmentIndex,
  setSentenceIndex,
  setSegmentLength,
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
                sentences: segment.sentences.map((sentence, idx) => {
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

  const handleAddSentence = (index: number) => {
    const sentenceIndex = segments[index].sentences.length
    setSegmentIndex(index)
    setSentenceIndex(sentenceIndex)
    segments[index].sentences.push('')
  }

  const handleAddSegment = () => {
    const newSegment = {
      title: '',
      sentences: [''],
      videoUrl: '',
    }
    segments.push(newSegment)
    setSegmentIndex(segments.length)
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
                      placeholder='Add title'
                      name='title'
                      value={segment.title}
                      onChange={(e) => handleChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                    <Accordion>
                      <AccordionSummary>Sentence(s)</AccordionSummary>
                      <AccordionDetails sx={{ p: 1 }}>
                        {segment.sentences.length > 0 &&
                          segment.sentences.map(
                            (sentence: string, idx: number) => (
                              <Input
                                key={idx}
                                sx={{ mb: 2 }}
                                placeholder='Add sentence'
                                value={sentence}
                                onChange={(e) =>
                                  handleSentenceChange(e, index, idx)
                                }
                              />
                            )
                          )}
                      </AccordionDetails>
                    </Accordion>
                    <Button onClick={() => handleAddSentence(index)}>
                      Add Sentence
                    </Button>
                    <Typography>Video URL</Typography>
                    <Input
                      placeholder='Add video url'
                      name='videoUrl'
                      value={segment.videoUrl}
                      onChange={(e) => handleChange(e, index)}
                      sx={{ mb: 2 }}
                    />
                  </Stack>
                </Stack>
              ))}
              <Button onClick={() => handleAddSegment()}>Create</Button>
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
