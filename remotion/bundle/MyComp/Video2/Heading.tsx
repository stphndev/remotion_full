import { z } from 'zod'
import { zColor } from '@remotion/zod-types'

export const headingSchema = z.object({
  titleTexts: z.string(),
  titleColor: zColor(),
})

export const Heading: React.FC<z.infer<typeof headingSchema>> = ({
  titleTexts,
  titleColor,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <p
        style={{
          color: titleColor,
          fontSize: '100px',
          textAlign: 'center',
          width: '60%',
        }}
      >
        {titleTexts}
      </p>
    </div>
  )
}
