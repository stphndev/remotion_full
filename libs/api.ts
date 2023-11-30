import { z } from 'zod'
import type {
  RenderMediaOnLambdaOutput,
  RenderStillOnLambdaOutput,
} from '@remotion/lambda/client'
import {
  ProgressRequest,
  ProgressResponse,
  RenderImageRequest,
  RenderVideoRequest,
} from './types/schema'
import { imageCompSchema, videoCompSchema } from './types/constants'
import { ApiResponse } from './helpers/api-response'

const makeRequest = async <Res>(
  endpoint: string,
  body: unknown
): Promise<Res> => {
  const result = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
  const json = (await result.json()) as ApiResponse<Res>
  if (json.type === 'error') {
    throw new Error(json.message)
  }

  return json.data
}

export const renderNewVideo = async ({
  id,
  inputProps,
}: {
  id: string
  inputProps: z.infer<typeof videoCompSchema>
}) => {
  const body: z.infer<typeof RenderVideoRequest> = {
    id,
    inputProps,
  }

  return makeRequest<RenderMediaOnLambdaOutput>('/api/lambda/video', body)
}

export const renderImage = async ({
  id,
  inputProps,
}: {
  id: string
  inputProps: z.infer<typeof imageCompSchema>
}) => {
  const body: z.infer<typeof RenderImageRequest> = {
    id,
    inputProps,
  }

  return makeRequest<RenderStillOnLambdaOutput>('/api/lambda/image', body)
}

export const getProgress = async ({
  id,
  bucketName,
}: {
  id: string
  bucketName: string
}) => {
  const body: z.infer<typeof ProgressRequest> = {
    id,
    bucketName,
  }

  return makeRequest<ProgressResponse>('/api/lambda/progress', body)
}
