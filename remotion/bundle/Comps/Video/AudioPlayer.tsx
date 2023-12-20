import React, { useMemo, useState } from 'react'
import { Audio, useVideoConfig } from 'remotion'
import { z } from 'zod'

const urlSchema = z.object({
  audioUrl: z.string(),
})
export const AudioPlayer: React.FC<z.infer<typeof urlSchema>> = ({
  audioUrl,
}) => {
  const { durationInFrames } = useVideoConfig()
  const [validUrl, setValidUrl] = useState(audioUrl)
  const isValidImageUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }

  const handleValidUrl = useMemo(() => {
    if (isValidImageUrl(audioUrl)) {
      setValidUrl(audioUrl)
    } else {
      console.log('Invalid Audio Url')
    }
  }, [audioUrl])

  return (
    <Audio
      placeholder='Audio'
      src={validUrl}
      volume={1.0}
      startFrom={0}
      endAt={durationInFrames}
    />
  )
}
