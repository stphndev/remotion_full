import { coinRowSchema } from '@/libs/types/constants'
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { z } from 'zod'

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 150px',
  gap: 200,
  width: '100%',
  color: '#fff',
}

const dollarFormat = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  }).format(value)
}

export const CoinRow = ({
  imageUrl,
  name,
  value,
  change,
  direction,
  fontFamily,
}: z.infer<typeof coinRowSchema>) => {
  const frame = useCurrentFrame()
  const { durationInFrames, fps } = useVideoConfig()

  const textInterval = Math.floor(durationInFrames / 3.5)
  const currentTextIndex = Math.floor(frame / textInterval)

  const opacity = interpolate(
    frame,
    [
      currentTextIndex * textInterval - 10,
      currentTextIndex * textInterval + 10,
      (currentTextIndex + 1) * textInterval - 10,
      (currentTextIndex + 1) * textInterval,
    ],
    [0, 1, 1, 0],
    {
      extrapolateRight: 'clamp',
    }
  )

  const scale = interpolate(
    frame,
    [
      currentTextIndex * textInterval,
      currentTextIndex * textInterval + 10,
      (currentTextIndex + 1) * textInterval - 10,
      (currentTextIndex + 1) * textInterval,
    ],
    [0.8, 1, 1, 0]
  )

  const scale2 = spring({
    fps,
    frame: frame,
    from: 0.8,
    to: 1,
    config: {
      damping: 200,
    },
  })

  const opacity2 = interpolate(frame, [-10, 10], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const valueChange =
    currentTextIndex % 2 === 0 ? `${change}%` : `${dollarFormat(value)}`

  return (
    <div style={container}>
      <div style={{ display: 'flex', gap: '100px', alignItems: 'center' }}>
        <Img
          placeholder='Image'
          height={100}
          width={100}
          src={staticFile(imageUrl)}
        />
        <p style={{ fontSize: '70px', fontFamily }}>{name}</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 10,
        }}
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '50px',
            opacity,
            transform: `scale(${scale})`,
            inlineSize: '180px',
            overflowWrap: 'break-word',
            fontFamily,
          }}
        >
          {valueChange}
        </span>
        {direction === 'down' ? (
          <Img
            placeholder='Image'
            style={{ opacity: opacity2, transform: `scale(${scale2})` }}
            height={100}
            width={100}
            src={staticFile('triangle-down.svg')}
          />
        ) : (
          <Img
            placeholder='Image'
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
