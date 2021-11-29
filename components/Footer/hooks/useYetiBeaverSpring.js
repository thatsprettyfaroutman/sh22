import window from 'handle-window-undefined'
import { useMemo, useRef, useState } from 'react'
import { useSpring } from 'react-spring'
import { easeCubicInOut } from 'd3-ease'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { getBites } from '../lib'
import {
  SECONDS_PER_BITE,
  YETIBEAVER_OVERFLOW_AREA,
  YETIBEAVER_WIDTH,
} from '../consts'

export const useYetiBeaverSpring = (getBiteProps) => {
  const { secondsPassed } = useInfiniteSpringContext()
  const lastStyleRef = useRef({
    x: window.innerWidth,
    y: YETIBEAVER_OVERFLOW_AREA / 2,
  })
  const isDoneEatingRef = useRef(false)

  const [style, isDoneEating] = useMemo(() => {
    const bites = getBites(secondsPassed)
    const biteSecond = secondsPassed % SECONDS_PER_BITE
    const bite =
      biteSecond === 0 ? getBiteProps(bites - 1) : getBiteProps(bites)

    if (!bite || !bite.isBitingStarted) {
      return [lastStyleRef.current, isDoneEatingRef.current]
    }

    if (bites >= bite.maxBites) {
      if (isDoneEatingRef.current || biteSecond === 3) {
        isDoneEatingRef.current = true
        const style = {
          x: (bite.width - YETIBEAVER_WIDTH) * 0.5,
          y: bite.height + YETIBEAVER_OVERFLOW_AREA,
        }
        lastStyleRef.current = style
        return [style, isDoneEatingRef.current]
      }
    }

    isDoneEatingRef.current = false

    const { pathX, pathY, x, y, biteWidth, height } = bite
    const dirLeft = y % 2 === 0
    const bx = dirLeft
      ? pathX(x, true) - (biteWidth + YETIBEAVER_WIDTH) * 0.5
      : pathX(x, false) + (biteWidth - YETIBEAVER_WIDTH) * 0.5

    const by = Math.min(pathY(y), height) + YETIBEAVER_OVERFLOW_AREA
    const style = { x: bx, y: by }

    lastStyleRef.current = style
    return [style, isDoneEatingRef.current]
  }, [secondsPassed, getBiteProps])

  const spring = useSpring({
    config: { duration: 1500, easing: easeCubicInOut },
    ...style,
  })

  return { spring, isDoneEating }
}
