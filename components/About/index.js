import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Lottie } from '@components/Lottie'

import laptop from '@lotties/laptop.lottie.json'

const StyledAbout = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    'title lottie'
    'description lottie'
    'button lottie';
  grid-gap: 48px;
  padding: 0 48px;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${(p) => p.theme.color.section.about.bg};
  color: ${(p) => p.theme.color.section.about.fg};

  > button {
    grid-area: button;
    margin-right: auto;
    margin-bottom: auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    justify-items: center;
    grid-template-areas:
      'lottie'
      'title'
      'description'
      'button';
    text-align: center;

    > button {
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
  width: 320px;
  height: 256px;
`

export const About = ({ section, ...restProps }) => {
  return (
    <StyledAbout {...restProps}>
      <Title>{section?.title}</Title>
      <Description>{section?.description}</Description>
      <Button>{section?.button}</Button>
      <Laptop animationData={laptop} />
    </StyledAbout>
  )
}
