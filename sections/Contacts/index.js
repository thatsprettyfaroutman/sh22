import styled from 'styled-components'
import { Section } from '@components/Section'
import { Footer } from '@components/Footer'
import { Text } from '@components/Text'

const StyledContacts = styled(Section)`
  min-height: initial;
  position: relative;
  display: grid;
  grid-gap: 128px;
  padding: 48px;
  padding-bottom: 128px;
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
  return (
    <Footer>
      <StyledContacts {...restProps}>
        <Title>{section?.title}</Title>
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
