import window from 'handle-window-undefined'
import { useEffect } from 'react'
import { useLocalStorage } from '@hooks/useLocalStorage'

export const useDarkMode = () => {
  // Use our useLocalStorage hook to persist state through a page refresh.
  const [enabled, setEnabled] = useLocalStorage('dark-mode-enabled')

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = 'dark-mode'
      const element = window.document.body
      if (enabled) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    },
    [enabled] // Only re-call effect when value changes
  )
  // Return enabled state and setter
  return [enabled, setEnabled]
}
