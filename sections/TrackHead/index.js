import styled from 'styled-components'

import { media } from '@styles/theme'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { TRACK_LOTTIE_MAP } from '@components/Track'
import { Lottie } from '@components/Lottie'
import { Button } from '@components/Button'

const StyledTrackHead = styled(Section)`
  min-height: initial;
  display: grid;
  background-color: ${(p) => p.theme.color.section.trackHead.bg};
  color: ${(p) => p.theme.color.section.trackHead.fg};
`

const Content = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 192px 48px;
  max-width: 1250px;
  min-width: min(100%, 1250px);
  justify-self: center;

  ${media.tablet} {
    padding: 128px 16px;
    grid-template-columns: auto;
  }

  ${media.phone} {
    padding: 96px 16px;
  }
`

const Title = styled(Text.HeadingMega)``

const Description = styled.div`
  max-width: 700px;
`

const ApplyButtonWrapper = styled.a`
  display: block;
  margin-right: auto;
  margin-top: 24px;
`

export const TrackHead = ({ track, ...restProps }) => {
  const lottieAnimationData = TRACK_LOTTIE_MAP[track?.type]

  return (
    <StyledTrackHead {...restProps}>
      <Content>
        {lottieAnimationData && <Lottie animationData={lottieAnimationData} />}
        <Title>{track.title}</Title>
        {track.description ? (
          <Description>
            <Text.Markdown children={track.description} />
          </Description>
        ) : null}
        {track?.href ? (
          <ApplyButtonWrapper href={track.href}>
            <Button isDancing={false}>Apply for this track</Button>
          </ApplyButtonWrapper>
        ) : null}
      </Content>
    </StyledTrackHead>
  )
}
