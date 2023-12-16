import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { fontFamily } from '@remotion/google-fonts/ChakraPetch'

export const IMAGE_COMP_NAME = 'OnlyImage'
export const VIDEO_COMP_NAME = 'MyComponent'
export const VIDEO2_COMP_NAME = 'MyVideo2'
export const SERVE_URL = 'http//:localhost:3000'

export const videoCompSchema = z.object({
  titleTexts: z.array(
    z.object({
      title: z.string(),
      text: z.array(z.string()),
    })
  ),
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
  font: z.string(),
})

export const defaultVideoCompProps: z.infer<typeof videoCompSchema> = {
  titleTexts: [
    {
      title: 'The first slide news title',
      text: ['first sentence', 'second sentence'],
    },
    {
      title: 'The second slide news title',
      text: ['first sentence', 'second sentence'],
    },
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
  font: fontFamily,
}

export const imageCompSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
  pageHeading: z.string(),
})

export const defaultImageCompProps: z.infer<typeof imageCompSchema> = {
  titleTexts: `Ethereum and cryptocurrency price shakeup predicted amid Merge`,
  titleColor: '#000',
  pageHeading: 'Remotion Image',
}

export const DURATION_IN_FRAMES = 810
export const WIDTH = 1080
export const HEIGHT = 1920
export const VIDEO_FPS = 30
