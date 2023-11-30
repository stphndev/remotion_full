import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'
import { Video, useVideoConfig, staticFile } from 'remotion'

export const VideoSequence = () => {
  const { width, height } = useVideoConfig()
  return (
    <div style={{ position: 'relative', bottom: '10%' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={270}>
          <Video
            src={staticFile('stock_market_1.mp4')}
            height={height / 2}
            width={width}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Video
            src={staticFile('stock_market_2.mp4')}
            height={height / 2}
            width={width}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <Video
            src={staticFile('stock_market_3.mp4')}
            height={height / 2}
            width={width}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  )
}
