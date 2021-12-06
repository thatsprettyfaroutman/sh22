import window from 'handle-window-undefined'
import { useEffect } from 'react'
import { useLocalStorage } from '@hooks/useLocalStorage'

export const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-mode-enabled', false)

  useEffect(() => {
    const className = 'dark-mode'
    const element = window.document.body
    if (enabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [enabled])

  return [enabled, setEnabled]
}
