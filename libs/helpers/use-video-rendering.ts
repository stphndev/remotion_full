import { z } from 'zod'
import { useCallback, useMemo, useState } from 'react'
import { getProgress, renderNewVideo } from '../api'
import { videoCompSchema } from '../types/constants'

export type State =
  | {
      status: 'init'
    }
  | {
      status: 'invoking'
    }
  | {
      progress: number
      status: 'rendering'
    }
  | {
      renderId: string | null
      status: 'error'
      error: Error
    }
  | {
      message: string
      status: 'done'
    }

const wait = async (milliSeconds: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliSeconds)
  })
}

export const useVideoRendering = (
  id: string,
  inputProps: z.infer<typeof videoCompSchema>
) => {
  const [state, setState] = useState<State>({
    status: 'init',
  })

  const renderMedia = useCallback(async () => {
    setState({
      status: 'invoking',
    })
    try {
      const { message } = await renderNewVideo({ id, inputProps })
      setState({
        status: 'done',
        message,
      })

      // let pending = true

      // while (pending) {
      //   const result = await getProgress({
      //     id: renderId,
      //     bucketName: bucketName,
      //   })
      //   switch (result.type) {
      //     case 'error': {
      //       setState({
      //         status: 'error',
      //         renderId: renderId,
      //         error: new Error(result.message),
      //       })
      //       pending = false
      //       break
      //     }
      //     case 'done': {
      //       setState({
      //         size: result.size,
      //         url: result.url,
      //         status: 'done',
      //       })
      //       pending = false
      //       break
      //     }
      //     case 'progress': {
      //       setState({
      //         status: 'rendering',
      //         // bucketName: bucketName,
      //         progress: result.progress,
      //         // renderId: renderId,
      //       })
      //       await wait(1000)
      //     }
      //   }
      // }
    } catch (err) {
      setState({
        status: 'error',
        error: err as Error,
        renderId: null,
      })
    }
  }, [id, inputProps])

  const undo = useCallback(() => {
    setState({ status: 'init' })
  }, [])

  return useMemo(() => {
    return {
      renderMedia,
      state,
      undo,
    }
  }, [renderMedia, state, undo])
}
