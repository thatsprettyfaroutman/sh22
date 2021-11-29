import { useMemo } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

const StyledSwingyFrame = styled(a.div)`
  transform-origin: 50% 10px;

  > div {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 110px;
    height: 160px;
    margin-left: -55px;
    margin-top: -20px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #f0f;
    color: #fff;
    font-size: 300%;
  }
`

export const SwingyFrame = ({ ...restProps }) => {
  const { ref, inView } = useInView()
  const { infiniteSpring, secondsPassed } = useInfiniteSpringContext()

  const p = useMemo(
    () =>
      inView ? infiniteSpring.time.to((t) => (t % 2000) / 2000) : undefined,
    [infiniteSpring, inView]
  )

  return (
    <StyledSwingyFrame
      ref={ref}
      {...restProps}
      style={
        p && {
          rotate: p.to((p) => Math.sin(p * Math.PI * 2) * 20),
        }
      }
    >
      <img src="/images/julesframe.svg" alt="Jules" />
      <div>{secondsPassed % 2}</div>
    </StyledSwingyFrame>
  )
}
