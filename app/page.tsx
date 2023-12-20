import { Button, Input, Stack, Typography } from '@mui/joy'

import NextLink from 'next/link'

export default function Home() {
  return (
    <Stack
      height={'100%'}
      width={'100%'}
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <Typography level='h1'>Home</Typography>

      <NextLink href='/video' style={{ textDecoration: 'none' }}>
        <Button>Generate Video</Button>
      </NextLink>

      <NextLink href='/image' style={{ textDecoration: 'none' }}>
        <Button>Generate Image</Button>
      </NextLink>

      <NextLink href='/story' style={{ textDecoration: 'none' }}>
        <Button>Generate Story</Button>
      </NextLink>
    </Stack>
  )
}
