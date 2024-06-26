import { appTools, defineConfig } from '@modern-js/app-tools'
import versionGen from './config/plugin/version-gen'

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  output: {
    ssg: false,
    polyfill: 'usage',
  },
  server: {
    ssr: true,
    port: 8080,
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    versionGen(),
  ],
  tools: {
    sass: {
      additionalData: `@use "@/styles/index.scss" as *; @use "@/styles/theme.scss" as *;`,
    },
  },
  source: {
    globalVars: {
      'process.env.MODERN_APP_TITLE': process.env.MODERN_APP_TITLE,
      'process.env.MODERN_APP_DESCRIPTION': process.env.MODERN_APP_DESCRIPTION,
      'process.env.MODERN_APP_AUTHOR': process.env.MODERN_APP_AUTHOR,
      'process.env.MODERN_BASE': process.env.MODERN_BASE,
      'process.env.MODERN_API_BASE': process.env.MODERN_API_BASE,
    },
  },
})
