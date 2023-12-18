import { useVideoConfig } from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { NewsUpdateDisplay } from './NewsUpdateDisplay'
import { LogoSequence } from './LogoSequence'
import { videoCompSchema } from '@/libs/types/constants'

export const VideoComp: React.FC<z.infer<typeof videoCompSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  const { width, height } = useVideoConfig()

  return (
    <div
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
      <NewsUpdateDisplay />
      <Text titleTexts={titleTexts} titleColor={titleColor} />
      <LogoSequence />
    </div>
  )
}
