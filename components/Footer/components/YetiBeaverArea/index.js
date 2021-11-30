import { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { a, useSpring, config } from 'react-spring'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useSecondsPassedEffect } from '@hooks/useSecondsPassedEffect'
import { useWindowResize } from '@hooks/useWindowResize'
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
  const { infiniteSpring } = useInfiniteSpringContext()
  const [isJamming, setIsJamming] = useState(false)
  const [beaverSize, setBeaverSize] = useState(null)

  useWindowResize(
    useCallback(() => {
      const { size } = getLottieSize(animationData)
      setBeaverSize(size)
    }, [animationData])
  )

  const spring = useSpring({
    config: { ...config.stiff, mass: 2 },
    from: { y: 160 },
    y: visible ? 0 : 160,
  })

  const jammingSpring = useMemo(
    () =>
      isJamming
        ? {
            y: infiniteSpring.time.to(
              (t) => Math.sin(((t % 500) / 500) * Math.PI * 2) * 2
            ),
          }
        : {},
    [infiniteSpring, isJamming]
  )

  useSecondsPassedEffect(() => {
    setIsJamming(isYetiJamming)
  })

  return (
    <StyledYetiBeaverArea {...restProps} $beaverSize={beaverSize}>
      <Content
        style={{
          ...spring,
          ...jammingSpring,
        }}
      >
        {visible ? children : null}
      </Content>
    </StyledYetiBeaverArea>
  )
}
