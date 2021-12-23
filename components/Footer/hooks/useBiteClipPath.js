import { useMemo, useRef } from 'react'
import { range } from 'ramda'

import { event } from '@util/ga'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { getBitePathA, getBitePathB, rand, getBites } from '../lib'

// Rand to make bites randomized, but so same coordinates has the same bite
const getBitePathFn = (i = 0) => (rand(i) < 0.5 ? getBitePathA : getBitePathB)

export const useBiteClipPath = (getBiteProps, isEnabled = true) => {
  const { secondsPassed } = useInfiniteSpringContext()
  const bites = getBites(secondsPassed)
  const footerEatenProgress = useRef({
    0: { reached: false },
    1: { reached: false },
    5: { reached: false },
    25: { reached: false },
    50: { reached: false },
    75: { reached: false },
    98: { reached: false },
  })

  return useMemo(() => {
    const biteProps = getBiteProps(bites)
    if (!biteProps || !biteProps.isBitingStarted || !isEnabled) {
      return
    }

    const {
      bitesPerRow,
      biteWidth,
      biteHeight,
      maxBites,
      x,
      y,
      width,
      height,
      pathX,
      pathY,
      actualBites,
    } = biteProps

    const biteProgress = actualBites / maxBites

    Object.entries(footerEatenProgress.current).forEach(([p, val]) => {
      if (val.reached) {
        return
      }
      const threshold = Number(p) / 100
      if (threshold <= biteProgress) {
        val.reached = true
        event('footer_eaten_progress', { value: Number(p) })
      }
    })

    if (actualBites >= maxBites) {
      // Hide all!
      return `path("M -1 -1, L 0 0")`
    }

    const dirLeft = y % 2 === 0

    const coords = dirLeft
      ? [
          // Move to current row
          `M -1 ${pathY(y)}`,

          // Generate previous row bites
          ...(y === 0
            ? [`L ${pathX(x)} ${pathY(y)}`]
            : range(0, bitesPerRow - x).map((i) => {
                const nx = bitesPerRow - i
                const ny = y - 1
                const biteId = nx + ny
                const d = getBitePathFn(biteId)
                return d(pathX(nx, true), pathY(ny), biteWidth, biteHeight)
              })),

          // Generate current row bites
          ...range(0, x).map((i) => {
            const nx = x - i
            const ny = y
            const biteId = nx + ny
            const d = getBitePathFn(biteId)
            return d(pathX(nx, true), pathY(ny), biteWidth, biteHeight)
          }),

          // Include rest of the footer/area
          `L ${width + 1} ${height + 1}`,
          `L -1 ${height + 1}`,

          // Close loop
          'Z',
        ]
      : [
          // Move to current row
          `M -1 ${pathY(y)}`,

          // Generate current row bites
          ...range(0, x).map((i) => {
            const nx = i
            const ny = y
            const biteId = bitesPerRow - nx + ny
            const d = getBitePathFn(biteId)
            return d(pathX(nx, false), pathY(ny), biteWidth, biteHeight)
          }),

          // Generate previous row bites
          ...(y === 0
            ? [`L ${pathX(x, false)} ${pathY(y - 1)}`]
            : range(0, bitesPerRow - x).map((i) => {
                const nx = x + i
                const ny = y - 1
                const biteId = bitesPerRow - nx + ny
                const d = getBitePathFn(biteId)
                return d(pathX(nx, false), pathY(ny), biteWidth, biteHeight)
              })),

          // Include rest of the footer/area
          `L ${width + 1} ${height + 1}`,
          `L -1 ${height + 1}`,

          // Close loop
          'Z',
        ]

    return `path("${coords.join(' ')}")`
  }, [bites, getBiteProps, isEnabled])
}
