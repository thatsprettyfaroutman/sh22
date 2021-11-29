import { useRef, useMemo, useState } from 'react'
import lottie from 'lottie-web'
import styled, { css } from 'styled-components'
import { a } from 'react-spring'
import debounce from 'lodash.debounce'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'

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
    addSpringListener,
    animationStopped,
    animationDurationScale,
    inView,
  ])

  useIsomorphicLayoutEffect(() => {
    const resize = () => {
      const el = ref.current
      if (!el) {
        return
      }

      const { clientWidth } = el
      const { w, h, crop } = animationData
      if (!crop) {
        // let scale = clientWidth / w
        // if (window.innerWidth < 768) {
        //   scale *= 0.5
        // }
        // setWrapperSize({
        //   w: w * scale,
        //   h: h * scale,
        // })
        return
      }
      const scale = Math.min(1, clientWidth / crop.w)
      // console.log(scale)
      // if (window.innerWidth < 768) {
      //   scale *= 0.75
      // }
      // console.log('->', scale)

      setWrapperSize({
        w: crop.w * scale,
        h: crop.h * scale,
      })

      setCrop({
        x: scale * -crop.x,
        y: scale * -crop.y,
        w: scale * w,
        h: scale * h,
      })
    }
    resize()
    const debouncedResize = debounce(resize, 120)
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
    }
  }, [animationData])

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
