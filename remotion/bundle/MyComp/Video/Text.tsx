import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { zColor } from '@remotion/zod-types'

const myTextSchema = z.object({
  titleTexts: z.array(
    z.object({
      title: z.string(),
      text: z.array(z.string()),
    })
  ),
  titleColor: zColor(),
})

export const Text: React.FC<z.infer<typeof myTextSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  const videoConfig = useVideoConfig()
  const frame = useCurrentFrame()
  const [myResult, setMyresult] = useState<React.ReactElement>()

  const textInterval = videoConfig.durationInFrames / titleTexts.length
  const currentTextIndex = Math.floor(frame / textInterval)

  const interval = textInterval / (titleTexts[currentTextIndex].text.length + 1)

  const textIndex =
    Math.floor(frame / interval) %
    (titleTexts[currentTextIndex].text.length + 1)

  const translateYX = interpolate(
    frame,
    [
      Math.floor(frame / interval) * interval,
      Math.floor(frame / interval) * interval + 20,
    ],
    [800, 0],
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

  const opacity = interpolate(
    frame,
    [
      Math.floor(frame / interval) * interval - 5,
      Math.floor(frame / interval) * interval + 10,
    ],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const translateX = interpolate(
    frame,
    [
      Math.floor(frame / interval) * interval - 5,
      Math.floor(frame / interval) * interval + 10,
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
    frame <= Math.floor(frame / interval) * interval + 10
      ? `translateY(${translateYX}px)`
      : `translateX(${translateXY}px)`

  console.log(transform, frame)

  const test = (item: any) => {
    if (textIndex === 0) {
      setMyresult(
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
          {item.title}
        </p>
      )
    } else {
      setMyresult(
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
          {item.text[textIndex - 1]}
        </p>
      )
    }
  }

  useMemo(() => {
    test(titleTexts[currentTextIndex])
  }, [currentTextIndex, textIndex, frame])

  return (
    <div
      id='myText'
      style={{
        position: 'absolute',
        bottom: '30%',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {/* {currentTextIndex % 2 === 0 ? (
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
      )} */}
      {myResult}
    </div>
  )
}
