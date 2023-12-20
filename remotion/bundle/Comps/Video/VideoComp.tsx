import { useVideoConfig } from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { NewsUpdateDisplay } from './NewsUpdateDisplay'
import { LogoSequence } from './LogoSequence'
import { videoCompSchema } from '@/libs/types/constants'
import '../../assets/index.css'

export const VideoComp: React.FC<z.infer<typeof videoCompSchema>> = ({
  segments,
  audioUrl,
}) => {
  const { width, height } = useVideoConfig()

  return (
    <div
      className='main'
      style={{
        gap: '40px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'black',
      }}
    >
      <NewsUpdateDisplay segments={segments} audioUrl={audioUrl} />
      <Text segments={segments} />
      <LogoSequence />
    </div>
  )
}
