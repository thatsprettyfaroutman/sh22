import { useMemo } from 'react'
import { easeSinInOut } from 'd3-ease'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

export const useDanceProgress = (props) => {
  const { enabled, duration } = {
    duration: 1000,
    enabled: true,
    ...props,
  }
  const { infiniteSpring, isDancing } = useInfiniteSpringContext()

  const danceProgress = useMemo(
    () =>
      enabled && isDancing
        ? infiniteSpring.time.to((t) => {
            const p = (t % duration) / duration
            return easeSinInOut(Math.abs(Math.sin(p * Math.PI * 3)))
          })
        : undefined,
    [infiniteSpring, duration, enabled, isDancing]
  )

  return danceProgress
}
