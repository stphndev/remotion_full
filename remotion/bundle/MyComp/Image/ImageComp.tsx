import { useVideoConfig } from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { TopImage } from './TopImage'
import { imageCompSchema } from '@/libs/types/constants'

export const ImageComp: React.FC<z.infer<typeof imageCompSchema>> = ({
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
        background: 'yellow',
      }}
    >
      <TopImage />
      <Text titleTexts={titleTexts} titleColor={titleColor} />
    </div>
  )
}
