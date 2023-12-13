import React, { useCallback } from 'react'
import { top25Fonts } from './top25Fonts'
import { select } from './RenderVideo2Controls'

export const FontPicker: React.FC<{
  setMyFont: React.Dispatch<React.SetStateAction<any>>
}> = ({ setMyFont }) => {
  const newFonts = top25Fonts

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const fonts = newFonts[e.target.selectedIndex]

      // Load font information
      const loaded = await fonts.load()
      loaded.loadFont
      setMyFont(loaded.fontFamily)
    },
    [newFonts]
  )

  return (
    <div>
      <select style={select} onChange={onChange}>
        {newFonts.map((f) => {
          return (
            <option key={f.family} value={f.family}>
              {f.family}
            </option>
          )
        })}
      </select>
    </div>
  )
}
