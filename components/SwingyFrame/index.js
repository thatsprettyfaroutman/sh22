import { useMemo } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { Bite } from '@components/Bite'

const StyledSwingyFrame = styled(a.div)`
  position: relative;
  transform-origin: 50% 10px;
  pointer-events: none;

  > img {
    display: block;
    margin: 0;
    width: 356px;
    height: 434px;

    @media (max-width: 768px) {
      width: ${356 * 0.8}px;
      height: ${434 * 0.8}px;
    }
  }

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

const BiteMarks = styled(Bite.A)`
  position: absolute;
  bottom: 100px;
  left: -22px;
  transform: rotate(-90deg);

  > path {
    fill: ${(p) => p.theme.color.section.alumni.bg};
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
      <img src="/images/julesframe.png" alt="Jules" />
      <div>{secondsPassed % 2}</div>
      <BiteMarks />
    </StyledSwingyFrame>
  )
}
