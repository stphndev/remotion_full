import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import myBundle from './bundle.mjs'

const PORT = 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
const bundleLocation = myBundle

app.post('/api/image', async (req, res) => {
    const { id, inputProps } = req.body

    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id,
        inputProps,
    })

    await renderStill({
        composition: composition,
        serveUrl: bundleLocation,
        output: `out/${id}.png`,
        inputProps,
    })

    res.send({ message: 'Render done' })
})

app.post('/api/video', async (req, res) => {
    const { id, inputProps } = req.body

    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id,
        inputProps,
    })

    const onProgress = ({ progress }) => {
        console.log(`Rendering is ${progress * 100}% complete`)
    }
    await renderMedia({
        composition: composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: `out/${id}.mp4`,
        inputProps,
        onProgress,
    })

    res.json({ message: 'Render done' })
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
