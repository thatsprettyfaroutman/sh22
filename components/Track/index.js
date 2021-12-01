import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { a, useSpring } from 'react-spring'
import lerp from 'lerp'
import { easeSinOut } from 'd3-ease'

import { Text } from '@components/Text'
import { ExternalLink } from '@components/ExternalLink'
import { Bite } from '@components/Bite'
import { Lottie } from '@components/Lottie'

import analystLottie from '@lotties/track-analyst.lottie.json'
import dataLottie from '@lotties/track-data.lottie.json'
import developerLottie from '@lotties/track-developer.lottie.json'
import managerLottie from '@lotties/track-manager.lottie.json'

const lerpInOut = (x, y, alpha) => lerp(x, lerp(y * 4, x, alpha), alpha)

const LOTTIE_MAP = {
  ANALYST: analystLottie,
  DATA: dataLottie,
  DEVELOPER: developerLottie,
  MANAGER: managerLottie,
  DESIGNER: managerLottie,
  SALES: dataLottie,
}

const PUPIL_SELECTOR_MAP = {
  ANALYST: [
    'div > svg > g > g:nth-child(3) > g > path',
    'div > svg > g > g:nth-child(5) > g > path',
  ],
  DATA: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
  DEVELOPER: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
  MANAGER: [
    'div > svg > g > g:nth-child(7) > g > path',
    'div > svg > g > g:nth-child(9) > g > path',
  ],
  DESIGNER: [
    'div > svg > g > g:nth-child(7) > g > path',
    'div > svg > g > g:nth-child(9) > g > path',
  ],
  SALES: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
}

const StyledTrack = styled.div`
  background-color: ${(p) => p.theme.color.track.fg};
  border-radius: 8px;

  > div {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 24px;
    padding: 24px 32px;
    align-items: center;
    justify-items: start;
    border-radius: inherit;
    background-color: ${(p) => p.theme.color.track.bg};
    color: ${(p) => p.theme.color.track.fg};
    border: 3px solid ${(p) => p.theme.color.track.fg};
    pointer-events: none;

    @media (max-width: 768px) {
      grid-template-columns: 1fr auto;

      ${(p) =>
        !p.$isOpen &&
        css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          > :nth-child(3) {
            margin-top: -24px;
          }
        `};
    }
  }
`

const TrackIcon = styled(a.div)`
  display: flex;
  align-items: center;
  min-width: 70px;
  min-height: 70px;

  :empty {
    background-color: ${(p) => p.theme.color.track.fg};
    opacity: 0.05;
  }

  @media (max-width: 780px) {
    grid-column: 1/3;
    margin-right: auto;
  }
`

const Title = styled(Text.Heading2)`
  text-align: left;
`

const BiteMarks = styled(Bite.B)`
  display: none;
  > path {
    fill: ${(p) => p.theme.color.track.fg};
  }
  div:last-child > div > & {
    position: absolute;
    display: block;
    bottom: -1px;
    right: 20%;
    transform: rotate(180deg);
  }
`

const BiteMarksOuter = styled(BiteMarks)`
  > path {
    fill: ${(p) => p.theme.color.section.tracks.bg};
  }
  div:last-child > div > & {
    bottom: -10px;
    transform: rotate(180deg) scale(0.95, 1.4);
  }
`

export const Track = ({ track, onClick, ...restProps }) => {
  const router = useRouter()
  const [el, setEl] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPushed, setIsPushed] = useState(false)

  const isOpen = useMemo(
    () => new Date(track.opensAt) <= new Date(),
    [track.opensAt]
  )

  const contentSpring = useSpring({
    config: { tension: 400 },
    y: isPushed ? 0 : isHovering ? -8 : -4,
  })

  // Release pushed state in 1s
  useEffect(() => {
    if (!isPushed) {
      return
    }
    const t = setTimeout(() => {
      setIsPushed(false)
    }, 1000)
    return () => clearTimeout(t)
  }, [isPushed])

  const lottieAnimationData = LOTTIE_MAP[track?.type]

  const pupils = useMemo(() => {
    if (!el) {
      return
    }
    return PUPIL_SELECTOR_MAP[track?.type]
      ?.map((selector) => {
        const pupil = el.querySelector(selector)
        return pupil
      })
      .filter(Boolean)
  }, [el])

  const handleEyeMovement = useCallback(
    ({ value: { p } }) => {
      pupils?.forEach((pupil) => {
        pupil.style.transform = `translate3d(0, ${p * 6}px, 0)`
      })
    },
    [pupils]
  )

  const iconSpring = useSpring({
    config: { duration: 250, easing: easeSinOut },
    from: { p: 0 },
    p: isHovering ? 1 : 0,
    onChange: handleEyeMovement,
  })

  return (
    <StyledTrack
      $isOpen={isOpen}
      ref={setEl}
      {...restProps}
      onMouseEnter={isOpen ? useCallback(() => setIsHovering(true), []) : null}
      onMouseLeave={isOpen ? useCallback(() => setIsHovering(false), []) : null}
      onClick={useMemo(
        () =>
          isOpen
            ? () => {
                setIsPushed(true)
                // setTimeout(() => {
                // router.push(`/track/${track.type.toLowerCase()}`)
                window.location = `/track/${track.type.toLowerCase()}`
                // }, 120)
              }
            : null,
        [isOpen, onClick, track?.type, router]
      )}
    >
      <a.div style={contentSpring}>
        <TrackIcon
          style={{
            y: iconSpring.p.to((p, dp) => lerpInOut(0, -5, p)),
          }}
        >
          {lottieAnimationData && (
            <Lottie
              animationData={lottieAnimationData}
              animationStopped={!isHovering}
            />
          )}
        </TrackIcon>
        <Title>{track.title}</Title>
        {isOpen ? (
          <ExternalLink href="#">Apply</ExternalLink>
        ) : (
          <Text.Small>
            Application period starts on{' '}
            {useMemo(
              () => track?.opensAt.split('-').reverse().join('.'),
              [track.opensAt]
            )}
          </Text.Small>
        )}
        <BiteMarks />
        <BiteMarksOuter />
      </a.div>
    </StyledTrack>
  )
}
