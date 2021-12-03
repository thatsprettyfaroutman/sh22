import window from 'handle-window-undefined'
import { useRef, useCallback, useState } from 'react'
import lottie from 'lottie-web'
import styled, { css } from 'styled-components'
import { a } from 'react-spring'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'

import { BREAKPOINT, SCALE } from '@styles/theme'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'
import { useWindowResize } from '@hooks/useWindowResize'

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

export const getLottieSize = (animationData) => {
  if (!animationData) {
    throw new Error('getLottieSize, `animationData` not defined')
  }
  const { w, h, crop } = animationData
  if (!crop) {
    throw new Error(
      'getLottieSize, `animationData.crop` not defined. { x: number, y: number, w: number, height: number } expected'
    )
  }

  const scale =
    window.innerWidth <= BREAKPOINT.phone
      ? SCALE.phone
      : window.innerWidth <= BREAKPOINT.tablet
      ? SCALE.tablet
      : 1

  return {
    scale,
    size: {
      w: crop.w * scale,
      h: crop.h * scale,
    },
    crop: {
      x: scale * -crop.x,
      y: scale * -crop.y,
      w: scale * w,
      h: scale * h,
    },
  }
}

export const Lottie = ({
  animationData,
  animationOffset = 0,
  animationStopped = false,
  animationDurationScale = 1,
  onControlledAnimation,
  cropRect,
  ...restProps
}) => {
  const ref = useRef()
  const { ref: inViewRef, inView } = useInView()
  const wrapperRef = useRef()
  const { addSpringListener } = useInfiniteSpringContext()
  const [crop, setCrop] = useState(null)
  const [wrapperSize, setWrapperSize] = useState(null)
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
        container: wrapperRef.current,
        renderer: 'svg',
        autoplay: false,
      })
    lottieAnimationRef.current = lottieAnimation

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
    animationData,
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
        const { size, crop } = getLottieSize(animationData)
        setWrapperSize(size)
        setCrop(crop)
      } catch (err) {
        console.error(err)
      }
    }, [animationData])
  )

  return (
    <StyledLottie
      {...restProps}
      ref={mergeRefs([ref, inViewRef])}
      className={`Lottie ${restProps.className || ''}`}
    >
      <LottieWrapper ref={wrapperRef} $size={wrapperSize} $crop={crop} />
    </StyledLottie>
  )
}
