import { renderMedia, selectComposition, renderStill } from '@remotion/renderer'
// import {
//   defaultImageCompProps,
//   defaultVideoCompProps,
//   IMAGE_COMP_NAME,
//   VIDEO_COMP_NAME,
// } from '../types/constants'
import myBundle from '../bundle.mjs'

const VIDEO_COMP_NAME = 'MyComponent'
const IMAGE_COMP_NAME = 'OnlyImage'
const defaultVideoCompProps = {
  titleTexts: [
    'Balancer Exploit Results in $900K stolen from LPs',
    'The Team warned about the bug 5 days prior',
    'Record 1 million ETH burned since the start of this year',
    'Uniswap fees alone made for 50% of the burn',
    'Grayscale wins against the sec in court',
  ],
  titleColor: '#ffff',
  pageHeading: 'Remotion Video',
}

const defaultImageCompProps = {
  titleTexts: `Ethereum price shakeup predicted amid Merge confusion Cryptocurrency 
  has doubled in value since mid June ahead of momentous event`,
  titleColor: '#000',
  pageHeading: 'Remotion Image',
}

// You only have to create a bundle once, and you may reuse it
const bundleLocation = myBundle

// Get the composition you want to render. Pass `inputProps` if you
// want to customize the duration or other metadata.
const composition1 = await selectComposition({
  serveUrl: bundleLocation,
  id: VIDEO_COMP_NAME,
  inputProps: defaultVideoCompProps,
})

const composition2 = await selectComposition({
  serveUrl: bundleLocation,
  id: IMAGE_COMP_NAME,
  inputProps: defaultImageCompProps,
})

// Render the video. Pass the same `inputProps` again
// if your video is parametrized with data.
await renderMedia({
  composition: composition1,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: `out/${VIDEO_COMP_NAME}.mp4`,
  inputProps: defaultVideoCompProps,
})

await renderStill({
  composition: composition2,
  serveUrl: bundleLocation,
  output: `out/${IMAGE_COMP_NAME}.png`,
  inputProps: defaultImageCompProps,
})

console.log('Render done!')
