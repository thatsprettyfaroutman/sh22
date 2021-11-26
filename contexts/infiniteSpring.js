import { useRef, useCallback, useState } from 'react'
import constate from 'constate'
import { useSpring } from 'react-spring'

const DURATION = 10000

const useInfiniteSpring = () => {
  const springListenersRef = useRef([])
  const [secondsPassed, setSecondsPassed] = useState(0)

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
  const infiniteSpring = useSpring({
    loop: true,
    config: { duration: DURATION },
    from: { time: 0 },
    time: DURATION,
    onChange: useCallback(({ value: { time } }) => {
      const currentSecond = time % 1000
      if (!secondsPassedLockRef.current && currentSecond < 500) {
        secondsPassedLockRef.current = true
        setSecondsPassed((c) => c + 1)
      } else if (secondsPassedLockRef.current && currentSecond > 500) {
        secondsPassedLockRef.current = false
      }
      for (let i = 0; i < springListenersRef.current.length; i++) {
        springListenersRef.current[i](time, DURATION)
      }
    }, []),
  })

  return { infiniteSpring, secondsPassed, addSpringListener }
}

const [provider, hook] = constate(useInfiniteSpring)

export const InfiniteSpringProvider = provider
export const useInfiniteSpringContext = hook