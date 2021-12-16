import { useMemo } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useInView } from 'react-intersection-observer'

import { media } from '@styles/theme'
import { useDanceProgress } from '@hooks/useDanceProgress'
import { Section } from '@components/Section'
import { Text } from '@components/Text'

const StyledSlack = styled(Section)`
  min-height: initial;
  display: grid;
  grid-gap: 80px;
  justify-content: center;
  padding: 192px 32px;
  background-color: ${(p) => p.theme.color.section.slack.bg};
  color: ${(p) => p.theme.color.section.slack.fg};

  ${media.tablet} {
    padding: 48px 16px;
    padding-bottom: 128px;
  }

  ${media.phone} {
    grid-gap: 32px;
  }
`

const Titles = styled.div`
  display: grid;
  grid-gap: 16px;
`

const Content = styled.div``

const Jiffs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-gap: 80px;
  justify-content: center;
  justify-items: center;
  padding-top: 16px;

  ${media.phone} {
    grid-template-columns: repeat(4, 64px);
    grid-gap: 16px;
  }

  > a {
    display: block;
    cursor: pointer;
    width: 80px;
    height: 80px;

    ${media.phone} {
      width: 64px;
      height: 64px;
    }

    > img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`

const Title = styled(Text.Heading1)`
  text-align: center;

  > img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`

const Description = styled.div`
  max-width: 700px;
  text-align: center;

  > div > p {
    opacity: 1;
  }
`

const SlackMessage = styled(a.div)`
  display: grid;
  grid-template-columns: 72px 1fr;
  grid-template-areas:
    'photo name'
    'photo content';
  max-width: 600px;
  padding: 24px;
  grid-column-gap: 16px;
  grid-row-gap: 8px;
  box-shadow: 0px 0px 6.0802px rgba(0, 0, 0, 0.08),
    0px 6.0802px 24.3208px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  background-color: ${(p) => p.theme.color.slackMessage.bg};
  color: ${(p) => p.theme.color.slackMessage.fg};

  > img {
    grid-area: photo;
    display: block;
    width: 100%;
    height: auto;
    border-radius: 16px;
  }

  ${media.phone} {
    grid-template-columns: 32px 1fr;
    grid-template-areas:
      'photo name'
      'content content';
    align-items: center;
    grid-column-gap: 8px;
  }
`

const SlackMessageName = styled.div`
  grid-area: name;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`

const SlackMessageContent = styled.div`
  grid-area: content;
  > p > img {
    width: 32px;
    height: 32px;
    margin-left: 4px;
    vertical-align: middle;
    margin-top: -16px;
  }
`

export const Slack = ({ section, ...restProps }) => {
  const { ref: inViewRef, inView } = useInView()

  const danceProgress = useDanceProgress()

  const logoStyle = useMemo(
    () =>
      danceProgress
        ? {
            y: danceProgress.to((p) => p * -8),
            rotate: danceProgress.to((p) => p * -8),
          }
        : {},
    [danceProgress]
  )

  const messageStyle = useMemo(
    () =>
      danceProgress
        ? {
            y: danceProgress.to((p) => p * 2),
          }
        : {},
    [danceProgress]
  )

  return (
    <StyledSlack ref={inViewRef} {...restProps}>
      <Titles>
        <Title>
          <a.img src="/images/slack.png" alt="Slack Logo" style={logoStyle} />
          {section.title}
        </Title>
        <Description>
          <Text.Markdown children={section.description} />
        </Description>
      </Titles>
      <Content>
        <Text.Small style={{ opacity: 0.5, marginBottom: 16 }}>
          Example:
        </Text.Small>
        <SlackMessage style={messageStyle}>
          <img src="/images/nikoboi.png" alt="Niko" />
          <SlackMessageName>
            <Text.Heading2>Niko</Text.Heading2>
            <Text.Body
              style={{
                opacity: 0.5,
              }}
            >
              12:30 AM
            </Text.Body>
          </SlackMessageName>
          <SlackMessageContent>
            <Text.Body
              style={{
                opacity: 1,
              }}
            >
              {section.slackMessageText}
              {inView && (
                <img src="/images/pixel-porcuboi.gif" alt="porcuboi" />
              )}
            </Text.Body>
          </SlackMessageContent>
        </SlackMessage>
      </Content>
      <Jiffs>
        <a href="/images/pixel-duckyduck.gif" download>
          {inView && <img src="/images/pixel-duckyduck.gif" alt="duckyduck" />}
        </a>
        <a href="/images/pixel-porcuboi.gif" download>
          {inView && <img src="/images/pixel-porcuboi.gif" alt="porcuboi" />}
        </a>
        <a href="/images/pixel-snek.gif" download>
          {inView && <img src="/images/pixel-snek.gif" alt="snek" />}
        </a>
        <a href="/images/pixel-popsicle.gif" download>
          {inView && <img src="/images/pixel-popsicle.gif" alt="popsicle" />}
        </a>
      </Jiffs>
    </StyledSlack>
  )
}
