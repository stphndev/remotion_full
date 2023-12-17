'use client'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssVarsProvider as JoyCssVarsProvider, extendTheme } from '@mui/joy/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
    experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles'
import { useServerInsertedHTML } from 'next/navigation'
import { ReactNode, useState } from 'react'

export default function ThemeRegistry({
    children,
}: {
    children: ReactNode
}) {
    const materialTheme = materialExtendTheme()
    const [{ cache, flush }] = useState(() => {
        const cache = createCache({ key: 'joy' })
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
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <>
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        )
    })

    return (
        <CacheProvider value={cache}>
            <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
                <JoyCssVarsProvider
                    theme={extendTheme({
                        cssVarPrefix: 'remotion', // optional
                    })}
                    //  the custom theme is optional
                >
                    <CssBaseline enableColorScheme={true} />
                    {children}
                </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
        </CacheProvider>
    )
}
