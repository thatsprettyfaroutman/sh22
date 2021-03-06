import styled from 'styled-components'

import { media } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { ExternalLink } from '@components/ExternalLink'
import { Lottie } from '@components/Lottie'

import laptop from '@lotties/laptop.lottie.json'

const StyledAbout = styled(Section)`
  min-height: initial;
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 24px;
  padding: 192px 48px;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.about.bg};
  color: ${(p) => p.theme.color.section.about.fg};

  > a {
    grid-area: button;
    margin-right: auto;
    margin-bottom: auto;
  }

  grid-template-areas:
    'title lottie'
    'description lottie'
    'button lottie';

  ${media.tablet} {
    padding: 96px 16px;
    grid-template-columns: auto;
    justify-items: center;
    grid-template-areas:
      'lottie'
      'title'
      'description'
      'button';
    text-align: center;

    > a {
      margin-right: initial;
    }
  }
`

const Title = styled(Text.Heading1)`
  grid-area: title;
  position: relative;
  max-width: 700px;
`

const Description = styled(Text.Body)`
  grid-area: description;
  position: relative;
  max-width: 700px;
`

const Laptop = styled(Lottie)`
  grid-area: lottie;
  min-width: 320px;

  ${media.tablet} {
    min-width: initial;
  }

  .no-js & {
    ${NO_JS_ANIM.danceRolly};
  }
`

export const About = ({ section, ...restProps }) => {
  return (
    <StyledAbout {...restProps}>
      <Title>{section?.title}</Title>
      <Description>{section?.description}</Description>
      <ExternalLink href={section?.href}>{section?.button}</ExternalLink>
      <Laptop animationData={laptop} />
    </StyledAbout>
  )
}
