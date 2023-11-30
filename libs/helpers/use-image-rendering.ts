import { z } from 'zod'
import { useCallback, useMemo, useState } from 'react'
import { renderImage } from '../api'
import { imageCompSchema } from '../types/constants'

export type State =
  | {
      status: 'init'
    }
  | {
      status: 'invoking'
    }
  | {
      renderId: string
      bucketName: string
      progress: number
      status: 'rendering'
    }
  | {
      renderId: string | null
      status: 'error'
      error: Error
    }
  | {
      url: string
      size: number
      status: 'done'
    }

export const useImageRendering = (
  id: string,
  inputProps: z.infer<typeof imageCompSchema>
) => {
  const [state, setState] = useState<State>({
    status: 'init',
  })

  const renderMedia = useCallback(async () => {
    setState({
      status: 'invoking',
    })
    try {
      const { sizeInBytes, url } = await renderImage({ id, inputProps })
      setState({
        status: 'done',
        size: sizeInBytes,
        url: url,
      })
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
