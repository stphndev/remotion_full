import { Box } from '@mui/joy'
import { AbsoluteFill, Img, staticFile } from 'remotion'

export const TopImage: React.FC = () => {
  const clipPath = `polygon(0 0, 100% 1%, 100% 48%, 0 79%)`
  return (
    <AbsoluteFill>
      <Box style={{ position: 'relative', bottom: '1%', clipPath: clipPath }}>
        <Img placeholder='Image' src={staticFile('celebration.jpg')} />
      </Box>
    </AbsoluteFill>
  )
}
