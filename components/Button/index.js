import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { a, useSpring } from 'react-spring'
import { useInView } from 'react-intersection-observer'

import { useDanceProgress } from '@hooks/useDanceProgress'
import { useSecondsPassedEffect } from '@hooks/useSecondsPassedEffect'
import { Text } from '@components/Text'

const Wrapper = styled(a.div)`
  display: block;
`

const StyledButton = styled(a.button)`
  padding: 0;
  border: none;
  transform-origin: 50% 50%;
  background-color: ${(p) => p.theme.color.button.fg};
`

const Content = styled(a(Text.Button))`
  pointer-events: none;
  padding: 8px 48px;
  background-color: ${(p) => p.theme.color.button.bg};
  color: ${(p) => p.theme.color.button.fg};
  border: 3px solid ${(p) => p.theme.color.button.fg};
`

export const Button = ({
  isDancing = false,
  children,
  onClick,
  ...restProps
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isDanceLocked, setIsDanceLocked] = useState(false)
  const [isPushed, setIsPushed] = useState(false)
  const { ref, inView } = useInView()
  const danceProgress = useDanceProgress({
    enabled: isDancing && inView && !isDanceLocked && !isPushed,
  })

  const contentSpring = useSpring({
    config: { tension: 400 },
    y: isPushed ? 0 : isHovering ? -8 : -4,
  })

  useEffect(() => {
    if (isHovering) {
      setIsDanceLocked(true)
    }
  }, [isHovering])

  // Release hover state when the time is right to prevent major glitching
  useSecondsPassedEffect(() => {
    if (!isDanceLocked || isHovering) {
      return
    }
    setIsDanceLocked(false)
  })

  // Release pushed state in 1s
  useEffect(() => {
    if (!isPushed) {
      return
    }
    const t = setTimeout(() => {
      setIsPushed(false)
    }, 1000)
    return () => clearTimeout(t)
  }, [isPushed])

  return (
    <Wrapper {...restProps}>
      <StyledButton
        ref={ref}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          setIsPushed(true)
          if (typeof onClick === 'function') {
            setTimeout(onClick, 120)
          }
        }}
        style={danceProgress && { y: danceProgress.to((p) => p * 8) }}
      >
        <Content style={contentSpring}>{children}</Content>
      </StyledButton>
    </Wrapper>
  )
}
