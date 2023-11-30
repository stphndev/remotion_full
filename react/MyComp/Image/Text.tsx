import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const myTextSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
})

export const Text: React.FC<z.infer<typeof myTextSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <p
        style={{
          color: titleColor,
          fontSize: '80px',
          textAlign: 'center',
          width: '80%',
          fontFamily: 'Agbalumo',
        }}
      >
        {titleTexts}
      </p>
    </div>
  )
}
