import { useMemo } from 'react'
import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Lottie } from '@components/Lottie'
import { Bite } from '@components/Bite'
import { MrEyez } from '@components/MrEyez'
import { Track } from '@components/Track'

import boots from '@lotties/boots2.lottie.json'
import snek from '@lotties/snek.lottie.json'
import popsicle from '@lotties/popsicle.lottie.json'

const StyledTracks = styled(Section)`
  position: relative;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 48px;
  padding: 192px 48px;
  padding-bottom: 0;
  background-color: ${(p) => p.theme.color.section.tracks.bg};
  color: ${(p) => p.theme.color.section.tracks.fg};
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 48px 16px;
    padding-bottom: 0;
    grid-gap: 16px;
    padding-bottom: 210px;
  }

  @media (max-width: 768px) {
    min-height: initial;
    padding-top: 80px;
  }
`

const BiteMarksA = styled(Bite.A)`
  position: absolute;
  top: 0;
  right: 160px;
  > path {
    fill: ${(p) => p.theme.color.section.about.bg};
  }
`

const BiteMarksB = styled(Bite.B)`
  position: absolute;
  top: 700px;
  left: -29px;
  transform: rotate(-90deg);
  > path {
    fill: ${(p) => p.theme.color.section.about.bg};
  }
`

const Title = styled(Text.Heading1)`
  position: relative;
  max-width: 700px;
  text-align: center;
  justify-self: center;
`

const Body = styled(Text.Body)`
  position: relative;
  max-width: 700px;
  text-align: center;
  justify-self: center;
`

const Boots = styled(Lottie)`
  justify-self: center;
`

const Content = styled.div`
  position: relative;
  display: grid;
  grid-gap: 16px;
  max-width: 700px;
  padding-bottom: 192px;
  text-align: center;
  /* justify-self: center; */

  @media (max-width: 1024px) {
    padding-bottom: 0;
  }
`

const StyledMrEyez = styled(MrEyez)`
  position: absolute;
  top: 164px;
  left: 64px;

  @media (max-width: 768px) {
    top: 16px;
    left: 16px;
  }
`

const Dancers = styled.div`
  position: absolute;
  display: grid;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 48px;
  grid-template-areas: 'dancerA dancerB';
  justify-content: space-between;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`

const DancerA = styled(Lottie)`
  grid-area: dancerA;
  margin-top: auto;
`

const DancerB = styled(Lottie)`
  grid-area: dancerB;
  margin-top: auto;
  justify-self: end;
`

export const Tracks = ({ section, ...restProps }) => {
  return (
    <StyledTracks {...restProps}>
      <StyledMrEyez />
      <BiteMarksA />
      <BiteMarksB />
      <Title>{section?.title}</Title>
      <Body>{section?.body}</Body>
      <Boots animationData={useMemo(() => boots, [])} />
      <Content>
        {section?.tracks.map((track, i) => (
          <Track key={i} track={track} />
        ))}
        {/* <Text.Body>
          TODO: tracks
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          videbimus. Qui non moveatur et offensione turpitudinis et
          comprobatione honestatis? Quis istum dolorem timet? Terram, mihi
          crede, ea lanx et maria deprimet. Bonum negas esse divitias,
          praeposìtum esse dicis? Tum Piso: Atqui, Cicero, inquit, ista studia,
          si ad imitandos summos viros spectant, ingeniosorum sunt;
        </Text.Body> */}
      </Content>
      <Dancers>
        <DancerA animationData={useMemo(() => snek, [])} />
        <DancerB animationData={useMemo(() => popsicle, [])} />
      </Dancers>
    </StyledTracks>
  )
}
