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
import { Box, Grid, Stack, Typography } from '@mui/joy'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'

const Video: NextPage = () => {
  const [texts, setTexts] = useState(defaultVideoCompProps.titleTexts)
  const [color, setColor] = useState(defaultVideoCompProps.titleColor)
  const [videoUrls, setVideoUrls] = useState(defaultVideoCompProps.videoUrls)
  const [pageHeading, setPageHeading] = useState(
    defaultVideoCompProps.pageHeading
  )

  const inputProps: z.infer<typeof videoCompSchema> = useMemo(() => {
    return {
      titleTexts: texts,
      titleColor: color,
      pageHeading: pageHeading,
      videoUrls,
    }
  }, [texts, color, pageHeading])

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
            height: { xs: '100%', md: '85vh' },
            alignContent: { md: 'center' },
            justifyContent: { xs: 'center' },
          }}
        >
          <RenderVideoControls
            texts={texts}
            setTexts={setTexts}
            videoUrls={videoUrls}
            setVideoUrls={setVideoUrls}
            inputProps={inputProps}
            color={color}
            setColor={setColor}
            pageHeading={pageHeading}
            setPageHeading={setPageHeading}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Video
