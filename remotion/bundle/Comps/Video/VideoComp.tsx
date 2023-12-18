import {
  useVideoConfig,
  delayRender,
  staticFile,
  continueRender,
} from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { NewsUpdateDisplay } from './NewsUpdateDisplay'
import { LogoSequence } from './LogoSequence'
import { videoCompSchema } from '@/libs/types/constants'

const waitForFont = delayRender()
const font = new FontFace(
  'Handel Gothic',
  `url('${staticFile('Handel Gothic D Regular.ttf')}') format('truetype')`
)

font
  .load()
  .then(() => {
    document.fonts.add(font)
    continueRender(waitForFont)
  })
  .catch((err) => console.log('Error loading font', err))

export const VideoComp: React.FC<z.infer<typeof videoCompSchema>> = ({
  titleTexts,
  titleColor,
  videoUrls,
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
        fontFamily: font.family,
      }}
    >
      <NewsUpdateDisplay videoUrls={videoUrls} />
      <Text titleTexts={titleTexts} titleColor={titleColor} />
      <LogoSequence />
    </div>
  )
}
