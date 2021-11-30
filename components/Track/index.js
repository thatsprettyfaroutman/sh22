import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { a, useSpring } from 'react-spring'
import { Text } from '@components/Text'
import { ExternalLink } from '@components/ExternalLink'

const StyledTrack = styled.div`
  background-color: ${(p) => p.theme.color.track.fg};
  border-radius: 8px;

  > div {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 24px;
    padding: 24px 32px;
    align-items: center;
    justify-items: start;
    border-radius: inherit;
    background-color: ${(p) => p.theme.color.track.bg};
    color: ${(p) => p.theme.color.track.fg};
    border: 3px solid ${(p) => p.theme.color.track.fg};
    pointer-events: none;

    @media (max-width: 780px) {
      grid-template-columns: 1fr auto;
    }
  }
`

const TrackIcon = styled.div`
  width: 64px;
  height: 64px;
  background-color: #f0f;

  @media (max-width: 780px) {
    grid-column: 1/3;
    margin-right: auto;
  }
`

export const Track = ({ track, onClick, ...restProps }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isPushed, setIsPushed] = useState(false)

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

  return (
    <StyledTrack
      {...restProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        setIsPushed(true)
        if (typeof onClick === 'function') {
          setTimeout(onClick, 120)
        }
      }}
    >
      <a.div style={contentSpring}>
        <TrackIcon />
        <Text.Heading2>{track.title}</Text.Heading2>
        <ExternalLink href="#">Apply</ExternalLink>
      </a.div>
    </StyledTrack>
  )
}
