import { useVideoConfig } from 'remotion'
import { CoinRow } from './CoinRow'
import { video2CompSchema, coinRowSchema } from '@/libs/types/constants'
import { z } from 'zod'
import { Heading } from './Heading'

export const Main: React.FC<z.infer<typeof video2CompSchema>> = ({
  coinRows,
}) => {
  const { width, height } = useVideoConfig()
  console.log(coinRows)
  return (
    <main
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
      <p style={{ fontStyle: 'italic', fontSize: '40px', textAlign: 'center' }}>
        BLOCKTALK
      </p>
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
            imageUrl={coinRow.imageUrl}
            name={coinRow.name}
            value={coinRow.value}
            change={coinRow.change}
            direction={coinRow.direction}
          />
        ))}
      </div>
    </main>
  )
}
