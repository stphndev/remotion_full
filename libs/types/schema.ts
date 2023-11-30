import { z } from 'zod'
import { imageCompSchema, videoCompSchema } from './constants'

export const RenderVideoRequest = z.object({
  id: z.string(),
  inputProps: videoCompSchema,
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
