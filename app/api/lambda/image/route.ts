import {
  AwsRegion,
  RenderStillOnLambdaOutput,
  renderStillOnLambda,
} from '@remotion/lambda/client'
import { speculateFunctionName } from '@remotion/lambda/client'
import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from '@/config.mjs'
import { executeApi } from '@/libs/helpers/api-response'
import { RenderImageRequest } from '@/libs/types/schema'

export const POST = executeApi<
  RenderStillOnLambdaOutput,
  typeof RenderImageRequest
>(RenderImageRequest, async (req, body) => {
  if (
    !process.env.AWS_ACCESS_KEY_ID &&
    !process.env.REMOTION_AWS_ACCESS_KEY_ID
  ) {
    throw new TypeError(
      'Set up Remotion Lambda to render videos. See the README.md for how to do so.'
    )
  }
  if (
    !process.env.AWS_SECRET_ACCESS_KEY &&
    !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
  ) {
    throw new TypeError(
      'The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.'
    )
  }
  const result = await renderStillOnLambda({
    functionName: speculateFunctionName({
      diskSizeInMb: DISK,
      memorySizeInMb: RAM,
      timeoutInSeconds: TIMEOUT,
    }),
    region: REGION as AwsRegion,
    serveUrl: SITE_NAME,
    composition: body.id,
    inputProps: body.inputProps,
    imageFormat: 'png',
    maxRetries: 1,
    privacy: 'public',
    downloadBehavior: {
      type: 'download',
      fileName: 'image.png',
    },
  })
  return result
})
