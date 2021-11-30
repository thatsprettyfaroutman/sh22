import window from 'handle-window-undefined'
import { useMemo, useRef } from 'react'
import { useSpring } from 'react-spring'
import { easeCubicInOut } from 'd3-ease'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { getLottieSize } from '@components/Lottie'
import { getBites } from '../lib'
import { SECONDS_PER_BITE } from '../consts'

export const useYetiBeaverSpring = (getBiteProps, animationData) => {
  const { secondsPassed } = useInfiniteSpringContext()
  const lastStyleRef = useRef({
    x: window.innerWidth,
    y: (animationData?.crop?.h || 0) / 2,
  })
  const isDoneEatingRef = useRef(false)

  const [style, isDoneEating] = useMemo(() => {
    const bites = getBites(secondsPassed)
    const biteSecond = secondsPassed % SECONDS_PER_BITE
    const bite =
      biteSecond === 0 ? getBiteProps(bites - 1) : getBiteProps(bites)

    const { size: beaverSize } = getLottieSize(animationData)

    if (!bite || !bite.isBitingStarted) {
      return [lastStyleRef.current, isDoneEatingRef.current]
    }

    if (bites >= bite.maxBites) {
      if (isDoneEatingRef.current || biteSecond === 3) {
        isDoneEatingRef.current = true
        const style = {
          x: (bite.width - beaverSize.w) * 0.5,
          y: bite.height + beaverSize.h,
        }
        lastStyleRef.current = style
        return [style, isDoneEatingRef.current]
      }
    }

    isDoneEatingRef.current = false

    const { pathX, pathY, x, y, biteWidth, height } = bite
    const dirLeft = y % 2 === 0
    const bx = dirLeft
      ? pathX(x, true) - (biteWidth + beaverSize.w) * 0.5
      : pathX(x, false) + (biteWidth - beaverSize.w) * 0.5

    const by = Math.min(pathY(y), height) + beaverSize.h
    const style = { x: bx, y: by }

    lastStyleRef.current = style
    return [style, isDoneEatingRef.current]
  }, [secondsPassed, getBiteProps, animationData])

  const spring = useSpring({
    config: { duration: 1500, easing: easeCubicInOut },
    ...style,
  })

  return { spring, isDoneEating }
}
