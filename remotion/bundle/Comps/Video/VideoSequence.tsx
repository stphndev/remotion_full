import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'
import { useVideoConfig, Video } from 'remotion'
import { z } from 'zod'

const urlSchema = z.object({
  segments: z.array(
    z.object({
      title: z.string(),
      sentences: z.array(z.string()),
      videoUrl: z.string(),
    })
  ),
})

const interval = 90

export const VideoSequence: React.FC<z.infer<typeof urlSchema>> = ({
  segments,
}) => {
  const { width, height } = useVideoConfig()

  return (
    <div style={{ position: 'relative', bottom: '10%' }}>
      <TransitionSeries>
        {segments.map((segment: any, index: number) => {
          let segmentInterval = interval + segment.sentences.length * interval
          return (
            <TransitionSeries.Sequence
              durationInFrames={segmentInterval}
              key={index}
            >
              <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={segmentInterval}>
                  <Video
                    loop
                    src={segment.videoUrl}
                    style={{ height: height / 2, width: width }}
                  />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                  presentation={slide()}
                  timing={linearTiming({ durationInFrames: 10 })}
                />
              </TransitionSeries>
            </TransitionSeries.Sequence>
          )
        })}
      </TransitionSeries>
    </div>
  )
}
