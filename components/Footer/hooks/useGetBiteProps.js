import { useCallback } from 'react'
import useMeasure from 'react-use-measure'
import { multiply } from 'ramda'
import { BITE_WIDTH, BITE_HEIGHT } from '../consts'
import { getBites } from '../lib'

export const useGetBiteProps = (bitingStartedAtSecond = -1) => {
  const [ref, bounds] = useMeasure({
    debounce: 120,
  })

  const getBiteProps = useCallback(
    (bites) => {
      if (!bounds.width) {
        return
      }

      const actualBites = Math.max(0, bites - getBites(bitingStartedAtSecond))

      const bitesPerRowDirty = bounds.width / BITE_WIDTH
      const bitesPerRow = Math.floor(bitesPerRowDirty)
      const leftoverBites = bitesPerRowDirty % bitesPerRow

      const biteWidth = BITE_WIDTH + BITE_WIDTH * (leftoverBites / bitesPerRow)
      const bitesPerColumn = Math.ceil(bounds.height / BITE_HEIGHT)
      const maxBites = bitesPerRow * (bitesPerColumn + 1)

      const pathX = (x, dirLeft = true) => {
        if (dirLeft) {
          return bounds.width - x * biteWidth
        }
        return x * biteWidth
      }
      const pathY = multiply(BITE_HEIGHT)

      const x = actualBites % bitesPerRow
      const y = Math.floor(actualBites / bitesPerRow)

      return {
        pathX,
        pathY,
        x,
        y,
        maxBites,
        biteWidth,
        biteHeight: BITE_HEIGHT,
        bitesPerColumn,
        bitesPerRow,
        bitesPerRowDirty,
        leftoverBites,
        width: bounds.width,
        height: bounds.height,
        actualBites,
        isBitingStarted: bitingStartedAtSecond !== -1,
      }
    },
    [bounds, bitingStartedAtSecond]
  )

  return [ref, getBiteProps]
}
