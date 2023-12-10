import { AbsoluteFill, Img, staticFile } from 'remotion'

export const TopImage: React.FC = () => {
  const clipPath = `polygon(0 0, 100% 1%, 100% 48%, 0 79%)`
  return (
    <AbsoluteFill>
      <div style={{ position: 'relative', bottom: '1%', clipPath: clipPath }}>
        <Img src={staticFile('celebration.jpg')} />
      </div>
    </AbsoluteFill>
  )
}
