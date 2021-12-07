import { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { a, useSpring } from 'react-spring'

import { media, scale, SCALE } from '@styles/theme'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useDanceProgress } from '@hooks/useDanceProgress'
import { Section } from '@components/Section'
import { Footer } from '@components/Footer'
import { Text } from '@components/Text'
import { Lottie } from '@components/Lottie'

import tv from '@lotties/tv.lottie.json'

const StyledContacts = styled(Section)`
  min-height: initial;
  position: relative;
  display: grid;
  grid-gap: 72px;
  padding: 128px 48px;
  align-content: center;
  overflow: hidden;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet} {
    padding: 96px 16px;
    grid-gap: 96px;
  }
`

const Title = styled(Text.Heading1)`
  position: relative;
  max-width: 700px;

  ${media.tablet} {
    text-align: center;
  }

  > iframe {
    margin-left: 32px;
  }
`

const Infos = styled.div`
  position: relative;
  display: flex;
  gap: 128px;

  ${media.tablet} {
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

  .dark-mode & > a {
    color: ${(p) => p.theme.color.button.fg};
  }

  ${media.tablet} {
    text-align: center;
  }
`

const BfodaasTv = styled(a.div)`
  position: relative;
  justify-self: center;
  margin-top: 48px;
  transform-origin: 50% 0;
`

const BfodaasTvScreen = styled(a.div)`
  position: absolute;
  top: ${scale.phone(50)}px;
  left: ${scale.phone(70)}px;
  width: ${scale.phone(120)}px;
  height: ${scale.phone(120)}px;

  ${(p) =>
    p.$isBfodaas &&
    css`
      top: 50px;
      left: 70px;
      width: 120px;
      height: 120px;
    `}
`

export const Contacts = ({
  section,
  isBfodaasDisabled = false,
  isFooterEatingDisabled = false,
  ...restProps
}) => {
  const [isBfodaas, setIsBfodaas] = useState(false)
  const { setTimeScale } = useInfiniteSpringContext()
  const danceProgress = useDanceProgress()

  const [tvSpring, setTvSpring] = useSpring(() => ({
    scale: 1,
  }))

  const playBfodaas = useCallback(
    (e) => {
      if (isBfodaas) {
        return
      }
      setIsBfodaas(true)
      setTimeScale(1.487603)
      const iframe = document.createElement('iframe')
      iframe.setAttribute('width', '100%')
      iframe.setAttribute('height', '100%')
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

      const lottieTestScreen = e.target.parentNode.querySelector(
        'svg > g > g:nth-child(4)'
      )
      if (lottieTestScreen) {
        lottieTestScreen.style.display = 'none'
      }

      const lottieScreenBackground = e.target.parentNode.querySelector(
        'svg > g > g:nth-child(5) > g > path'
      )
      if (lottieScreenBackground) {
        lottieScreenBackground.style.fillOpacity = '1'
      }

      setTvSpring({
        reset: true,
        from: { scale: SCALE.phone },
        scale: 1,
      })
    },
    [setTimeScale, isBfodaas, setTvSpring]
  )

  return (
    <Footer isEatingDisabled={isFooterEatingDisabled}>
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
        {isBfodaasDisabled ? null : (
          <BfodaasTv style={tvSpring}>
            <Lottie
              animationData={tv}
              overrideScale={isBfodaas ? 1 : SCALE.phone}
            />
            <BfodaasTvScreen
              $isBfodaas={isBfodaas}
              onClick={playBfodaas}
              style={{
                ...(danceProgress ? { y: danceProgress.to((p) => p * 8) } : {}),
              }}
            />
          </BfodaasTv>
        )}
      </StyledContacts>
    </Footer>
  )
}
