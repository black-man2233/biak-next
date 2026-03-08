export type Theme = 'light' | 'dark' | 'youth'

const STORAGE_KEY = 'biak-theme'
const themes: Theme[] = ['light', 'dark', 'youth']

// Global reactive state (shared across components)
const theme = ref<Theme>('light')

export function useTheme() {
  function applyTheme(t: Theme) {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', t)
    }
    theme.value = t
  }

  function setTheme(t: Theme) {
    applyTheme(t)
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, t)
    }
  }

  function cycleTheme() {
    const idx = themes.indexOf(theme.value)
    setTheme(themes[(idx + 1) % themes.length])
  }

  function initTheme() {
    if (!import.meta.client) return
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    const pref = saved && themes.includes(saved) ? saved : 'light'
    applyTheme(pref)
  }

  return { theme: readonly(theme), themes, setTheme, cycleTheme, initTheme }
}
