import { Composition, Still } from 'remotion'
import {
  DURATION_IN_FRAMES,
  HEIGHT,
  IMAGE_COMP_NAME,
  VIDEO2_COMP_NAME,
  VIDEO_COMP_NAME,
  VIDEO_FPS,
  WIDTH,
  defaultImageCompProps,
  defaultVideo2CompProps,
  defaultVideoCompProps,
  imageCompSchema,
  video2CompSchema,
  videoCompSchema,
} from '../../libs/types/constants'
import { ImageComp } from './MyComp/Image/ImageComp'
import { VideoComp } from './MyComp/Video/VideoComp'
import { Main } from './MyComp/Video2/Main'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={VIDEO_COMP_NAME}
        component={VideoComp}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={videoCompSchema}
        defaultProps={defaultVideoCompProps}
      />
      <Still
        id={IMAGE_COMP_NAME}
        component={ImageComp}
        width={WIDTH}
        height={HEIGHT}
        schema={imageCompSchema}
        defaultProps={defaultImageCompProps}
      />
      <Composition
        id={VIDEO2_COMP_NAME}
        component={Main}
        durationInFrames={420}
        fps={VIDEO_FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={video2CompSchema}
        defaultProps={defaultVideo2CompProps}
      />
    </>
  )
}
