import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { ExternalLink } from '@components/ExternalLink'
import { SwingyFrame } from '@components/SwingyFrame'

const StyledAlumni = styled(Section)`
  min-height: initial;
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 24px;
  grid-column-gap: 96px;
  padding: 192px 48px;
  padding-bottom: 384px;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.alumni.bg};
  color: ${(p) => p.theme.color.section.alumni.fg};

  > a {
    grid-area: button;
    margin-right: auto;
    margin-bottom: auto;
  }

  grid-template-areas:
    '. frame'
    'tag frame'
    'title frame'
    'button frame'
    '. frame';

  @media (max-width: 768px) {
    padding: 48px 16px;
    grid-template-columns: auto;
    justify-items: center;
    grid-template-areas:
      'frame'
      'tag'
      'title'
      'button';

    text-align: center;

    > a {
      margin-right: initial;
    }
  }
`

const Tag = styled(Text.Tag)`
  grid-area: tag;
  @media (max-width: 768px) {
    margin-top: 192px;
  }
`

const Title = styled(Text.Heading1)`
  grid-area: title;
  position: relative;
  max-width: 700px;
`

const Frame = styled(SwingyFrame)`
  grid-area: frame;

  @media (max-width: 1024px) {
    margin-right: -100px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const Alumni = ({ section, ...restProps }) => {
  return (
    <StyledAlumni {...restProps}>
      <Tag>{section?.tag}</Tag>
      <Title>{section?.title}</Title>
      <ExternalLink href={section?.href}>{section?.button}</ExternalLink>
      <Frame />
    </StyledAlumni>
  )
}
