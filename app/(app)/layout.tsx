import { Box } from '@mui/joy'
import { ReactNode } from 'react'

export default function AppLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <Box padding={2} bgcolor={'red'} height={'100%'} width={'100%'}>
            {children}
        </Box>
    )
}