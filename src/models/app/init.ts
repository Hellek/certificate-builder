import { setThemeEvent, toggleThemeEvent } from './events'
import { $theme, THEME_LOCAL_STORAGE_KEY } from './state'

$theme
  .on(toggleThemeEvent, previousTheme => (previousTheme === 'light' ? 'dark' : 'light'))
  .on(setThemeEvent, (_, theme) => theme)

$theme.watch(theme => {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme)

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
