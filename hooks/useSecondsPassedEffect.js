import { useEffect } from 'react'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

export const useSecondsPassedEffect = (callbackFn) => {
  const { secondsPassed } = useInfiniteSpringContext()

  useEffect(() => {
    if (typeof callbackFn === 'function') {
      callbackFn(secondsPassed)
    }
  }, [secondsPassed])
}
