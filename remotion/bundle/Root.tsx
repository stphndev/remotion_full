import { Composition, Still } from 'remotion'
import {
  DURATION_IN_FRAMES,
  HEIGHT,
  IMAGE_COMP_NAME,
  STORY_COMP_NAME,
  VIDEO_COMP_NAME,
  VIDEO_FPS,
  WIDTH,
  defaultImageCompProps,
  defaultStoryCompProps,
  defaultVideoCompProps,
  imageCompSchema,
  storyCompSchema,
  videoCompSchema,
} from '../../libs/types/constants'
import { ImageComp } from './Comps/Image/ImageComp'
import { VideoComp } from './Comps/Video/VideoComp'
import { StoryComp } from './Comps/Story/StoryComp'

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
        id={STORY_COMP_NAME}
        component={StoryComp}
        durationInFrames={420}
        fps={VIDEO_FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={storyCompSchema}
        defaultProps={defaultStoryCompProps}
      />
    </>
  )
}
