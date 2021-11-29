import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { a, useSpring, config } from 'react-spring'
import { Text } from '@components/Text'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { Arrow } from './components/Arrow'

const StyledExternalLink = styled(a.a)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 8px;
  padding: 0;
  transform-origin: 50% 50%;
  text-decoration: none;
  /* background-color: ${(p) => p.theme.color.link.fg}; */
`

const Content = styled(a(Text.Button))`
  pointer-events: none;
  /* padding: 8px 48px; */
  /* background-color: ${(p) => p.theme.color.link.bg}; */
  color: ${(p) => p.theme.color.link.fg};
  /* border: 3px solid ${(p) => p.theme.color.link.fg}; */
`

export const ExternalLink = ({
  isDancing = false,
  children,
  onClick,
  ...restProps
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isPushed, setIsPushed] = useState(false)
  const { infiniteSpring } = useInfiniteSpringContext()
  const p = infiniteSpring.time.to((t) => (t % 500) / 500)
  // const dampenSpring = isHovering ? 0.25 : 1

  const contentSpring = useSpring({
    config: { tension: 400 },
    y: isPushed ? 0 : isHovering ? -8 : -4,
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
    <StyledExternalLink
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        setIsPushed(true)
        if (typeof onClick === 'function') {
          setTimeout(onClick, 120)
        }
      }}
      target="_blank"
      {...restProps}
      // style={
      //   isDancing
      //     ? {
      //         y: p.to((p) => Math.sin(p * Math.PI * 4) * -8 * dampenSpring),
      //         rotate: p.to(
      //           (p) => Math.sin(p * Math.PI * 2) * -4 * dampenSpring
      //         ),
      //         scale: p.to(
      //           (p) => Math.sin(p * Math.PI * 4) * 0.0625 * dampenSpring + 1
      //         ),
      //       }
      //     : {}
      // }
    >
      <Content
      //  style={contentSpring}
      >
        {children}
      </Content>
      <Arrow
        style={useMemo(
          () =>
            isHovering
              ? {
                  x: p.to((p) => Math.sin(p * Math.PI * 2) * 4),
                }
              : undefined,
          [p, isHovering]
        )}
      />
    </StyledExternalLink>
  )
}
