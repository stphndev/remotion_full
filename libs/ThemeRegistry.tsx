'use client'

import Header from '../components/Header'

export default function ThemeRegistry(props: { children: any }) {
  const { children } = props
  return (
    <section>
        <section>
          <Header />
          {children}
        </section>
    </section>
  )
}