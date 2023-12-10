import path from 'path'
import { bundle } from '@remotion/bundler'

const myBundle = await bundle({
    entryPoint: path.join(process.cwd(), 'remotion', 'bundle', 'index.ts'),
    webpackOverride: (config) => config,
})

export default myBundle
