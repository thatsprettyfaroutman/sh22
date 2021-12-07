import { useRef, useCallback, useState } from 'react'
import lottie from 'lottie-web'

import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'

const LOTTIE_STORE_ID = 'lottie-store'
const LOTTIE_ANIMATION_STORE = {}

const getStoreDiv = (id = LOTTIE_STORE_ID) => {
  let div = document.getElementById(id)
  if (!div) {
    div = document.createElement('div')
    div.id = id
    div.style.display = 'none'
    div.style.position = 'absolute'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.width = '120px'
    div.style.opacity = '0.2'
    div.style.pointerEvents = 'none'
    document.body.appendChild(div)
  }
  return div
}

export const useStoredLottieAnimation = (animationData) => {
  // Generate random enough id for storing purposes so
  // the lotties dont break on navigation
  const animationId = useRef(
    `${LOTTIE_STORE_ID}-${animationData.nm}-${animationData.layers
      .map((x) => x.nm.charAt(0))
      .join('')}`
  )

  const ref = useRef()
  const lottieAnimationRef = useRef()
  const [inittedLottieAnimation, setInittedLottieAnimation] = useState()

  const storeLottieAnimation = useCallback(() => {
    if (!inittedLottieAnimation) {
      return
    }
    const lottieStoreDiv = getStoreDiv()
    if (!lottieStoreDiv) {
      return
    }
    const lottieElement = ref.current?.querySelector('svg')
    if (!lottieElement) {
      return
    }
    lottieElement.setAttribute('data-lottie-id', animationId.current)
    LOTTIE_ANIMATION_STORE[animationId.current] = inittedLottieAnimation
    lottieStoreDiv.appendChild(lottieElement)
  }, [inittedLottieAnimation])

  const getStoredLottieAnimation = useCallback(() => {
    const lottieStoreDiv = getStoreDiv()
    if (!lottieStoreDiv) {
      return
    }

    const lottieWrapper = ref.current
    if (!lottieWrapper) {
      return
    }

    const lottieAnimation = LOTTIE_ANIMATION_STORE[animationId.current]
    if (!lottieAnimation) {
      return
    }

    const lottieElement = lottieStoreDiv.querySelector(
      `[data-lottie-id="${animationId.current}"`
    )
    if (!lottieElement) {
      return
    }
    lottieWrapper.appendChild(lottieElement)
    return lottieAnimation
  }, [])

  useIsomorphicLayoutEffect(() => {
    const lottieWrapper = ref.current
    if (!lottieWrapper || !animationData) {
      return
    }
    const lottieAnimation =
      // Check if animation was initted on previous view
      getStoredLottieAnimation() ||
      // Check if animation stored locally
      lottieAnimationRef.current ||
      // Finally init a new animation when no instances found
      lottie.loadAnimation({
        animationData,
        container: lottieWrapper,
        renderer: 'svg',
        autoplay: false,
      })

    // Store instance locally
    lottieAnimationRef.current = lottieAnimation

    // Init done
    setInittedLottieAnimation(lottieAnimation)
  }, [getStoredLottieAnimation, animationData])

  useIsomorphicLayoutEffect(() => {
    return () => {
      // Store animation for future
      storeLottieAnimation()
    }
  }, [storeLottieAnimation])

  return {
    ref,
    lottieAnimation: inittedLottieAnimation,
  }
}
