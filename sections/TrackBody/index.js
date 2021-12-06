import styled from 'styled-components'

import { media } from '@styles/theme'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

const StyledTrackBody = styled(Section)`
  min-height: initial;
  display: grid;
  background-color: ${(p) => p.theme.color.section.trackBody.bg};
  color: ${(p) => p.theme.color.section.trackBody.fg};
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
  }
`

const Description = styled.div`
  max-width: 700px;
`

const ApplyButtonWrapper = styled.a`
  display: block;
  margin-right: auto;
  margin-top: 24px;
`

export const TrackBody = ({ track, ...restProps }) => {
  return (
    <StyledTrackBody {...restProps}>
      <Content>
        <Description>
          <Text.Markdown children={track.body} />
        </Description>
        {track?.href ? (
          <ApplyButtonWrapper href={track.href}>
            <Button isDancing={false}>Apply for this track</Button>
          </ApplyButtonWrapper>
        ) : null}
      </Content>
    </StyledTrackBody>
  )
}
