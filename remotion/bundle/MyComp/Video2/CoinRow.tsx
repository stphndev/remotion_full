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
  justifyContent: 'space-between',
  padding: '0 150px',
  gap: 100,
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

  const scale = spring({
    fps,
    frame: frame,
    from: 0.8,
    to: 1,
    config: {
      damping: 200,
    },
  })

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
        <Img height={100} width={100} src={staticFile(imageUrl)} />
        <p style={{ fontSize: '100px' }}>{name}</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <span
          style={{
            fontSize: '60px',
            display: 'flex',
            justifyContent: 'flex-end',
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          {valueChange}
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
