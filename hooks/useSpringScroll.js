import window from 'handle-window-undefined'
import { useCallback } from 'react'
import { useSpring } from 'react-spring'
import { path, isNil } from 'ramda'

export const useSpringScroll = (scrollElement = window) => {
  const el = scrollElement
  const [, setScroll] = useSpring(
    useCallback(
      () => ({
        top: 0,
        immediate: true,
        config: {
          mass: 2,
          tension: 120,
          friction: 20,
        },
      }),
      []
    )
  )

  const scrollTo = useCallback(
    (to = 0) => {
      const currentTop =
        path(['pageYOffset'], el) || path(['scrollTop'], el) || 0

      return new Promise((resolve) => {
        let interruptedOrFinished = false

        const handleInterruptOrFinish = () => {
          if (interruptedOrFinished) {
            return
          }
          interruptedOrFinished = true
          el?.removeEventListener('wheel', handleInterruptOrFinish)
          el?.removeEventListener('touchmove', handleInterruptOrFinish)
          resolve()
        }

        // Stop spring scrolling if user tries to scroll
        el?.addEventListener('wheel', handleInterruptOrFinish)
        el?.addEventListener('touchmove', handleInterruptOrFinish)

        if (typeof to !== 'number' && to.getBoundingClientRect) {
          const elTop = !isNil(el.scrollY) ? el.scrollY : el.scrollTop || 0
          const toTop = to.getBoundingClientRect().top
          console.log(elTop, toTop)
          // to = elTop

          to = toTop + elTop
        }

        setScroll({
          immediate: false,
          reset: true,
          from: { top: currentTop },
          top: to,
          onChange: ({ value: { top } }) => {
            if (interruptedOrFinished) {
              return
            }
            if (el?.scrollTo) {
              el.scrollTo(0, top)
            } else {
              el.scrollTop = top
            }
          },
          onRest: handleInterruptOrFinish,
        })
      })
    },
    [setScroll]
  )

  return scrollTo
}
