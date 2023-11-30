import React, { useState } from 'react'
import ArrowUp from '@/public/arrow_up.svg'
import ArrowDown from '@/public/arrow_down.svg'
import Image from 'next/image'

const main: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 10px 0px 5px',
  borderBottom: '1px solid #565c6b',
  fontSize: '18px',
  marginBottom: '10px',
}

export const DropDown: React.FC<{
  text: string
  children: React.ReactNode
}> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div style={main}>
        <p>{text}</p>
        <button
          style={{ border: 'none', background: 'none' }}
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <Image src={ArrowUp} alt='Up Arrow' />
          ) : (
            <Image src={ArrowDown} alt='Down Arrow' />
          )}
        </button>
      </div>
      {isVisible && children}
    </>
  )
}
