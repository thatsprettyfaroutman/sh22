import { useRef, useCallback, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { a } from 'react-spring'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import { isNil } from 'ramda'

import { media, scale } from '@styles/theme'
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

  ${({ $size: s, $overrideScale: os }) => {
    if (!s) {
      return
    }

    if (!isNil(os)) {
      return css`
        width: ${s.w * os}px;
        height: ${s.h * os}px;
      `
    }

    return css`
      width: ${s.w}px;
      height: ${s.h}px;
      ${media.tablet} {
        width: ${scale.tablet(s.w)}px;
        height: ${scale.tablet(s.h)}px;
      }
      ${media.phone} {
        width: ${scale.phone(s.w)}px;
        height: ${scale.phone(s.h)}px;
      }
    `
  }};

  ${({ $crop: c, $overrideScale: os }) => {
    if (!c) {
      return
    }

    if (!isNil(os)) {
      return css`
        > span > img,
        > svg {
          position: relative;
          top: ${c.y * os}px;
          left: ${c.x * os}px;
          width: ${c.w * os}px !important;
          height: ${c.h * os}px !important;
        }
      `
    }

    return css`
      > span > img,
      > svg {
        position: relative;
        top: ${c.y}px;
        left: ${c.x}px;
        width: ${c.w}px !important;
        height: ${c.h}px !important;
        ${media.tablet} {
          top: ${scale.tablet(c.y)}px;
          left: ${scale.tablet(c.x)}px;
          width: ${scale.tablet(c.w)}px !important;
          height: ${scale.tablet(c.h)}px !important;
        }
        ${media.phone} {
          top: ${scale.phone(c.y)}px;
          left: ${scale.phone(c.x)}px;
          width: ${scale.phone(c.w)}px !important;
          height: ${scale.phone(c.h)}px !important;
        }
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
  const [crop, setCrop] = useState(
    getLottieSize(animationData, overrideScale).crop
  )
  const [wrapperSize, setWrapperSize] = useState(
    getLottieSize(animationData, overrideScale).size
  )

  console.log(crop, wrapperSize)

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
      <LottieWrapper
        ref={lottieRef}
        $size={wrapperSize}
        $crop={crop}
        $overrideScale={overrideScale}
      >
        <noscript>
          <img
            src={require(`../../lotties/${animationData.nm}.svg`).default.src}
            alt={animationData.nm}
          />
        </noscript>
      </LottieWrapper>
    </StyledLottie>
  )
}
