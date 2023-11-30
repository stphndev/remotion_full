'use client'

import theme from '@/libs/theme'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/joy/CssBaseline'
import GlobalStyles from '@mui/joy/GlobalStyles'
import { CssVarsProvider } from '@mui/joy/styles'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

interface ThemeRegistryProps {
    options: any
    children: React.ReactNode
}

export default function ThemeRegistry(props: ThemeRegistryProps) {
    const { options, children } = props

    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options)
        cache.compat = true
        const prevInsert = cache.insert
        let inserted: string[] = []
        cache.insert = (...args) => {
            const serialized = args[1]
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name)
            }
            return prevInsert(...args)
        }
        const flush = () => {
            const prevInserted = inserted
            inserted = []
            return prevInserted
        }
        return { cache, flush }
    })

    useServerInsertedHTML(() => {
        const names = flush()
        if (names.length === 0) {
            return null
        }
        let styles = ''
        for (const name of names) {
            styles += cache.inserted[name]
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        )
    })

    return (
        <CacheProvider value={cache}>
            <CssVarsProvider
                defaultMode="system"
                theme={theme}
                modeStorageKey="mode-key"
                disableNestedContext={true}
            >
                {/* the custom theme is optional */}
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        html: {
                            overflowY: 'scroll',
                        },
                        a: {
                            textDecoration: 'none',
                            color: 'var(--joy-palette-primary-500)',
                        },
                        'a:hover': {
                            color: 'var(--joy-palette-primary-600)',
                        },
                        'a:active': {
                            color: 'var(--joy-palette-primary-700)',
                        },
                        li: {
                            paddingLeft: '0 !important',
                        },
                    }}
                />
                <section className="flex flex-col min-h-screen w-full">{children}</section>
            </CssVarsProvider>
        </CacheProvider>
    )
}
