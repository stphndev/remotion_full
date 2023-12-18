import { useEffect, useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'

export const MyColorPicker: React.FC<{
  setMyColor: React.Dispatch<React.SetStateAction<string>>
  description: string
  initialColor: string
}> = ({ setMyColor, description, initialColor }) => {
  const [color, setColor] = useColor(initialColor)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMyColor(color.hex)
  }, [color])
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #eaeaea',
          padding: '0 8px',
        }}
      >
        <p>{description}</p>
        <button
          style={{ background: color.hex, height: '20px', width: '40px' }}
          onClick={() => setIsVisible(!isVisible)}
        ></button>
      </div>

      {isVisible && <ColorPicker color={color} onChange={setColor} />}
    </div>
  )
}
