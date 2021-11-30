import window from 'handle-window-undefined'
import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { easeCubicInOut } from 'd3-ease'
import { useSpring, a } from 'react-spring'
import { Lottie, getLottieSize } from '@components/Lottie'
import mreyez from '@lotties/mreyez.lottie.json'

const StyledMrEyez = styled.div`
  /* border: 1px solid #f0f; */
`

export const MrEyez = ({ ...restProps }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [lottieAnimation, setLottieAnimation] = useState(null)
  const lastPositionsRef = useRef([])

  const irises = useMemo(() => {
    if (!lottieAnimation) {
      return []
    }
    return [
      lottieAnimation.wrapper.querySelector('g > g:nth-child(8) > g > path'),
      lottieAnimation.wrapper.querySelector('g > g:nth-child(3) > g > path'),
    ]
      .filter(Boolean)
      .map((el) => {
        const rect = el.getBoundingClientRect()
        return { el, x: rect.x + window.scrollX, y: rect.y + window.scrollY }
      })
  }, [lottieAnimation])

  useEffect(() => {
    console.log(lottieAnimation)
    if (!lottieAnimation) {
      return
    }
    const mouseMove = ({ clientX, clientY }) => {
      const normalX = clientX + window.scrollX
      const normalY = clientY + window.scrollY
      irises.forEach(({ el, x, y }, i) => {
        const angle = Math.atan2(normalX - x, normalY - y)
        const toX = Math.sin(angle) * 10
        const toY = Math.cos(angle) * 10
        lastPositionsRef.current[i] = { x: toX, y: toY }
        el.style.transform = `translate3d(${toX}px, ${toY}px, 0)`
      })
    }

    window.addEventListener('mousemove', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [lottieAnimation, irises])

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

  return (
    <StyledMrEyez
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
