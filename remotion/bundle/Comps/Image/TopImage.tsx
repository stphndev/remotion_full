import { useMemo, useState } from 'react'
import { AbsoluteFill, Img } from 'remotion'
import { z } from 'zod'

const urlSchema = z.object({
  imageUrl: z.string(),
})

export const TopImage: React.FC<z.infer<typeof urlSchema>> = ({ imageUrl }) => {
  const clipPath = `polygon(0 0, 100% 1%, 100% 48%, 0 79%)`
  const [validImage, setValidImage] = useState(imageUrl)

  const isValidImageUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }

  const handleValidImage = useMemo(() => {
    if (isValidImageUrl(imageUrl)) {
      setValidImage(imageUrl)
    } else {
      console.log('Invalid Image')
    }
  }, [imageUrl])

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'relative',
          bottom: '1%',
          clipPath: clipPath,
          width: '100%',
          height: '56%',
        }}
      >
        <Img
          placeholder='Image'
          style={{ width: '100%', height: '100%' }}
          src={validImage}
        />
      </div>
    </AbsoluteFill>
  )
}
