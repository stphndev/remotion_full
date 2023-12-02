import { z } from 'zod'
import {
  ProgressRequest,
  RenderImageRequest,
  RenderVideoRequest,
} from './types/schema'
import { imageCompSchema, videoCompSchema } from './types/constants'

const makeRequest = async (endpoint: string, body: unknown) => {
  const result = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
  const json = await result.json()
  if (json.type === 'error') {
    throw new Error(json.message)
  }
  return json
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

  return makeRequest('/api/video', body)
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

  return makeRequest('/api/image', body)
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

  return makeRequest('/api/lambda/progress', body)
}
