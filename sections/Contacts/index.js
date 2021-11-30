import { useCallback } from 'react'
import styled from 'styled-components'
import { Section } from '@components/Section'
import { Footer } from '@components/Footer'
import { Text } from '@components/Text'

const StyledContacts = styled(Section)`
  min-height: initial;
  position: relative;
  display: grid;
  grid-gap: 72px;
  padding: 128px 48px;
  align-content: center;
  overflow: hidden;
  min-height: 50vh;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 96px 16px;
    grid-gap: 96px;
  }
`

const Title = styled(Text.Heading1)`
  position: relative;
  max-width: 700px;
  @media (max-width: 768px) {
    text-align: center;
  }
`

const Infos = styled(Text.Heading1)`
  position: relative;
  display: flex;
  gap: 128px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 96px;
  }
`

const Info = styled.div`
  display: grid;

  > ${Text.Heading1} {
    margin-top: 24px;
    margin-bottom: 48px;
  }

  > a {
    color: ${(p) => p.theme.color.button.bg};
    text-decoration: none;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`

export const Contacts = ({ section, ...restProps }) => {
  const playBfodaas = useCallback((e) => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('width', '200')
    iframe.setAttribute('height', '200')
    iframe.setAttribute(
      'src',
      'https://www.youtube.com/embed/_zP_NN2dOa4?controls=0&autoplay=1'
    )
    iframe.setAttribute('title', 'YouTube video player')
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute(
      'allow',
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 'allowfullscreen'"
    )

    e.target.appendChild(iframe)
  }, [])

  return (
    <Footer>
      <StyledContacts {...restProps}>
        <Title onClick={playBfodaas}>{section?.title}</Title>
        <Infos>
          {section?.contacts.map((info) => {
            return (
              <Info key={info.name}>
                <Text.Tag>{info.role}</Text.Tag>
                <Text.Heading1 as="p">{info.name}</Text.Heading1>
                <a href={`tel:${info.phone}`}>
                  <Text.Body>{info.phone}</Text.Body>
                </a>
                <a href={`mailto:${info.email}`}>
                  <Text.Body>{info.email}</Text.Body>
                </a>
              </Info>
            )
          })}
        </Infos>
      </StyledContacts>
    </Footer>
  )
}
