import { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import { useSecondsPassedEffect } from '@hooks/useSecondsPassedEffect'
import { useWindowResize } from '@hooks/useWindowResize'
import { useDanceProgress } from '@hooks/useDanceProgress'
import { getLottieSize } from '@components/Lottie'

const StyledYetiBeaverArea = styled(a.div)`
  position: absolute;
  top: ${(p) => -p.$beaverSize?.h || 0}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;

  // yetibeaver
  > div > .Lottie {
    display: block;
    position: absolute;
    top: ${(p) => (-p.$beaverSize?.h || 0) * 0.62}px;
    left: 0;
    width: ${(p) => -p.$beaverSize?.w || 0}px;
  }
`

const Content = styled(a.div)``

export const YetiBeaverArea = ({
  visible = true,
  isYetiJamming = false,
  children,
  animationData,
  ...restProps
}) => {
  const [isJamming, setIsJamming] = useState(false)
  const [beaverSize, setBeaverSize] = useState(null)
  const danceProgress = useDanceProgress({ enabled: visible && isJamming })

  useWindowResize(
    useCallback(() => {
      const { size } = getLottieSize(animationData)
      setBeaverSize(size)
    }, [animationData])
  )

  const jammingSpring = useMemo(
    () =>
      danceProgress
        ? {
            y: danceProgress.to((p) => p * 8),
          }
        : {},
    [danceProgress]
  )

  useSecondsPassedEffect(() => {
    setIsJamming(isYetiJamming)
  })

  return (
    <StyledYetiBeaverArea {...restProps} $beaverSize={beaverSize}>
      <Content style={jammingSpring}>{visible ? children : null}</Content>
    </StyledYetiBeaverArea>
  )
}
