import React from 'react'
import { Audio, staticFile } from 'remotion'

export const AudioPlayer: React.FC = () => {
  return (
    <Audio
      src={staticFile('news_update.mp3')}
      volume={1.0}
      startFrom={0}
      endAt={810}
    />
  )
}
