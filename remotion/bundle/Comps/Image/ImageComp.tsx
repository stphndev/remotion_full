import { useVideoConfig } from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { TopImage } from './TopImage'
import { imageCompSchema } from '@/libs/types/constants'
import '../index.css'

export const ImageComp: React.FC<z.infer<typeof imageCompSchema>> = ({
  titleTexts,
  titleColor,
  imageUrl,
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
        background: 'yellow',
      }}
    >
      <TopImage imageUrl={imageUrl} />
      <Text titleTexts={titleTexts} titleColor={titleColor} />
    </div>
  )
}
