import { useCurrentFrame, useVideoConfig, staticFile } from 'remotion'
import { Img } from 'remotion'

const logoPaths = ['logo.png', 'logo_grayscale.png']

export const LogoSequence = () => {
  const videoConfig = useVideoConfig()
  const frame = useCurrentFrame()
  const duration = videoConfig.durationInFrames
  const xPos = (frame / duration) * videoConfig.width

  const numDuplicates = Math.floor(videoConfig.width)

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        position: 'absolute',
        bottom: '8%',
        left: xPos,
        transform: 'translateX(-50%)',
      }}
    >
      {[...Array(numDuplicates)].map((_, index) => (
        <Img
          key={index}
          placeholder='Image URL'
          height={32}
          width={200}
          src={staticFile(logoPaths[index % 2])}
        />
      ))}
    </div>
  )
}
