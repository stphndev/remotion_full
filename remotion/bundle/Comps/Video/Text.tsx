import { interpolate, useCurrentFrame } from 'remotion'
import { TransitionSeries } from '@remotion/transitions'
import { z } from 'zod'

const myTextSchema = z.object({
  segments: z.array(
    z.object({
      title: z.string(),
      sentences: z.array(z.string()),
      videoUrl: z.string(),
    })
  ),
})

export const Text: React.FC<z.infer<typeof myTextSchema>> = ({ segments }) => {
  const frame = useCurrentFrame()

  const interval = 90

  const translateYX = interpolate(
    frame,
    [
      Math.floor(frame / interval) * interval,
      Math.floor(frame / interval) * interval + 20,
    ],
    [1920, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const translateXY = interpolate(
    frame,
    [
      (Math.floor(frame / interval) + 1) * interval - 20,
      (Math.floor(frame / interval) + 1) * interval,
    ],
    [0, 1080],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const translateX = interpolate(
    frame,
    [
      Math.floor(frame / interval) * interval,
      Math.floor(frame / interval) * interval + 20,
      (Math.floor(frame / interval) + 1) * interval - 20,
      (Math.floor(frame / interval) + 1) * interval,
    ],
    [-1080, 0, 0, 1080],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const transform =
    frame <= Math.floor(frame / interval) * interval + 20
      ? `translateY(${translateYX}px)`
      : `translateX(${translateXY}px)`

  return (
    <div
      id='myText'
      style={{
        position: 'absolute',
        bottom: '55%',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TransitionSeries>
        {segments.map((segment) => {
          let segmentInterval = interval + segment.sentences.length * interval
          return (
            <TransitionSeries.Sequence durationInFrames={segmentInterval}>
              <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={90}>
                  <p
                    style={{
                      padding: '0 10%',
                      color: '#fff',
                      fontSize: '70px',
                      textAlign: 'center',
                      width: '100%',
                      margin: 0,
                      transform: transform,
                    }}
                  >
                    {segment.title}
                  </p>
                </TransitionSeries.Sequence>
                {segment.sentences.map((sentence) => (
                  <TransitionSeries.Sequence durationInFrames={90}>
                    <p
                      style={{
                        color: '#fff',
                        fontSize: '70px',
                        textAlign: 'center',
                        padding: '0 10%',
                        width: '100%',
                        margin: 0,
                        transform: `translate(${translateX}px)`,
                      }}
                    >
                      {sentence}
                    </p>
                  </TransitionSeries.Sequence>
                ))}
              </TransitionSeries>
            </TransitionSeries.Sequence>
          )
        })}
      </TransitionSeries>
    </div>
  )
}
