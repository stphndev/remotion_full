'use client'

import { RenderVideoControls } from '@/components/RenderVideoControls'
import {
  DURATION_IN_FRAMES,
  HEIGHT,
  VIDEO_FPS,
  WIDTH,
  defaultVideoCompProps,
  videoCompSchema,
} from '@/libs/types/constants'
import { VideoComp } from '@/remotion/bundle/Comps/Video/VideoComp'
import { Box, Grid } from '@mui/joy'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'

const Video: NextPage = () => {
  const [segments, setSegments] = useState(defaultVideoCompProps.segments)

  const [audioUrl, setAudioUrl] = useState(defaultVideoCompProps.audioUrl)

  const inputProps: z.infer<typeof videoCompSchema> = useMemo(() => {
    return {
      segments,
      audioUrl,
    }
  }, [segments, audioUrl])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container spacing={3}>
        <Grid
          sx={{
            overflow: { md: 'hidden' },
            width: { md: '65%', xs: '100%' },
            height: '85vh',
          }}
        >
          <Player
            component={VideoComp}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={HEIGHT}
            compositionWidth={WIDTH}
            controls={true}
            style={{ width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid
          sx={{
            display: 'grid',
            width: { md: '35%', xs: '100%' },
            minHeight: { xs: '100%', md: '85vh' },
            alignContent: { md: 'center' },
            justifyContent: { xs: 'center' },
          }}
        >
          <RenderVideoControls
            segments={segments}
            setSegments={setSegments}
            audioUrl={audioUrl}
            setAudioUrl={setAudioUrl}
            inputProps={inputProps}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Video
