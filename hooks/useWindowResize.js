import debounce from 'lodash.debounce'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useWindowResize = (onResize) => {
  useIsomorphicLayoutEffect(() => {
    if (typeof onResize !== 'function') {
      return
    }
    onResize()
    const debouncedOnResize = debounce(onResize, 120)
    window.addEventListener('resize', debouncedOnResize)
    return () => {
      window.removeEventListener('resize', debouncedOnResize)
    }
  }, [onResize])
}
