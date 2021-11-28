import styled from 'styled-components'
import { Section } from '@components/Section'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

const SAbout = styled(Section)`
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

const STitle = styled(Text.Heading1)`
  grid-area: title;
  position: relative;
  max-width: 700px;
`

const SDescription = styled(Text.Body)`
  grid-area: description;
  position: relative;
  max-width: 700px;
`

const SLaptopLottie = styled.div`
  grid-area: lottie;
  width: 380px;
  max-width: 380px;
  height: 330px;
  background-color: #f0f;
`

export const About = ({ section, ...restProps }) => {
  return (
    <SAbout {...restProps}>
      <STitle>{section?.title}</STitle>
      <SDescription>{section?.description}</SDescription>
      <Button>{section?.button}</Button>
      <SLaptopLottie />
    </SAbout>
  )
}
