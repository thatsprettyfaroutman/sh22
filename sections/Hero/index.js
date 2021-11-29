import { useMemo } from 'react'
import styled from 'styled-components'
import { a, useSpring, useTrail } from 'react-spring'
import { easeCubicOut } from 'd3-ease'
import lerp from 'lerp'
import { omit } from 'ramda'
import {
  useInfiniteSpringContext,
  START_BASS_BOOMING_AT_SECOND,
} from '@contexts/infiniteSpring'
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

  /* grid-template-columns: auto 1fr auto; */
  /* grid-gap: 48px; */
  padding: 48px;
  /* padding-bottom: 0; */
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.hero.bg};
  color: ${(p) => p.theme.color.section.hero.fg};

  /* grid-template-areas:
    '. . .'
    '. flower .'
    'title title title'
    'dancerA button dancerB'
    'dancerA arrow dancerB'; */

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
    /* grid-template-columns: 1fr auto 1fr; */
    /* grid-template-areas:
      'flower flower flower'
      'title title title'
      'button button button'
      'dancerA arrow dancerB'; */
  }
`

const Top = styled.div`
  display: grid;
  grid-gap: 48px;
  justify-items: center;
  grid-template-areas:
    'flower'
    'title'
    'button'
    'arrow';
`

const Bot = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  display: grid;
  grid-gap: 48px;
  grid-template-areas: 'dancerA  dancerB';
  justify-content: space-between;
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

  return (
    <StyledHero {...restProps}>
      {/* <ColorTunnel /> */}
      {/* <FlyingThings /> */}

      <Top>
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
        <ApplyButton style={buttonSpring}>{section.button}</ApplyButton>
        <Arrow style={arrowSpring}>
          <Lottie
            animationData={arrow}
            animationStopped={!isDancersVisible}
            animationOffset={500}
          />
        </Arrow>
      </Top>
      <Bot>
        <DancerA
          animationData={porcuboi}
          animationStopped={!isDancersVisible}
          style={omit(['opacity'], dancersSpring)}
        />
        <DancerB
          animationData={duckyduck}
          animationStopped={!isDancersVisible}
          style={omit(['opacity'], dancersSpring)}
        />
      </Bot>
    </StyledHero>
  )
}
