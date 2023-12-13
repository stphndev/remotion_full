import { z } from 'zod'
import { Spacing } from './Spacing'
import { DropDown } from './DropDown'
import { InputContainer } from './Container'
import { AlignEnd } from './AlignEnd'
import { Button } from './Button/Button'
import {
  video2CompSchema,
  coinRowSchema,
  VIDEO2_COMP_NAME,
} from '@/libs/types/constants'
import { ErrorComp } from './Error'
import { useVideo2Rendering } from '@/libs/helpers/use-video2-rendering'
import { Input } from './Input'
import { FontPicker } from './FontPicker'
import { useState } from 'react'
import { loadFont } from '@remotion/google-fonts/ChakraPetch'

const { fontFamily } = loadFont()

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

export const select: React.CSSProperties = {
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

export const RenderVideo2Controls: React.FC<{
  coinRows: z.infer<typeof coinRowSchema>[]
  setCoinRows: React.Dispatch<
    React.SetStateAction<z.infer<typeof coinRowSchema>[]>
  >
  pageHeading: string
  setPageHeading: React.Dispatch<React.SetStateAction<string>>
  setMyFont: React.Dispatch<React.SetStateAction<string>>
  inputProps: z.infer<typeof video2CompSchema>
}> = ({
  coinRows,
  setCoinRows,
  pageHeading,
  setPageHeading,
  setMyFont,
  inputProps,
}) => {
  const { renderMedia, state } = useVideo2Rendering(
    VIDEO2_COMP_NAME,
    inputProps
  )

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return { ...coinRow, [e.target.name]: e.target.value.toUpperCase() }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number,
    name: string
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex && name === e.target.name) {
            return {
              ...coinRow,
              [`${e.target.name}`]: e.target.value,
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleDoubleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return {
              ...coinRow,
              [`${e.target.name}`]: Number(e.target.value),
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return {
              ...coinRow,
              [`${e.target.name}`]: Number(e.target.value),
            }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    textIndex: number
  ) => {
    setCoinRows((prevCoinRows: z.infer<typeof coinRowSchema>[]) => {
      const newCoinRows = prevCoinRows.map(
        (coinRow: z.infer<typeof coinRowSchema>, index: number) => {
          if (index === textIndex) {
            return { ...coinRow, [e.target.name]: e.target.value }
          }
          return coinRow
        }
      )
      return newCoinRows
    })
  }

  return (
    <InputContainer>
      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <div style={controls}>
          <DropDown text='Font Picker'>
            <FontPicker setMyFont={setMyFont} />
          </DropDown>
          <DropDown text='Heading'>
            <Input setText={setPageHeading} text={pageHeading}></Input>
          </DropDown>
          {coinRows?.map((coinRow, index) => (
            <div key={index}>
              <DropDown text={`CoinRow${index + 1}`}>
                <div>
                  <p>Name:</p>
                  <input
                    name='name'
                    style={textarea}
                    value={coinRow.name.toUpperCase()}
                    onChange={(e) => handleNameChange(e, index)}
                  />
                </div>
                <Spacing></Spacing>
                <Spacing></Spacing>
                <div>
                  <p>Change:</p>
                  <input
                    name='change'
                    style={textarea}
                    value={coinRow.change}
                    type='number'
                    onChange={(e) => handleDoubleChange(e, index)}
                  />
                </div>
                <Spacing></Spacing>
                <Spacing></Spacing>
                <div>
                  <p>Value:</p>
                  <input
                    name='value'
                    style={textarea}
                    value={coinRow.value}
                    type='number'
                    onChange={(e) => handleValueChange(e, index)}
                  />
                </div>
                <Spacing></Spacing>
                <Spacing></Spacing>
                <div>
                  <p>Image URL:</p>
                  <input
                    name='imageUrl'
                    style={textarea}
                    value={coinRow.imageUrl}
                    onChange={(e) => handleImageChange(e, index, 'imageUrl')}
                  />
                </div>
                <Spacing></Spacing>
                <Spacing></Spacing>
                <div>
                  <p>Direction:</p>
                  <select
                    name='direction'
                    style={select}
                    value={coinRow.direction}
                    onChange={(e) => handleSelect(e, index)}
                  >
                    <option value='up'>up</option>
                    <option value='down'>down</option>
                  </select>
                </div>
              </DropDown>
              <Spacing></Spacing>
              <Spacing></Spacing>
            </div>
          ))}

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
