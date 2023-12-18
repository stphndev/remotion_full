'use client'

import {
  HEIGHT,
  VIDEO_FPS,
  WIDTH,
  defaultStoryCompProps,
  defaultVideoCompProps,
  storyCompSchema,
} from '@/libs/types/constants'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'
import { StoryComp } from '@/remotion/bundle/Comps/Story/StoryComp'
import { Box, Grid, Typography } from '@mui/joy'
import { RenderStoryControls } from '@/components/RenderStoryControls'

const Video2: NextPage = () => {
  const [coinRows, setCoinRows] = useState(defaultStoryCompProps.coinRows)
  const [pageHeading, setPageHeading] = useState(
    defaultStoryCompProps.pageHeading
  )
  const inputProps: z.infer<typeof storyCompSchema> = useMemo(() => {
    return {
      coinRows,
      pageHeading,
    }
  }, [coinRows])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography level='h1' sx={{ textAlign: 'center', mb: 5 }}>
        {pageHeading}
      </Typography>
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
            pageHeading={pageHeading}
            setPageHeading={setPageHeading}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Video2
