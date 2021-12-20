import styled from 'styled-components'

import { media } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'
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

  ${media.tabletWide} {
    padding: 96px 16px;
    padding-bottom: 0;
    grid-gap: 32px;
    padding-bottom: 210px;
  }

  ${media.tablet} {
    min-height: initial;
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

  padding-bottom: 192px;
  ${media.tabletWide} {
    padding-bottom: 0;
  }
`

const Boots = styled(Lottie)`
  justify-self: center;
  .no-js & {
    ${NO_JS_ANIM.danceRolly};
  }
`

const TrackList = styled.div`
  position: relative;
  display: grid;
  grid-gap: 16px;
  max-width: 700px;
  text-align: center;
`

const StyledMrEyez = styled(MrEyez)`
  position: absolute;
  top: 132px;
  left: 64px;

  ${media.tabletWide} {
    top: 180px;
  }

  ${media.tablet} {
    top: 32px;
    left: 32px;
  }

  .no-js & {
    ${NO_JS_ANIM.danceRolly};
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

  ${media.tablet} {
    padding: 0 16px;
  }
`

const DancerA = styled(Lottie)`
  grid-area: dancerA;
  margin-top: auto;
  .no-js & {
    ${NO_JS_ANIM.dance};
    margin-bottom: 5px;
  }
`

const DancerB = styled(Lottie)`
  grid-area: dancerB;
  margin-top: auto;
  justify-self: end;
  .no-js & {
    ${NO_JS_ANIM.danceRolly};
  }
`

export const Tracks = ({
  section,
  isSimple = false,
  omitTrack,
  ...restProps
}) => {
  return (
    <StyledTracks {...restProps} id="tracks">
      {!isSimple && <StyledMrEyez />}
      {!isSimple && <BiteMarksA />}
      {!isSimple && <BiteMarksB />}
      <Title>{section?.title}</Title>
      <Boots animationData={boots} />
      <TrackList>
        {section?.tracks
          .filter((t) => (omitTrack ? t.type !== omitTrack.type : true))
          .map((track) => (
            <Track key={track.type} track={track} />
          ))}
      </TrackList>
      <Body>{section?.body}</Body>
      {!isSimple && (
        <Dancers>
          <DancerA animationData={snek} />
          <DancerB animationData={popsicle} />
        </Dancers>
      )}
    </StyledTracks>
  )
}
