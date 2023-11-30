import { Composition, Still } from 'remotion'
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_COMP_NAME,
  IMAGE_COMP_NAME,
  videoCompSchema,
  imageCompSchema,
  defaultImageCompProps,
  defaultVideoCompProps,
  WIDTH,
  HEIGHT,
} from '../libs/types/constants'
import { VideoComp } from './MyComp/Video/VideoComp'
import { ImageComp } from './MyComp/Image/ImageComp'

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
    </>
  )
}
