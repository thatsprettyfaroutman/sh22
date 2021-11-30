import window from 'handle-window-undefined'
import debounce from 'lodash.debounce'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

const DEFAULT_OPTIONS = {
  scroll: false,
  debounceTime: 120,
}

export const useWindowResize = (onResize, optionsProp = {}) => {
  const { scroll, debounceTime } = {
    ...DEFAULT_OPTIONS,
    ...optionsProp,
  }

  useIsomorphicLayoutEffect(() => {
    if (typeof onResize !== 'function') {
      return
    }
    onResize()
    const debouncedOnResize = debounce(onResize, debounceTime)
    window.addEventListener('resize', debouncedOnResize)
    if (scroll) {
      window.addEventListener('scroll', debouncedOnResize)
    }
    return () => {
      window.removeEventListener('resize', debouncedOnResize)
      if (scroll) {
        window.removeEventListener('scroll', debouncedOnResize)
      }
    }
  }, [onResize, debounceTime, scroll])
}
