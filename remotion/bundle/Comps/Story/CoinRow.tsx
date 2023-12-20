import { coinRowSchema } from '@/libs/types/constants'
import { useMemo, useState } from 'react'
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
  padding: '0 120px',
  justifyContent: 'space-between',
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
  const [validImage, setValidImage] = useState(imageUrl)
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

  const isValidImageUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }

  const handleValidImage = useMemo(() => {
    if (isValidImageUrl(imageUrl)) {
      setValidImage(imageUrl)
    } else {
      console.log('Invalid Image')
    }
  }, [imageUrl])

  return (
    <div style={container}>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <Img placeholder='Image' height={100} width={100} src={validImage} />
        <p style={{ fontSize: '70px', overflow: 'hidden', width: '300px' }}>
          {name}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '50px',
            opacity,
            transform: `scale(${scale})`,
            width: '250px',
            overflow: 'hidden',
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
