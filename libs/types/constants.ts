import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { continueRender, delayRender, staticFile } from 'remotion'

export const IMAGE_COMP_NAME = 'OnlyImage'
export const VIDEO_COMP_NAME = 'MyComponent'
export const VIDEO2_COMP_NAME = 'MyVideo2'
export const SERVE_URL = 'http//:localhost:3000'

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
  fontFamily: z.string().optional(),
})

export const video2CompSchema = z.object({
  coinRows: z.array(coinRowSchema),
  font: z.string(),
})

export const defaultVideoCompProps: z.infer<typeof videoCompSchema> = {
  titleTexts: [
    {
      title: 'Memecoins Are Making Solana Users RICH',
      text: ['BONK, Solana\'s memecoin surged 116% after getting listed on Binance',
             'Meanwhile, users rushed to buy a Solana phone, which comes with 30M BONK'],
    },
    {
      title: 'SafeMoon Bankruptcy Takes Ugly Turn',
      text: ['SafeMoon filed for Chapter 7 bankruptcy protection after being charged for fraud',
       'The value of SFM plunged by 42% trading close to zero to the dismay of holders'],
    },
    {
      title: 'This Protocol Pays You to Test Its Network',
      text: ['Privacy-focused LI blockchain Namada pays you to stress test the network consensus', 
             'Presented as a competitive game, the goal is to earn points for using its features',
             'Namada has allocated 3% of its token supply to the testnet participants'],
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
  font: font.family,
}

export const imageCompSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
  pageHeading: z.string(),
})

export const defaultImageCompProps: z.infer<typeof imageCompSchema> = {
  titleTexts: `Coinbase beats all expectations with $674M in revenue for Q3 2023`,
  titleColor: '#000',
  pageHeading: 'Remotion Image',
}

export const DURATION_IN_FRAMES = 810
export const WIDTH = 1080
export const HEIGHT = 1920
export const VIDEO_FPS = 30
