import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const myTextSchema = z.object({
  titleTexts: z.array(z.string()),
  titleColor: zColor(),
})

export const Text: React.FC<z.infer<typeof myTextSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  const videoConfig = useVideoConfig()
  const frame = useCurrentFrame()

  const textInterval = videoConfig.durationInFrames / titleTexts.length

  const currentTextIndex = Math.floor(frame / textInterval)

  const translateYX = interpolate(
    frame,
    [
      currentTextIndex * textInterval + 10,
      currentTextIndex * textInterval + 20,
    ],
    [400, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const opacity = interpolate(
    frame,
    [
      currentTextIndex * textInterval + 10,
      currentTextIndex * textInterval + 20,
    ],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const translateXY = interpolate(
    frame,
    [
      (currentTextIndex + 1) * textInterval - 30,
      (currentTextIndex + 1) * textInterval,
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
      currentTextIndex * textInterval - 10,
      currentTextIndex * textInterval + 20,
      (currentTextIndex + 1) * textInterval - 30,
      (currentTextIndex + 1) * textInterval,
    ],
    [-1080, 0, 0, 1080],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const transform =
    frame <= currentTextIndex * textInterval + 30
      ? `translateY(${translateYX}px)`
      : `translateX(${translateXY}px)`

  return (
    <div
      id='myText'
      style={{
        position: 'absolute',
        bottom: '30%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {currentTextIndex % 2 === 0 ? (
        <p
          style={{
            color: titleColor,
            fontSize: '70px',
            textAlign: 'center',
            width: '70%',
            fontFamily: 'Agbalumo',
            transform: transform,
            opacity,
          }}
        >
          {titleTexts[currentTextIndex].toUpperCase()}
        </p>
      ) : (
        <p
          style={{
            color: titleColor,
            fontSize: '70px',
            textAlign: 'center',
            width: '70%',
            fontFamily: 'Agbalumo',
            transform: `translate(${translateX}px)`,
          }}
        >
          {titleTexts[currentTextIndex].toUpperCase()}
        </p>
      )}
    </div>
  )
}
