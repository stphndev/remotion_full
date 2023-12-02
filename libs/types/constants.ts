import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const IMAGE_COMP_NAME = 'OnlyImage'
export const VIDEO_COMP_NAME = 'MyComponent'
export const SERVE_URL = 'http//:localhost:3000'

export const videoCompSchema = z.object({
  titleTexts: z.array(z.string()),
  titleColor: zColor(),
  pageHeading: z.string(),
})

export const defaultVideoCompProps: z.infer<typeof videoCompSchema> = {
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

export const imageCompSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
  pageHeading: z.string(),
})

export const defaultImageCompProps: z.infer<typeof imageCompSchema> = {
  titleTexts: `Ethereum price shakeup predicted amid Merge confusion Cryptocurrency 
  has doubled in value since mid June ahead of momentous event`,
  titleColor: '#000',
  pageHeading: 'Remotion Image',
}

export const DURATION_IN_FRAMES = 810
export const WIDTH = 1080
export const HEIGHT = 1920
export const VIDEO_FPS = 30
