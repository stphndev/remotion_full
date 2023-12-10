import { useEffect, useState } from 'react'
import { Img, staticFile, useCurrentFrame } from 'remotion'
import { z } from 'zod'

export const coinRowSchema = z.object({
  imgPath: z.string(),
  coinName: z.string(),
  growthRate: z.object({
    value: z.number(),
    percent: z.number(),
  }),
  arrowPath: z.string(),
})

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
  color: '#fff',
}

export const CoinRow = ({
  imgPath,
  coinName,
  growthRate,
  arrowPath,
}: z.infer<typeof coinRowSchema>) => {
  const frame = useCurrentFrame()
  const [value, setValue] = useState(`${growthRate.percent}%`)

  useEffect(() => {
    let myValue = growthRate.value.toString()
    if ((frame / 120) % 2 === 1 && value !== myValue) {
      setValue(myValue)
    } else if ((frame / 120) % 2 === 0 && value !== `${growthRate.percent}%`) {
      setValue(`${growthRate.percent}%`)
    }
  }, [frame])

  return (
    <div style={container}>
      <div style={{ display: 'flex', gap: '150px', alignItems: 'center' }}>
        <Img height={100} width={100} src={staticFile(imgPath)} />
        <p style={{ fontSize: '100px' }}>{coinName}</p>
      </div>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ fontSize: '60px', width: '150px' }}>{value}</span>
        <Img height={100} width={100} src={staticFile(arrowPath)} />
      </div>
    </div>
  )
}