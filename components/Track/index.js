import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { a, useSpring } from 'react-spring'
import { easeSinOut } from 'd3-ease'

import { ExternalLink } from '@components/ExternalLink'
import { Lottie } from '@components/Lottie'

import { lerpInOut } from './lib'
import { TRACK_LOTTIE_MAP, TRACK_LOTTIE_PUPIL_SELECTOR_MAP } from './consts'
import * as Styled from './styles'

export * from './consts'

// TODO: ask for email if track not open?

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

  const lottieAnimationData = TRACK_LOTTIE_MAP[track?.type]

  const pupils = useMemo(() => {
    if (!el) {
      return
    }
    return TRACK_LOTTIE_PUPIL_SELECTOR_MAP[track?.type]
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

  const href = useMemo(() => {
    if (!isOpen) {
      return `#tracks`
    }
    return `/track/${track.type.toLowerCase()}`
  }, [track.type, isOpen])

  const opensAtDate = useMemo(
    () => track?.opensAt.split('-').reverse().join('.'),
    [track.opensAt]
  )

  return (
    <Styled.Track
      href={href}
      $isOpen={isOpen}
      ref={setEl}
      {...restProps}
      onMouseEnter={useCallback(() => {
        setIsHovering(true)
        if (!isOpen) {
          return
        }
        router.prefetch(href)
      }, [router, href, isOpen])}
      onMouseLeave={useCallback(() => setIsHovering(false), [])}
      onClick={useCallback(
        (e) => {
          if (!isOpen) {
            return
          }
          e.preventDefault()
          setIsPushed(true)
          setTimeout(() => {
            router.push(
              {
                pathname: '/track/[type]',
                query: { type: track.type.toLowerCase() },
              }
              // undefined,
              // {
              //   shallow: true,
              // }
            )
          }, 120)
        },
        [isOpen, onClick, track?.type, router, href]
      )}
    >
      <a.div style={contentSpring}>
        <Styled.TrackIcon
          style={{
            y: iconSpring.p.to((p) => lerpInOut(0, -5, p)),
          }}
        >
          {lottieAnimationData && (
            <Lottie
              animationData={lottieAnimationData}
              animationStopped={!isHovering}
            />
          )}
        </Styled.TrackIcon>
        <Styled.Title>{track.title}</Styled.Title>
        {isOpen ? (
          <ExternalLink as="div" isHovered={isHovering}>
            Apply
          </ExternalLink>
        ) : (
          <Styled.OpensAtText>
            Application period starts on {opensAtDate}
          </Styled.OpensAtText>
        )}
        <Styled.BiteMarks />
        <Styled.BiteMarksOuter />
      </a.div>
    </Styled.Track>
  )
}
