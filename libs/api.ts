import { z } from 'zod'
import {
  imageCompSchema,
  storyCompSchema,
  videoCompSchema,
} from './types/constants'
import {
  ProgressRequest,
  RenderImageRequest,
  RenderStoryRequest,
  RenderVideoRequest,
} from './types/schema'
import { env } from '@/env.mjs'

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

  return makeRequest(`${env.NEXT_PUBLIC_RENDER_URL}/api/video`, body)
}

export const renderNewStory = async ({
  id,
  inputProps,
}: {
  id: string
  inputProps: z.infer<typeof storyCompSchema>
}) => {
  const body: z.infer<typeof RenderStoryRequest> = {
    id,
    inputProps,
  }

  return makeRequest(`${env.NEXT_PUBLIC_RENDER_URL}/api/story`, body)
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
  console.log('Test', env.NEXT_PUBLIC_RENDER_URL)

  return makeRequest(`${env.NEXT_PUBLIC_RENDER_URL}/api/image`, body)
}

// TODO: figure out how to get progress from local render
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

  return makeRequest(`${env.NEXT_PUBLIC_RENDER_URL}/api/lambda/progress`, body)
}
