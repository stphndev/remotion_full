import { useVideoConfig, AbsoluteFill } from 'remotion'
import { VideoSequence } from './VideoSequence'
import { AudioPlayer } from './AudioPlayer'
import { z } from 'zod'
import { videoCompSchema } from '@/libs/types/constants'

export const NewsUpdateDisplay: React.FC<z.infer<typeof videoCompSchema>> = ({
  segments,
  audioUrl,
}) => {
  const { width } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', width, top: 0, left: 0 }}>
      <VideoSequence segments={segments} />
      <AudioPlayer audioUrl={audioUrl} />
    </AbsoluteFill>
  )
}
