import { continueRender, delayRender, staticFile } from 'remotion'

const waitForFont = delayRender()
const font = new FontFace(
  'Handel-Gothic',
  `url('${staticFile('Handel Gothic D Regular.ttf')}') format('truetype')`
)

font
  .load()
  .then(() => {
    document.fonts.add(font)
    continueRender(waitForFont)
  })
  .catch((err) => console.log('Error loading font', err))

export default font