import { useState } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { Text } from '@components/Text'
import { useDanceProgress } from '@hooks/useDanceProgress'
import { Arrow } from './components/Arrow'

const StyledExternalLink = styled(a.a)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 8px;
  padding: 0;
  transform-origin: 50% 50%;
  text-decoration: none;
`

const Content = styled(a(Text.Button))`
  pointer-events: none;
  color: ${(p) => p.theme.color.link.fg};
`

export const ExternalLink = ({
  isDancing = false,
  isHovered = false,
  children,
  onClick,

  ...restProps
}) => {
  const [isLocalHovering, setIsLocalHovering] = useState(false)
  const isHovering = isHovered || isLocalHovering
  const danceProgress = useDanceProgress({ enabled: isHovering })

  return (
    <StyledExternalLink
      onMouseEnter={() => setIsLocalHovering(true)}
      onMouseLeave={() => setIsLocalHovering(false)}
      target="_blank"
      {...restProps}
    >
      <Content>{children}</Content>
      <Arrow
        style={
          isHovering && danceProgress
            ? { x: danceProgress.to((p) => p * 16) }
            : undefined
        }
      />
    </StyledExternalLink>
  )
}
