import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'
import { OffthreadVideo, useVideoConfig, staticFile } from 'remotion'
import { newsUpdateSchema } from './NewsUpdateDisplay'
import { z } from 'zod'
import { useMemo, useState } from 'react'

export const VideoSequence: React.FC<z.infer<typeof newsUpdateSchema>> = ({
  videoUrls,
}) => {
  const { width, height } = useVideoConfig()
  const [validVideoUrls, setValidVideoUrls] = useState(videoUrls)

  const isValidImageUrl = (urlString: string) => {
    try {
      if (Boolean(new URL(urlString))) {
        fetch(urlString).then((res) => {
          if (res.ok) {
            return true
          } else {
            return false
          }
        })
      }
    } catch (e) {
      return false
    }
  }

  const handleVideoUrl = () =>
    useMemo(() => {
      videoUrls.forEach((videoUrl, urlIndex: number) => {
        if (isValidImageUrl(videoUrl)) {
          setValidVideoUrls((prevUrls: string[]) => {
            const newUrls = prevUrls.map((url: string, index: number) => {
              if (index === urlIndex) {
                return videoUrl
              }
              return url
            })
            return newUrls
          })
        } else {
          console.log('Invalid Image')
        }
      })
    }, [videoUrls])

  return (
    <div style={{ position: 'relative', bottom: '10%' }}>
      <TransitionSeries>
        {validVideoUrls.map((url: string, index: number) => (
          <>
            <TransitionSeries.Sequence key={index} durationInFrames={270}>
              <OffthreadVideo
                src={url}
                style={{ height: height / 2, width: width }}
              />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              key={index}
              presentation={slide()}
              timing={linearTiming({ durationInFrames: 10 })}
            />
          </>
        ))}
      </TransitionSeries>
    </div>
  )
}
