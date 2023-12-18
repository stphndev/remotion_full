import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const IMAGE_COMP_NAME = 'Image'
export const VIDEO_COMP_NAME = 'Video'
export const STORY_COMP_NAME = 'Story'

export const videoCompSchema = z.object({
  titleTexts: z.array(
    z.object({
      title: z.string(),
      text: z.array(z.string()),
    })
  ),
  titleColor: zColor(),
  pageHeading: z.string(),
  videoUrls: z.array(z.string()),
})

export const coinRowSchema = z.object({
  name: z.string(),
  value: z.number(),
  change: z.number(),
  direction: z.string(),
  imageUrl: z.string(),
})

export const storyCompSchema = z.object({
  coinRows: z.array(coinRowSchema),
  pageHeading: z.string(),
})

export const defaultVideoCompProps: z.infer<typeof videoCompSchema> = {
  titleTexts: [
    {
      title: 'Memecoins Are Making Solana Users RICH',
      text: [
        "BONK, Solana's memecoin surged 116% after getting listed on Binance",
        'Meanwhile, users rushed to buy a Solana phone, which comes with 30M BONK',
      ],
    },
    {
      title: 'SafeMoon Bankruptcy Takes Ugly Turn',
      text: [
        'SafeMoon filed for Chapter 7 bankruptcy protection after being charged for fraud',
        'The value of SFM plunged by 42% trading close to zero to the dismay of holders',
      ],
    },
    {
      title: 'This Protocol Pays You to Test Its Network',
      text: [
        'Privacy-focused LI blockchain Namada pays you to stress test the network consensus',
        'Presented as a competitive game, the goal is to earn points for using its features',
        'Namada has allocated 3% of its token supply to the testnet participants',
      ],
    },
  ],
  titleColor: '#ffff',
  pageHeading: 'Remotion Video',
  videoUrls: ['https://static.videezy.com/system/resources/previews/000/044/047/original/NV-06.mp4',
               'https://static.videezy.com/system/resources/previews/000/048/258/original/383A9660-20200401_Stock_market_screen.mp4',
                'https://static.videezy.com/system/resources/previews/000/048/258/original/383A9660-20200401_Stock_market_screen.mp4'],
}

export const defaultStoryCompProps: z.infer<typeof storyCompSchema> = {
  coinRows: [
    {
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',
      name: 'BTC',
      value: 23119,
      change: 0.4,
      direction: 'up',
    },
    {
      imageUrl: 'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png',
      name: 'ETH',
      value: 1601,
      change: 0.1,
      direction: 'up',
    },
    {
      imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      name: 'ADA',
      value: 0.36,
      change: 1.3,
      direction: 'down',
    },
  ],
  pageHeading: 'Remotion Story',
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
