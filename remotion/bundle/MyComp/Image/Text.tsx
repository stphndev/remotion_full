import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { continueRender, delayRender, staticFile } from 'remotion'

export const myTextSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
})

const waitForFont = delayRender()
const font = new FontFace(
  `Handel Gothic`,
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
        bottom: '10%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <p
        style={{
          color: titleColor,
          fontSize: '80px',
          textAlign: 'center',
          width: '80%',
          fontFamily: font.family,
        }}
      >
        {titleTexts}
      </p>
    </div>
  )
}
