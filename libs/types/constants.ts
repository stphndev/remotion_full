import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const IMAGE_COMP_NAME = 'OnlyImage'
export const VIDEO_COMP_NAME = 'MyComponent'
export const VIDEO2_COMP_NAME = 'MyVideo2'
export const SERVE_URL = 'http//:localhost:3000'

export const videoCompSchema = z.object({
  titleTexts: z.array(z.string()),
  titleColor: zColor(),
  pageHeading: z.string(),
})

export const coinRowSchema = z.object({
  name: z.string(),
  value: z.number(),
  change: z.number(),
  direction: z.string(),
  imageUrl: z.string(),
})

export const video2CompSchema = z.object({
  coinRows: z.array(coinRowSchema),
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

export const defaultVideo2CompProps: z.infer<typeof video2CompSchema> = {
  coinRows: [
    {
      imageUrl: 'btc.svg',
      name: 'BTC',
      value: 23119,
      change: 0.4,
      direction: 'up',
    },
    {
      imageUrl: 'eth.svg',
      name: 'ETH',
      value: 1601,
      change: 0.1,
      direction: 'up',
    },
    {
      imageUrl: 'ada.svg',
      name: 'ADA',
      value: 0.36,
      change: 1.3,
      direction: 'down',
    },
  ],
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
