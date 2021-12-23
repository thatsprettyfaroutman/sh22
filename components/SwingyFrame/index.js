import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInView } from 'react-intersection-observer'

import { media, scale } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { Bite } from '@components/Bite'
import { Lottie } from '@components/Lottie'

import swingygremlin from '@lotties/swingygremlin.lottie.json'

const WIDTH = 356
const HEIGHT = 434

const GREMLIN_WIDTH = swingygremlin.crop.w
const GREMLIN_WIDTH_HALF = GREMLIN_WIDTH * 0.5

const StyledSwingyFrame = styled(a.div)`
  position: relative;
  transform-origin: 50% 10px;
  pointer-events: none;
  padding-bottom: 180px;

  > img {
    display: block;
    margin: 0;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;

    ${media.tablet} {
      width: ${scale.tablet(WIDTH)}px;
      height: ${scale.tablet(HEIGHT)}px;
    }

    ${media.phone} {
      width: ${scale.phone(WIDTH)}px;
      height: ${scale.phone(HEIGHT)}px;
    }
  }

  > .Lottie {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -${GREMLIN_WIDTH_HALF}px;
    margin-bottom: 7px;

    ${media.tablet} {
      margin-left: -${scale.tablet(GREMLIN_WIDTH_HALF)}px;
      margin-bottom: 42px;
    }
    ${media.phone} {
      margin-left: -${scale.phone(GREMLIN_WIDTH_HALF)}px;
      margin-bottom: 77px;
    }
  }

  .no-js & {
    ${NO_JS_ANIM.swingyFrame};
  }
`

const BiteMarks = styled(Bite.A)`
  position: absolute;
  bottom: 300px;
  left: -23px;
  transform: rotate(-90deg);

  > path {
    fill: ${(p) => p.theme.color.section.alumni.bg};
  }

  ${media.tablet} {
    left: -25px;
  }
`

export const SwingyFrame = ({ ...restProps }) => {
  const { ref, inView } = useInView()
  const { infiniteSpring } = useInfiniteSpringContext()

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
      <img src="/images/miskaframeextreme.png" alt="" />
      <Lottie animationData={swingygremlin} animationOffset={1000} />
      <BiteMarks />
    </StyledSwingyFrame>
  )
}
