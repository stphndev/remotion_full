import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { continueRender, delayRender, staticFile } from 'remotion'

export const myTextSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
})

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

export const Text: React.FC<z.infer<typeof myTextSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '42%',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '85%',
        paddingLeft: '10%',
      }}
    >
      <p
        style={{
          color: titleColor,
          fontSize: '100px',
          fontFamily: font.family,
        }}
      >
        {titleTexts}
      </p>
    </div>
  )
}
