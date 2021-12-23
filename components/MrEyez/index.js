import window from 'handle-window-undefined'
import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import mergeRefs from 'react-merge-refs'
import lerp from 'lerp'
import { useInView } from 'react-intersection-observer'
import { easeCubicInOut } from 'd3-ease'
import { useSpring } from 'react-spring'

import { useWindowResize } from '@hooks/useWindowResize'
import { Lottie } from '@components/Lottie'

import mreyez from '@lotties/mreyez.lottie.json'

const StyledMrEyez = styled.div`
  transform: rotate3d(0, 0, 1, -14deg);
`

export const MrEyez = ({ ...restProps }) => {
  const ref = useRef()
  const { ref: inViewRef, inView } = useInView()
  const [isHovering, setIsHovering] = useState(false)
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const [pupils, setPupils] = useState([])
  const lastPositionsRef = useRef([])

  useWindowResize(
    useCallback(() => {
      const el = ref.current
      if (!lottieAnimation || !inView || !el) {
        return
      }
      setPupils(
        [
          el.querySelector('g > g:nth-child(8) > g > path'),
          el.querySelector('g > g:nth-child(3) > g > path'),
        ]
          .filter(Boolean)
          .map((el) => {
            const rect = el.getBoundingClientRect()
            return {
              el,
              x: rect.x + window.scrollX,
              y: rect.y + window.scrollY,
            }
          })
      )
    }, [lottieAnimation, inView]),
    { scroll: true }
  )

  useEffect(() => {
    if (!lottieAnimation || isHovering || !pupils.length || !inView) {
      return
    }

    pupils.forEach((_, i) => {
      if (!lastPositionsRef.current[i]) {
        lastPositionsRef.current[i] = { x: 0, y: 0 }
      }
    })

    const mouseMove = (e) => {
      for (let i = 0; i < pupils.length; i++) {
        // If using touch device and there are multiple touches, make eyes look at different touches!
        const clientX =
          e.touches?.[i]?.clientX || e.touches?.[0]?.clientX || e.clientX
        const clientY =
          e.touches?.[i]?.clientY || e.touches?.[0]?.clientY || e.clientY

        const normalX = clientX + window.scrollX
        const normalY = clientY + window.scrollY

        const { el, x, y } = pupils[i]
        const pos = lastPositionsRef.current[i]
        const angle = Math.atan2(normalX - x, normalY - y)
        pos.x = Math.sin(angle) * 10
        pos.y = Math.cos(angle) * 10
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
    }
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('touchstart', mouseMove)
    window.addEventListener('touchmove', mouseMove)
    window.addEventListener('touchend', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('touchstart', mouseMove)
      window.removeEventListener('touchmove', mouseMove)
      window.removeEventListener('touchend', mouseMove)
    }
  }, [lottieAnimation, pupils, isHovering, inView])

  useSpring(
    useMemo(
      () => ({
        config: { duration: 1000, easing: easeCubicInOut },
        from: { hoverP: 0 },
        hoverP: isHovering ? 1 : 0,
        onChange: ({ value: { hoverP } }) => {
          if (lottieAnimation) {
            lottieAnimation.goToAndStop(hoverP * 1000)
          }
          for (let i = 0; i < pupils.length; i++) {
            const { el } = pupils[i]
            const { x, y } = lastPositionsRef.current[i]
            const nx = lerp(x, 0, hoverP)
            const ny = lerp(y, 0, hoverP)
            el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
          }
        },
      }),
      [lottieAnimation, pupils, isHovering]
    )
  )

  return (
    <StyledMrEyez
      ref={mergeRefs([ref, inViewRef])}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...restProps}
    >
      <Lottie
        animationData={mreyez}
        onControlledAnimation={setLottieAnimation}
      />
    </StyledMrEyez>
  )
}
