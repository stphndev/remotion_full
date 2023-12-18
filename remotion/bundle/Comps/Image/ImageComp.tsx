import {
  useVideoConfig,
  delayRender,
  staticFile,
  continueRender,
} from 'remotion'
import { z } from 'zod'
import { Text } from './Text'
import { TopImage } from './TopImage'
import { imageCompSchema } from '@/libs/types/constants'
import { Stack } from '@mui/joy'

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

export const ImageComp: React.FC<z.infer<typeof imageCompSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  const { width, height } = useVideoConfig()

  return (
    <Stack
      sx={{
        gap: '40px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        background: 'yellow',
        fontFamily: font.family,
      }}
    >
      <TopImage />
      <Text titleTexts={titleTexts} titleColor={titleColor} />
    </Stack>
  )
}
