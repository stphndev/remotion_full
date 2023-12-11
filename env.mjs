import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    RENDER_URL: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_RENDER_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    RENDER_URL: process.env.RENDER_URL,
    NEXT_PUBLIC_RENDER_URL: process.env.NEXT_PUBLIC_RENDER_URL,
  },
})
