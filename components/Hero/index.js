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
import arrow from '@lotties/arrow.lottie.json'

const StyledHero = styled(Section)`
  position: relative;
  display: grid;
  grid-gap: 48px;
  padding: 32px;
  align-content: center;
  justify-content: center;
  justify-items: center;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.hero.bg};
  color: ${(p) => p.theme.color.section.hero.fg};
`

const MainLotties = styled(a.div)`
  position: relative;

  > .Hero__Flowerboi {
    position: absolute;
    top: 0;
  }
`

const DancingLotties = styled(a.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  > * {
    position: absolute;
    left: 16px;
    bottom: 0;
  }

  > :nth-child(2) {
    left: auto;
    right: 16px;
  }
`

const Title = styled(a(Text.Heading1))`
  position: relative;
  text-align: center;
  max-width: 700px;
`

const Arrow = styled(a.img).attrs({ src: '/images/arrow.svg' })`
  position: relative;
  display: block;
  width: 46px;
  height: auto;
  margin-top: 48px;
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

      <MainLotties>
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
      </MainLotties>

      <DancingLotties style={omit(['opacity'], dancersSpring)}>
        <Lottie animationData={porcuboi} animationStopped={!isDancersVisible} />
        <Lottie
          animationData={duckyduck}
          animationStopped={!isDancersVisible}
        />
      </DancingLotties>

      <Title style={titleSpring}>{section.title}</Title>
      <Button style={buttonSpring}>{section.button}</Button>
      <a.div style={arrowSpring}>
        <Lottie
          animationData={arrow}
          animationStopped={!isDancersVisible}
          animationOffset={500}
        />
      </a.div>
    </StyledHero>
  )
}
