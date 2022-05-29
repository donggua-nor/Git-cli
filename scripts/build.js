import esbuild from 'esbuild'
import { resolve } from 'path'
import chalk from 'chalk'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const log = (msg) => console.log(chalk.green(msg))
const outDir = resolve(__dirname, '..', 'dist')

async function esm() {
  const outfile = resolve(outDir, 'index.js')

  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    sourcemap: true,
    outfile,
    plugins: [nodeExternalsPlugin()]
  })
}

async function cjs() {
  const outfile = resolve(outDir, 'common.js')

  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    outfile,
    plugins: [nodeExternalsPlugin()]
  })
}

;(async () => {
  await Promise.all([esm(), cjs()])
  log('completed!')
})()
