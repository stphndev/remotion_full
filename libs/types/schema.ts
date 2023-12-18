import { z } from 'zod'
import { imageCompSchema, storyCompSchema, videoCompSchema } from './constants'

export const RenderVideoRequest = z.object({
  id: z.string(),
  inputProps: videoCompSchema,
})

export const RenderVideo2Request = z.object({
  id: z.string(),
  inputProps: storyCompSchema,
})

export const RenderImageRequest = z.object({
  id: z.string(),
  inputProps: imageCompSchema,
})

export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
})

export type ProgressResponse =
  | {
      type: 'error'
      message: string
    }
  | {
      type: 'progress'
      progress: number
    }
  | {
      type: 'done'
      url: string
      size: number
    }
