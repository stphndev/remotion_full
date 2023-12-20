'use client'

import { RenderImageControls } from '@/components/RenderImageControls'
import {
  HEIGHT,
  VIDEO_FPS,
  WIDTH,
  defaultImageCompProps,
  imageCompSchema,
} from '@/libs/types/constants'
import { ImageComp } from '@/remotion/bundle/Comps/Image/ImageComp'
import { Box, Grid } from '@mui/joy'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'

const Image: NextPage = () => {
  const [text, setText] = useState<string>(defaultImageCompProps.titleTexts)
  const [color, setColor] = useState(defaultImageCompProps.titleColor)
  const [imageUrl, setImageUrl] = useState(defaultImageCompProps.imageUrl)

  const inputProps: z.infer<typeof imageCompSchema> = useMemo(() => {
    return {
      titleTexts: text,
      titleColor: color,
      imageUrl,
    }
  }, [text, color, imageUrl])

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
            component={ImageComp}
            inputProps={inputProps}
            durationInFrames={30}
            fps={VIDEO_FPS}
            compositionHeight={HEIGHT}
            compositionWidth={WIDTH}
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
          <RenderImageControls
            text={text}
            setText={setText}
            inputProps={inputProps}
            color={color}
            setColor={setColor}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Image
