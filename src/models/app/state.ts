import { createStore } from 'effector'

export type Theme = 'light' | 'dark'
export const THEME_LOCAL_STORAGE_KEY = 'theme'

const initialTheme = (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme)
  ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export const $theme = createStore<Theme>(initialTheme)
