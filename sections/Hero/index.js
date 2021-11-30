import { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { a, useSpring, useTrail } from 'react-spring'
import { easeCubicOut } from 'd3-ease'
import lerp from 'lerp'
import { omit } from 'ramda'
import {
  useInfiniteSpringContext,
  START_BASS_BOOMING_AT_SECOND,
} from '@contexts/infiniteSpring'
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

const StyledHero = styled(Section)`
  position: relative;
  display: grid;
  align-content: center;
  padding: 48px;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.hero.bg};
  color: ${(p) => p.theme.color.section.hero.fg};

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
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
`

const Dancers = styled.div`
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
`

const Flower = styled(a.div)`
  grid-area: flower;
  position: relative;
  margin-top: auto;

  > .Hero__Flowerboi {
    position: absolute;
    top: 0;
  }
`

const DancerA = styled(Lottie)`
  grid-area: dancerA;
  margin-top: auto;
  @media (max-width: 768px) {
    margin-left: -75px;
  }
`

const DancerB = styled(Lottie)`
  grid-area: dancerB;
  margin-top: auto;
  @media (max-width: 768px) {
    margin-right: -75px;
  }
`

const Title = styled(a(Text.Heading1))`
  grid-area: title;
  position: relative;
  text-align: center;
  max-width: 700px;
`

const ApplyButton = styled(Button)`
  grid-area: button;
`

const Arrow = styled(a.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: arrow;
`

export const Hero = ({ section, ...restProps }) => {
  const scrollTo = useSpringScroll()
  const { secondsPassed, isBassBooming, isDancing } = useInfiniteSpringContext()
  const isDancersVisible = secondsPassed >= START_BASS_BOOMING_AT_SECOND

  const trail = useTrail(4, {
    from: { p: 0 },
    p: 1,
  })

  const dancersSpring = useSpring({
    config: { duration: 5000, easing: easeCubicOut },
    from: { y: 230, opacity: 0 },
    y: isDancersVisible ? 0 : 230,
    opacity: isDancersVisible ? 1 : 0,
  })

  const arrowSpring = useSpring({
    config: { duration: 1000, easing: easeCubicOut },
    from: { y: 32, opacity: 0 },
    y: 0,
    opacity: 1,
    delay: 6000,
  })

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

  const handelApplyButtonClick = useCallback(() => {
    const tracksSection = document.querySelector('[data-section-link="tracks"]')
    scrollTo(tracksSection)
  }, [scrollTo])

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
        <ApplyButton style={buttonSpring} onClick={handelApplyButtonClick}>
          {section.button}
        </ApplyButton>
        <Arrow style={arrowSpring} onClick={handelApplyButtonClick}>
          <Lottie
            animationData={arrow}
            animationStopped={!isDancersVisible}
            animationOffset={500}
          />
        </Arrow>
      </MainContent>
      <Dancers>
        <DancerA
          animationData={porcuboi}
          animationStopped={!isDancersVisible}
          style={useMemo(
            () => omit(['opacity'], dancersSpring),
            [dancersSpring]
          )}
        />
        <DancerB
          animationData={duckyduck}
          animationStopped={!isDancersVisible}
          style={useMemo(
            () => omit(['opacity'], dancersSpring),
            [dancersSpring]
          )}
        />
      </Dancers>
    </StyledHero>
  )
}
