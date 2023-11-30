import { bundle } from '@remotion/bundler'
import path from 'path'

const myBundle = await bundle({
  entryPoint: path.join(process.cwd(), 'react', 'index.ts'),
  webpackOverride: (config) => config,
})

export default myBundle
