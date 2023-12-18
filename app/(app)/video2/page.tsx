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
import { continueRender, delayRender, staticFile } from 'remotion'

const waitForFont = delayRender()
const font = new FontFace(
  'Handel Gothic',
  `url('${staticFile('Handel Gothic D Regular.ttf')}') format('truetype')`
)

font
  .load()
  .then(() => {
    document.fonts.add(font)
    continueRender(waitForFont)
  })
  .catch((err) => console.log('Error loading font', err))

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
  const [myFont, setMyFont] = useState(font.family)
  const [pageHeading, setPageHeading] = useState(
    defaultVideoCompProps.pageHeading
  )
  const inputProps: z.infer<typeof video2CompSchema> = useMemo(() => {
    return {
      coinRows,
      font: myFont,
    }
  }, [coinRows, myFont])

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
          />
        </div>
        <div style={control}>
          <RenderVideo2Controls
            coinRows={coinRows}
            setCoinRows={setCoinRows}
            inputProps={inputProps}
            pageHeading={pageHeading}
            setPageHeading={setPageHeading}
            setMyFont={setMyFont}
          />
        </div>
      </div>
    </div>
  )
}

export default Video2
