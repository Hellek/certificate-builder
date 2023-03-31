import { createEvent } from 'effector'
import { createGate } from 'effector-react'

import { Theme } from './state'

export const AppGate = createGate()

export const toggleThemeEvent = createEvent('toggleThemeEvent')
export const setThemeEvent = createEvent<Theme>('setThemeEvent')
