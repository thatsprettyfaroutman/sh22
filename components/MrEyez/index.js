import window from 'handle-window-undefined'
import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { easeCubicInOut } from 'd3-ease'
import { useSpring, useSprings, a } from 'react-spring'
import { useWindowResize } from '@hooks/useWindowResize'
import { Lottie } from '@components/Lottie'
import mreyez from '@lotties/mreyez.lottie.json'

const StyledMrEyez = styled.div`
  transform: rotate(-14deg);
`

export const MrEyez = ({ ...restProps }) => {
  const { ref, inView } = useInView()
  const [isHovering, setIsHovering] = useState(false)
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  const [irises, setIrises] = useState([])
  const lastPositionsRef = useRef([])

  useWindowResize(
    useCallback(() => {
      if (!lottieAnimation || !inView) {
        return
      }
      setIrises(
        [
          lottieAnimation.wrapper.querySelector(
            'g > g:nth-child(8) > g > path'
          ),
          lottieAnimation.wrapper.querySelector(
            'g > g:nth-child(3) > g > path'
          ),
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
    if (!lottieAnimation || isHovering || !irises.length || !inView) {
      setIsMoving(false)
      return
    }
    const mouseMove = ({ clientX, clientY }) => {
      const normalX = clientX + window.scrollX
      const normalY = clientY + window.scrollY
      irises.forEach(({ el, x, y }, i) => {
        if (!lastPositionsRef.current[i]) {
          lastPositionsRef.current[i] = { x: 0, y: 0 }
        }
        const pos = lastPositionsRef.current[i]
        const angle = Math.atan2(normalX - x, normalY - y)
        pos.x = Math.sin(angle) * 10
        pos.y = Math.cos(angle) * 10
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      })
      setIsMoving(true)
    }
    window.addEventListener('mousemove', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [lottieAnimation, irises, isHovering, inView])

  useSpring({
    config: { duration: 1000, easing: easeCubicInOut },
    from: { p: 0 },
    p: isHovering ? 1 : 0,
    onChange: useCallback(
      ({ value: { p } }) => {
        if (lottieAnimation) {
          lottieAnimation.goToAndStop(p * 1000)
        }
      },
      [lottieAnimation]
    ),
  })

  useSprings(
    irises.length,
    useMemo(
      () =>
        irises.map(({ el }, i) =>
          isHovering || !isMoving
            ? {
                reset: isHovering,
                from: { ...lastPositionsRef.current[i], p: 1 },
                x: 0,
                y: 0,
                p: 0,
                onChange: ({ value: { x, y } }) => {
                  el.style.transform = `translate3d(${x}px, ${y}px, 0)`
                },
              }
            : {
                reset: false,
                p: 1,
                onChange: ({ value: { p } }) => {
                  const pos = lastPositionsRef.current[i]
                  el.style.transform = `translate3d(${pos.x * p}px, ${
                    pos.y * p
                  }px, 0)`
                },
              }
        ),
      [irises, isHovering, isMoving]
    )
  )

  return (
    <StyledMrEyez
      ref={ref}
      {...restProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Lottie
        animationData={mreyez}
        onControlledAnimation={setLottieAnimation}
      />
    </StyledMrEyez>
  )
}
