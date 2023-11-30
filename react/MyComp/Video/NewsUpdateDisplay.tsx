import { useVideoConfig, AbsoluteFill } from 'remotion'
import { VideoSequence } from './VideoSequence'
import { AudioPlayer } from './AudioPlayer'

export const NewsUpdateDisplay: React.FC = () => {
  const { width } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', width, top: 0, left: 0 }}>
      <VideoSequence />
      <AudioPlayer />
    </AbsoluteFill>
  )
}
