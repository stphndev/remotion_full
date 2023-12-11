'use client'

import { RenderVideo2Controls } from '@/components/RenderVideo2Controls'
import {
  HEIGHT,
  VIDEO_FPS,
  WIDTH,
  defaultVideo2CompProps,
  defaultVideoCompProps,
  video2CompSchema,
} from '@/libs/types/constants'
import { Main } from '@/remotion/bundle/MyComp/Video2/Main'
import { Player } from '@remotion/player'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { z } from 'zod'

const outer: React.CSSProperties = {
  overflow: 'hidden',
  maxHeight: '80vh',
  width: '65%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const player: React.CSSProperties = {
  width: '100%',
}

const control: React.CSSProperties = {
  width: '35%',
  padding: '10px',
}

const Video2: NextPage = () => {
  const [coinRows, setCoinRows] = useState(defaultVideo2CompProps.coinRows)
  const [pageHeading, setPageHeading] = useState(
    defaultVideoCompProps.pageHeading
  )
  const inputProps: z.infer<typeof video2CompSchema> = useMemo(() => {
    return {
      coinRows,
    }
  }, [coinRows])

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '24px' }}>{pageHeading}</h1>
      <div className='container'>
        <div style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={420}
            fps={VIDEO_FPS}
            compositionHeight={HEIGHT}
            compositionWidth={WIDTH}
            style={player}
            controls={true}
            loop={true}
          />
        </div>
        <div style={control}>
          <RenderVideo2Controls
            coinRows={coinRows}
            setCoinRows={setCoinRows}
            inputProps={inputProps}
            pageHeading={pageHeading}
            setPageHeading={setPageHeading}
          />
        </div>
      </div>
    </div>
  )
}

export default Video2
