import { createSlice } from '@reduxjs/toolkit'

export type SystemSlice = {
  size: {
    width: number
    height: number
  }
  platform: string | null
  mediaTheme: 'dark' | 'light'
}

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    size: { width: 0, height: 0 },
    platform: null,
    mediaTheme: 'light',
  } as SystemSlice,
  reducers: {
    flush(state) {
      state.size = { width: window.innerWidth, height: window.innerHeight }
      state.platform =
        /(?<mobile>iPhone|iPod|Android|ios|iPad)|(?<desktop>Win64|Win32|Mac|Linux)/i.exec(
          navigator.userAgent,
        )?.[0] ?? null
      state.mediaTheme = window.matchMedia('(prefers-color-scheme: light)')
        ?.matches
        ? 'light'
        : 'dark'
    },
    flushMediaTheme(state) {
      state.mediaTheme = window.matchMedia('(prefers-color-scheme: light)')
        ?.matches
        ? 'light'
        : 'dark'
    },
  },
})

export const { actions: systemActions, reducer: systemReducer } = systemSlice
