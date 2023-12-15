import { z } from 'zod'
import { Spacing } from './Spacing'
import { MyColorPicker } from './MyColorPicker'
import { DropDown } from './DropDown'
import { Input } from './Input'
import { InputContainer } from './Container'
import { AlignEnd } from './AlignEnd'
import { Button } from './Button/Button'
import { useVideoRendering } from '@/libs/helpers/use-video-rendering'
import { VIDEO_COMP_NAME, videoCompSchema } from '@/libs/types/constants'
import { ErrorComp } from './Error'

const textarea: React.CSSProperties = {
  resize: 'none',
  lineHeight: 1.7,
  display: 'block',
  width: '100%',
  borderRadius: 'var(--geist-border-radius)',
  backgroundColor: 'var(--background)',
  padding: 'var(--geist-half-pad)',
  color: 'var(--foreground)',
  fontSize: 14,
}

const controls: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export const RenderVideoControls: React.FC<{
  texts: { title: string; text: string[] }[]
  color: string
  setTexts: React.Dispatch<
    React.SetStateAction<{ title: string; text: string[] }[]>
  >
  setColor: React.Dispatch<React.SetStateAction<string>>
  pageHeading: string
  setPageHeading: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof videoCompSchema>
}> = ({
  texts,
  setTexts,
  setColor,
  color,
  pageHeading,
  setPageHeading,
  inputProps,
}) => {
  const { renderMedia, state, undo } = useVideoRendering(
    VIDEO_COMP_NAME,
    inputProps
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setTexts((prevTexts: { title: string; text: string[] }[]) => {
      const newTexts = prevTexts.map(
        (titleText: { title: string; text: string[] }, index) => {
          if (index === textIndex) {
            return {
              ...titleText,
              title: e.target.value,
            }
          }
          return titleText
        }
      )
      return newTexts
    })
  }

  const handleSentenceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number,
    textidx: number
  ) => {
    setTexts((prevTexts: { title: string; text: string[] }[]) => {
      const newTexts = prevTexts.map(
        (titleText: { title: string; text: string[] }, index) => {
          if (index === textIndex) {
            return {
              ...titleText,
              text: titleText.text.map((ttext, idx) => {
                if (idx === textidx) {
                  return e.target.value
                }
                return ttext
              }),
            }
          }
          return titleText
        }
      )
      return newTexts
    })
  }

  return (
    <InputContainer>
      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <div style={controls}>
          <DropDown text='Heading'>
            <Input setText={setPageHeading} text={pageHeading}></Input>
          </DropDown>
          <DropDown text='Text'>
            {texts?.map((text, index) => (
              <div key={index}>
                <p>{`Segment${index + 1}`}</p>
                <input
                  style={textarea}
                  placeholder='title'
                  value={text.title}
                  onChange={(e) => handleChange(e, index)}
                />
                <Spacing></Spacing>
                <Spacing></Spacing>
                {text.text.length > 0 &&
                  text.text.map((txt: string, idx: number) => (
                    <>
                      <input
                        key={idx}
                        placeholder='sentence'
                        style={textarea}
                        value={txt}
                        onChange={(e) => handleSentenceChange(e, index, idx)}
                      />
                      <Spacing></Spacing>
                      <Spacing></Spacing>
                    </>
                  ))}
              </div>
            ))}
          </DropDown>
          <DropDown text='Color'>
            <MyColorPicker
              initialColor={color}
              description='Text Color'
              setMyColor={setColor}
            />
          </DropDown>
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === 'invoking'}
              loading={state.status === 'invoking'}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === 'error' ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </div>
      ) : null}
      {state.status === 'done' ? (
        <>
          <p>{state.message}</p>
          <p>Access Video in (out) folder</p>
        </>
      ) : null}
    </InputContainer>
  )
}
