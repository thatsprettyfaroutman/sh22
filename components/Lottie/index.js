import { useRef } from 'react'
import lottie from 'lottie-web'
import styled from 'styled-components'
import { a } from 'react-spring'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'

const SLottie = styled.div``

const ALottie = a(SLottie)

export const Lottie = ({
  animationData,
  animationOffset = 0,
  animationStopped = false,
  animationDurationScale = 1,
  ...restProps
}) => {
  const { ref: inViewRef, inView } = useInView()
  const ref = useRef()
  const { addSpringListener } = useInfiniteSpringContext()

  const lottieAnimationRef = useRef()

  useIsomorphicLayoutEffect(() => {
    const el = ref?.current
    if (!el || !animationData) {
      return
    }

    const lottieAnimation =
      lottieAnimationRef.current ||
      lottie.loadAnimation({
        animationData,
        container: ref.current,
        renderer: 'svg',
        autoplay: false,
      })
    lottieAnimationRef.current = lottieAnimation

    if (animationStopped || !inView) {
      return
    }

    const animationDuration =
      (lottieAnimation.totalFrames / lottieAnimation.frameRate) *
      1000 *
      animationDurationScale

    const listen = (time) => {
      const oTime = time + animationOffset
      const mTime = oTime % animationDuration
      lottieAnimation.goToAndStop(mTime / animationDurationScale)
    }

    const unlisten = addSpringListener(listen)

    return () => {
      unlisten()
    }
  }, [
    animationData,
    animationOffset,
    addSpringListener,
    animationStopped,
    animationDurationScale,
    inView,
  ])

  return (
    <ALottie
      {...restProps}
      ref={mergeRefs([ref, inViewRef])}
      className={`Lottie ${restProps.className || ''}`}
    />
  )
}
