import { useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { a, useSpring, useTrail } from 'react-spring'
import { easeCubicOut } from 'd3-ease'
import lerp from 'lerp'
import { omit } from 'ramda'
import {
  useInfiniteSpringContext,
  START_BASS_BOOMING_AT_SECOND,
} from '@contexts/infiniteSpring'

import { media } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'
import { useSpringScroll } from '@hooks/useSpringScroll'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Lottie } from '@components/Lottie'

import porcuboi from '@lotties/porcuboi.lottie.json'
import duckyduck from '@lotties/duckyduck2.lottie.json'
import flowerboi from '@lotties/flowerboi.lottie.json'
import flowerboibg from '@lotties/flowerboibg.lottie.json'
import arrow from '@lotties/arrow2.lottie.json'

const getNoJsAnimationDelay = (() => {
  let delay = 1000
  return () => {
    delay += 240
    return `${delay}ms`
  }
})()

const StyledHero = styled(Section)`
  position: relative;
  display: grid;
  align-content: center;
  padding: 48px 0;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.hero.bg};
  color: ${(p) => p.theme.color.section.hero.fg};
`

const MainContent = styled.div`
  display: grid;
  grid-gap: 48px;
  justify-items: center;
  grid-template-areas:
    'flower'
    'title'
    'button'
    'arrow';

  ${media.phone} {
    grid-gap: 24px;
  }
`

const Flower = styled(a.div)`
  grid-area: flower;
  position: relative;
  margin-top: auto;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .Hero__Flowerboi {
    position: absolute;
    top: 0;
  }

  .no-js & {
    > .Hero__Flowerboibg,
    > .Hero__Flowerboi {
      ${NO_JS_ANIM.appearScale};
      animation-delay: ${getNoJsAnimationDelay()};
    }
    > .Hero__Flowerboibg {
      > * {
        ${NO_JS_ANIM.danceScale};
      }
    }

    > .Hero__Flowerboi {
      animation-delay: ${getNoJsAnimationDelay()};
      > * {
        ${NO_JS_ANIM.dance};
      }
    }
  }
`

const Dancers = styled(a.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  display: grid;
  grid-gap: 48px;
  grid-template-areas: 'dancerA  dancerB';
  justify-content: space-between;
  pointer-events: none;

  .no-js & {
    ${NO_JS_ANIM.appearSlow};
    animation-delay: 2s;
    > * {
      ${NO_JS_ANIM.dance};
    }
  }
`

const DancerA = styled(Lottie)`
  grid-area: dancerA;
  margin-top: auto;

  ${media.phone} {
    margin-left: -75px;
  }
`

const DancerB = styled(Lottie)`
  grid-area: dancerB;
  margin-top: auto;

  ${media.phone} {
    margin-right: -75px;
  }
`

const Title = styled(a(Text.Heading1))`
  grid-area: title;
  position: relative;
  text-align: center;
  max-width: 700px;
  padding: 0 48px;

  ${media.phone} {
    padding: 0 8px;
  }

  .no-js & {
    ${NO_JS_ANIM.appear};
    animation-delay: ${getNoJsAnimationDelay()};
  }
`

const ApplyButtonWrapper = styled(a.a)`
  grid-area: button;

  .no-js & {
    ${NO_JS_ANIM.appear};
    animation-delay: ${getNoJsAnimationDelay()};
    > :not(:hover) {
      ${NO_JS_ANIM.dance};
    }
  }
`

const Arrow = styled(a.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: arrow;
  opacity: 0;

  .no-js & {
    ${NO_JS_ANIM.appearBelow};
    animation-delay: 2s;
    animation-fill-mode: both;
    > * {
      ${NO_JS_ANIM.dance};
    }
  }
`

export const Hero = ({ section, ...restProps }) => {
  const scrollTo = useSpringScroll()
  const { secondsPassed, isBassBooming, isDancing } = useInfiniteSpringContext()
  const isDancersVisible = secondsPassed >= START_BASS_BOOMING_AT_SECOND

  const [trail, trailApi] = useTrail(
    4,
    useCallback(() => ({ p: 1 }), [])
  )
  useEffect(() => {
    trailApi.start({ from: { p: 0 }, p: 1 })
  }, [trailApi])

  const [dancersSpring, setDancersSpring] = useSpring(() => ({
    config: { duration: 5000, easing: easeCubicOut },
    y: 0,
    opacity: 1,
  }))
  useEffect(() => {
    setDancersSpring({
      reset: true,
      from: { y: 230, opacity: 0 },
      y: isDancersVisible ? 0 : 230,
      opacity: isDancersVisible ? 1 : 0,
    })
  }, [setDancersSpring, isDancersVisible])

  const [arrowSpring, setArrowSpring] = useSpring(() => ({
    config: { duration: 1000, easing: easeCubicOut },
    y: 0,
    // opacity: 1,
  }))
  useEffect(() => {
    setArrowSpring({
      opacity: 0,
      immediate: true,
    })
    const t = setTimeout(() => {
      setArrowSpring({
        reset: true,
        from: { y: 32, opacity: 0 },
        y: 0,
        opacity: 1,
        immediate: false,
      })
    }, 6000)
    return () => {
      clearTimeout(t)
    }
  }, [setArrowSpring])

  const flowerBgSpring = useMemo(() => ({ scale: trail[0].p }), [trail])
  const flowerboiSpring = useMemo(() => ({ scale: trail[1].p }), [trail])

  const titleSpring = useMemo(
    () => ({
      y: trail[2].p.to((p) => lerp(-32, 0, p)),
      opacity: trail[2].p,
    }),
    [trail]
  )

  const buttonSpring = useMemo(
    () => ({
      y: trail[3].p.to((p) => lerp(-32, 0, p)),
      opacity: trail[3].p,
    }),
    [trail]
  )

  const handelApplyButtonClick = useCallback(
    (e) => {
      e.preventDefault()
      const tracksSection = document.querySelector(
        '[data-section-link="tracks"]'
      )
      scrollTo(tracksSection)
    },
    [scrollTo]
  )

  return (
    <StyledHero {...restProps}>
      {/* <ColorTunnel /> */}
      {/* <FlyingThings /> */}

      <MainContent>
        <Flower>
          <Lottie
            animationData={flowerboibg}
            className="Hero__Flowerboibg"
            style={flowerBgSpring}
            animationStopped={!isBassBooming}
          />
          <Lottie
            animationData={flowerboi}
            className="Hero__Flowerboi"
            style={flowerboiSpring}
            animationStopped={!isDancing}
          />
        </Flower>
        <Title style={titleSpring}>{section.title}</Title>
        <ApplyButtonWrapper
          href="#tracks"
          onClick={handelApplyButtonClick}
          style={buttonSpring}
        >
          <Button isDancing>{section.button}</Button>
        </ApplyButtonWrapper>
        <Arrow style={arrowSpring} onClick={handelApplyButtonClick}>
          <Lottie
            animationData={arrow}
            animationStopped={!isDancersVisible}
            animationOffset={500}
          />
        </Arrow>
      </MainContent>
      <Dancers
        style={useMemo(() => omit(['opacity'], dancersSpring), [dancersSpring])}
      >
        <DancerA
          animationData={porcuboi}
          animationStopped={!isDancersVisible}
        />
        <DancerB
          animationData={duckyduck}
          animationStopped={!isDancersVisible}
        />
      </Dancers>
    </StyledHero>
  )
}
