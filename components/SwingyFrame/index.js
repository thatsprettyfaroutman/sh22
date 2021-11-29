import { useMemo } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

const StyledSwingyFrame = styled(a.div)`
  transform-origin: 50% 10px;

  ::after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 110px;
    height: 160px;
    margin-left: -55px;
    margin-top: -20px;
    background-color: #f0f;
  }
`

export const SwingyFrame = ({ ...restProps }) => {
  const { infiniteSpring } = useInfiniteSpringContext()

  const p = useMemo(
    () => infiniteSpring.time.to((t) => (t % 2000) / 2000),
    [infiniteSpring]
  )

  return (
    <StyledSwingyFrame
      style={{
        rotate: p.to((p) => Math.sin(p * Math.PI * 2) * 20),
      }}
    >
      <img src="/images/julesframe.svg" alt="Jules" />
    </StyledSwingyFrame>
  )
}
