import { useVideoConfig } from 'remotion'
import { CoinRow } from './CoinRow'
import { Heading } from './Heading'

export const Main = () => {
  const { width, height } = useVideoConfig()

  return (
    <main
      style={{
        width: width,
        height: height,
        backgroundColor: '#350d36',
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
        <CoinRow
          imgPath='btc.svg'
          coinName='BTC'
          growthRate={{ value: 23119, percent: 0.4 }}
          arrowPath='triangle-up.svg'
        />
        <CoinRow
          imgPath='eth.svg'
          coinName='ETH'
          growthRate={{ value: 1601, percent: 0.1 }}
          arrowPath='triangle-up.svg'
        />
        <CoinRow
          imgPath='ada.svg'
          coinName='ADA'
          growthRate={{ value: 0.36, percent: 1.3 }}
          arrowPath='triangle-down.svg'
        />
      </div>
    </main>
  )
}