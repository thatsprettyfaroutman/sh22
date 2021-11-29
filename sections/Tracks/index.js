import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Lottie } from '@components/Lottie'
import { Bite } from '@components/Bite'

import popsicle from '@lotties/popsicle.lottie.json'

const StyledTracks = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 24px;
  padding: 192px 48px;
  padding-bottom: 0;
  background-color: ${(p) => p.theme.color.section.tracks.bg};
  color: ${(p) => p.theme.color.section.tracks.fg};
  overflow: hidden;

  grid-template-areas:
    '. title .'
    'dancerA content dancerB'
    'dancerA . dancerB';

  @media (max-width: 1024px) {
    padding: 48px 16px;
    padding-bottom: 0;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    grid-template-areas:
      'title title'
      'content content'
      'dancerA dancerB';
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
  grid-area: title;
  position: relative;
  max-width: 700px;
  text-align: center;
  justify-self: center;
`

const Content = styled.div`
  grid-area: content;
  position: relative;
  max-width: 700px;
  padding-bottom: 192px;
  text-align: center;
  justify-self: center;

  @media (max-width: 1024px) {
    padding-bottom: 0;
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
      <BiteMarksA />
      <BiteMarksB />
      <Title>{section?.title}</Title>
      <Content>
        <Text.Body>
          TODO: tracks
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          videbimus. Qui non moveatur et offensione turpitudinis et
          comprobatione honestatis? Quis istum dolorem timet? Terram, mihi
          crede, ea lanx et maria deprimet. Bonum negas esse divitias,
          praeposìtum esse dicis? Tum Piso: Atqui, Cicero, inquit, ista studia,
          si ad imitandos summos viros spectant, ingeniosorum sunt;
        </Text.Body>
      </Content>
      {/* <Dancers>
        <div />
        <Lottie animationData={popsicle} />
      </Dancers> */}

      <DancerA animationData={popsicle} animationOffset={500} />
      <DancerB animationData={popsicle} />
    </StyledTracks>
  )
}
