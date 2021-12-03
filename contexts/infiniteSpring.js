import { useRef, useCallback, useState, useMemo } from 'react'
import constate from 'constate'
import { useSpring } from 'react-spring'
import { useFreezeValueUnless } from '@hooks/useFreezeValue'

const ONE_SECOND = 1000
const HALF_SECOND = ONE_SECOND * 0.5
const DURATION = 10 * ONE_SECOND
export const START_BASS_BOOMING_AT_SECOND = 3
export const START_DANCING_AT_SECOND = 4

const useInfiniteSpring = () => {
  const springListenersRef = useRef([])
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [timeScale, setTimeScale] = useState(1)

  const addSpringListener = useCallback((fn) => {
    springListenersRef.current.push(fn)
    const remove = () => {
      springListenersRef.current = springListenersRef.current.filter(
        (x) => x !== fn
      )
    }
    return remove
  }, [])

  const secondsPassedLockRef = useRef(false)

  const handleChange = useCallback(({ value: { time } }) => {
    const currentSecond = time % ONE_SECOND
    if (!secondsPassedLockRef.current && currentSecond < HALF_SECOND) {
      secondsPassedLockRef.current = true
      setSecondsPassed((c) => c + 1)
    } else if (secondsPassedLockRef.current && currentSecond > HALF_SECOND) {
      secondsPassedLockRef.current = false
    }
    for (let i = 0; i < springListenersRef.current.length; i++) {
      springListenersRef.current[i](time, DURATION)
    }
  }, [])

  const infiniteSpring = useSpring({
    loop: true,
    config: { duration: DURATION * timeScale },
    from: { time: 0 },
    time: DURATION,
    onChange: handleChange,
  })

  const lastTimeScaleRef = useRef(timeScale)
  const freezedInfiniteSpring = useFreezeValueUnless(
    infiniteSpring,
    useCallback(
      (a, b) => {
        const timeScaleChanged = lastTimeScaleRef.current !== timeScale
        if (timeScaleChanged) {
          lastTimeScaleRef.current = timeScale
          return true
        }
        return false
      },
      [timeScale]
    )
  )

  const isBassBooming = useMemo(
    () => secondsPassed >= START_BASS_BOOMING_AT_SECOND,
    [secondsPassed]
  )
  const isDancing = useMemo(
    () => secondsPassed >= START_DANCING_AT_SECOND,
    [secondsPassed]
  )

  return {
    infiniteSpring: freezedInfiniteSpring,
    secondsPassed,
    addSpringListener,
    isBassBooming,
    isDancing,
    setTimeScale,
  }
}

const [provider, useInfiniteSpringContext] = constate(useInfiniteSpring)

export const InfiniteSpringProvider = provider
export { useInfiniteSpringContext }
