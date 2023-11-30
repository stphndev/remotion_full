import { z } from 'zod'
import { useImageRendering } from '@/libs/helpers/use-image-rendering'
import { imageCompSchema, IMAGE_COMP_NAME } from '@/libs/types/constants'
import { AlignEnd } from './AlignEnd'
import { InputContainer } from './Container'
import { DownloadButton } from './DownloadButton'
import { DropDown } from './DropDown'
import { Input } from './Input'
import { MyColorPicker } from './MyColorPicker'
import { ProgressBar } from './ProgressBar'
import { Spacing } from './Spacing'
import { Button } from './Button/Button'
import { ErrorComp } from './Error'

const controls: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export const RenderImageControls: React.FC<{
  text: string
  color: string
  setText: React.Dispatch<React.SetStateAction<string>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  pageHeading: string
  setPageHeading: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof imageCompSchema>
}> = ({
  text,
  setText,
  color,
  setColor,
  pageHeading,
  setPageHeading,
  inputProps,
}) => {
  const { renderMedia, state, undo } = useImageRendering(
    IMAGE_COMP_NAME,
    inputProps
  )

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
            <Input setText={setText} text={text}></Input>
            <Spacing></Spacing>
            <Spacing></Spacing>
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
              Render image
            </Button>
          </AlignEnd>
          {state.status === 'error' ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </div>
      ) : null}
      {state.status === 'rendering' || state.status === 'done' ? (
        <>
          <ProgressBar
            progress={state.status === 'rendering' ? state.progress : 1}
          />
          <Spacing></Spacing>
          <AlignEnd>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  )
}
