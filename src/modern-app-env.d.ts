/// <reference types='@modern-js/app-tools/types' />
/// <reference types='@modern-js/runtime/types' />
/// <reference types='@modern-js/runtime/types/router' />

declare namespace NodeJS {
  interface ProcessEnv {
    MODERN_APP_TITLE: string
    MODERN_APP_AUTHOR: string
    MODERN_APP_DESCRIPTION: string
    MODERN_BASE: string
    MODERN_API_BASE: string
  }
}

declare module '@/utils/version' {
  declare const VERSION: string
  export default VERSION
}
