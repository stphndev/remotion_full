import { AbsoluteFill, staticFile, useVideoConfig, Img } from 'remotion'
import { CoinRow } from './CoinRow'
import { coinRowSchema, storyCompSchema } from '@/libs/types/constants'
import { z } from 'zod'
import { Heading } from './Heading'
import '../../assets/index.css'

export const StoryComp: React.FC<z.infer<typeof storyCompSchema>> = ({
  coinRows,
}) => {
  const { width, height } = useVideoConfig()

  return (
    <AbsoluteFill
      className='main'
      style={{
        width: width,
        height: height,
        backgroundColor: '#030c2b',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        paddingTop: '120px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Img
          placeholder='Img'
          alt='Block Talk'
          src={staticFile('logo.png')}
          style={{ height: 32, width: 200 }}
        />
      </div>
      <Heading titleTexts='Price Action of the day' titleColor='#fff' />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {coinRows?.map((coinRow: z.infer<typeof coinRowSchema>) => (
          <CoinRow
            key={coinRow.name}
            imageUrl={coinRow.imageUrl}
            name={coinRow.name}
            value={coinRow.value}
            change={coinRow.change}
            direction={coinRow.direction}
          />
        ))}
      </div>
    </AbsoluteFill>
  )
}
