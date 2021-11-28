import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { a, useSpring, config } from 'react-spring'
import { Text } from '@components/Text'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

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
  const [isPushed, setIsPushed] = useState(false)
  const { infiniteSpring } = useInfiniteSpringContext()
  // const p = infiniteSpring.time.to((t) => (t % 1000) / 1000)
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
    <StyledButton
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        setIsPushed(true)
        if (typeof onClick === 'function') {
          setTimeout(onClick, 120)
        }
      }}
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
      <Content style={contentSpring}>{children}</Content>
    </StyledButton>
  )
}
