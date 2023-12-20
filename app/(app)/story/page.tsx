'use client'

import {
  HEIGHT,
  VIDEO_FPS,
  WIDTH,
  defaultStoryCompProps,
  storyCompSchema,
} from '@/libs/types/constants'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'
import { StoryComp } from '@/remotion/bundle/Comps/Story/StoryComp'
import { Box, Grid, } from '@mui/joy'
import { RenderStoryControls } from '@/components/RenderStoryControls'

const Story: NextPage = () => {
  const [coinRows, setCoinRows] = useState(defaultStoryCompProps.coinRows)

  const inputProps: z.infer<typeof storyCompSchema> = useMemo(() => {
    return {
      coinRows,
    }
  }, [coinRows])

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
            component={StoryComp}
            inputProps={inputProps}
            durationInFrames={420}
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
            height: { xs: '100%', md: '85vh' },
            alignContent: { md: 'center' },
            justifyContent: { xs: 'center' },
          }}
        >
          <RenderStoryControls
            coinRows={coinRows}
            setCoinRows={setCoinRows}
            inputProps={inputProps}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Story
