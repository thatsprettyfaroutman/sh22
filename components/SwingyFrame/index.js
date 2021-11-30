import { useMemo } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { Bite } from '@components/Bite'
import { Lottie } from '@components/Lottie'

import swingygremlin from '@lotties/swingygremlin.lottie.json'

const StyledSwingyFrame = styled(a.div)`
  position: relative;
  transform-origin: 50% 10px;
  pointer-events: none;
  padding-bottom: 180px;

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

  > .Lottie {
    position: absolute;
    bottom: 8px;
    left: 50%;
    margin-left: -137.5px;

    @media (max-width: 768px) {
      bottom: 42px;
      margin-left: -110px;
    }
  }
`

const BiteMarks = styled(Bite.A)`
  position: absolute;
  bottom: 300px;
  left: -22px;
  transform: rotate(-90deg);

  > path {
    fill: ${(p) => p.theme.color.section.alumni.bg};
  }

  @media (max-width: 768px) {
    left: -24px;
  }
`

export const SwingyFrame = ({ ...restProps }) => {
  const { ref, inView } = useInView()
  const { infiniteSpring, secondsPassed } = useInfiniteSpringContext()

  const p = useMemo(
    () =>
      inView
        ? infiniteSpring.time.to((t) => ((t - 100) % 2000) / 2000)
        : undefined,
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
      <Lottie animationData={swingygremlin} animationOffset={1000} />
      <BiteMarks />
    </StyledSwingyFrame>
  )
}
