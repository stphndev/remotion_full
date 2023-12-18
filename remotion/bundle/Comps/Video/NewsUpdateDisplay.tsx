import { useVideoConfig, AbsoluteFill } from 'remotion'
import { VideoSequence } from './VideoSequence'
import { AudioPlayer } from './AudioPlayer'
import { z } from 'zod'

export const newsUpdateSchema = z.object({
  videoUrls: z.array(z.string()),
})

export const NewsUpdateDisplay: React.FC<z.infer<typeof newsUpdateSchema>> = ({
  videoUrls,
}) => {
  const { width } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', width, top: 0, left: 0 }}>
      <VideoSequence videoUrls={videoUrls} />
      <AudioPlayer />
    </AbsoluteFill>
  )
}
