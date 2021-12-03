import styled from 'styled-components'

import { media } from '@styles/theme'
import { Text } from '@components/Text'
import { TRACK_LOTTIE_MAP } from '@components/Track'
import { Lottie } from '@components/Lottie'
import { Button } from '@components/Button'

const StyledTrackHead = styled.div`
  display: grid;
  background-color: ${(p) => p.theme.color.trackHead.bg};
  color: ${(p) => p.theme.color.trackHead.fg};
`

const Content = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 192px 48px;
  max-width: 1250px;
  min-width: min(100%, 1250px);
  justify-self: center;

  ${media.tablet} {
    padding: 96px 16px;
    grid-template-columns: auto;
    justify-items: center;
    text-align: center;
  }
`

const Title = styled(Text.HeadingMega)``

const Description = styled(Text.Body)`
  max-width: 700px;
`

const ApplyButton = styled(Button)`
  margin-top: 24px;
`

export const TrackHead = ({ track, ...restProps }) => {
  const lottieAnimationData = TRACK_LOTTIE_MAP[track?.type]

  return (
    <StyledTrackHead {...restProps}>
      <Content>
        {lottieAnimationData && <Lottie animationData={lottieAnimationData} />}
        <Title>{track.title}</Title>
        <Description>{track.description}</Description>
        <ApplyButton isDancing={false}>Apply for this track</ApplyButton>
      </Content>
    </StyledTrackHead>
  )
}
