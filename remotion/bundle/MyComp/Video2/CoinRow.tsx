import { coinRowSchema } from '@/libs/types/constants'
import { useEffect, useState } from 'react'
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { z } from 'zod'

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
  color: '#fff',
}

export const CoinRow = ({
  imageUrl,
  name,
  value,
  change,
  direction,
}: z.infer<typeof coinRowSchema>) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const [myValue, setMyValue] = useState(`${change}%`)

  const textInterval = Math.floor(durationInFrames / 3.5)
  const currentTextIndex = Math.floor(frame / textInterval)

  useEffect(() => {
    if ((frame / 120) % 2 === 1 && myValue !== value.toString()) {
      setMyValue(value.toString())
    } else if ((frame / 120) % 2 === 0 && myValue !== `${change}%`) {
      setMyValue(`${change}%`)
    }
  }, [frame, value, change])

  console.log(value, change)

  const opacity = interpolate(
    frame,
    [
      currentTextIndex * textInterval - 10,
      currentTextIndex * textInterval + 20,
      (currentTextIndex + 1) * textInterval - 10,
      (currentTextIndex + 1) * textInterval,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const opacity2 = interpolate(
    frame,
    [
      currentTextIndex * textInterval - 10,
      currentTextIndex * textInterval + 10,
    ],
    [0.6, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const scale1 = interpolate(
    frame,
    [
      currentTextIndex * textInterval - 10,
      currentTextIndex * textInterval + 10,
      (currentTextIndex + 1) * textInterval - 10,
      (currentTextIndex + 1) * textInterval,
    ],
    [0.6, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  const scale2 = interpolate(frame, [0, 10, 15, 20], [0.6, 1, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div style={container}>
      <div style={{ display: 'flex', gap: '150px', alignItems: 'center' }}>
        <Img height={100} width={100} src={staticFile(imageUrl)} />
        <p style={{ fontSize: '100px' }}>{name}</p>
      </div>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span
          style={{
            fontSize: '60px',
            width: '150px',
            opacity,
            transform: `scale(${scale1})`,
          }}
        >
          {myValue}
        </span>
        {direction === 'down' ? (
          <Img
            style={{ opacity: opacity2, transform: `scale(${scale2})` }}
            height={100}
            width={100}
            src={staticFile('triangle-down.svg')}
          />
        ) : (
          <Img
            style={{ opacity: opacity2, transform: `scale(${scale2})` }}
            height={100}
            width={100}
            src={staticFile('triangle-up.svg')}
          />
        )}
      </div>
    </div>
  )
}
