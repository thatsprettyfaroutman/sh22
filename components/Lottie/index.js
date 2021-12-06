import { useRef, useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { a } from 'react-spring'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'

import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'
import { useWindowResize } from '@hooks/useWindowResize'

import { getLottieSize } from './lib'
import { useStoredLottieAnimation } from './hooks/useStoredLottieAnimation'

export * from './lib'

const StyledLottie = styled(a.div)`
  position: relative;
  overflow: hidden;
`

const LottieWrapper = styled.div`
  > svg {
    display: block;
    margin: 0;
    pointer-events: none;
  }

  ${({ $size: s }) => {
    if (!s) {
      return
    }
    return css`
      width: ${s.w}px;
      height: ${s.h}px;
    `
  }};

  ${({ $crop: c }) => {
    if (!c) {
      return
    }
    return css`
      > svg {
        position: relative;
        top: ${c.y}px;
        left: ${c.x}px;
        width: ${c.w}px !important;
        height: ${c.h}px !important;
      }
    `
  }};
`

export const Lottie = ({
  animationData,
  animationOffset = 0,
  animationStopped = false,
  animationDurationScale = 1,
  overrideScale,
  onControlledAnimation,
  cropRect,
  ...restProps
}) => {
  const ref = useRef()
  const { ref: inViewRef, inView } = useInView()
  const { addSpringListener } = useInfiniteSpringContext()
  const [crop, setCrop] = useState(null)
  const [wrapperSize, setWrapperSize] = useState(null)
  const { ref: lottieRef, lottieAnimation } =
    useStoredLottieAnimation(animationData)

  useIsomorphicLayoutEffect(() => {
    const el = ref?.current
    if (!el || !lottieAnimation) {
      return
    }

    if (typeof onControlledAnimation === 'function') {
      // Animation is being controlled from outside
      onControlledAnimation(lottieAnimation)
      return () => {
        onControlledAnimation(null)
      }
    }

    if (animationStopped || !inView) {
      return
    }

    const animationDuration =
      lottieAnimation.getDuration() * 1000 * animationDurationScale

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
    lottieAnimation,
    animationOffset,
    onControlledAnimation,
    addSpringListener,
    animationStopped,
    animationDurationScale,
    inView,
  ])

  useWindowResize(
    useCallback(() => {
      try {
        const { size, crop } = getLottieSize(animationData, overrideScale)
        setWrapperSize(size)
        setCrop(crop)
      } catch (err) {
        console.error(err)
      }
    }, [animationData, overrideScale])
  )

  return (
    <StyledLottie
      {...restProps}
      ref={mergeRefs([ref, inViewRef])}
      className={`Lottie ${restProps.className || ''}`}
    >
      <LottieWrapper ref={lottieRef} $size={wrapperSize} $crop={crop} />
    </StyledLottie>
  )
}
