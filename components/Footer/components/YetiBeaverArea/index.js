import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { a, useSpring, config } from 'react-spring'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import { useSecondsPassedEffect } from '@hooks/useSecondsPassedEffect'
import { YETIBEAVER_OVERFLOW_AREA, YETIBEAVER_WIDTH } from '../../consts'

const SYetiBeaverArea = styled.div`
  position: absolute;
  top: -${YETIBEAVER_OVERFLOW_AREA}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;

  // yetibeaver
  > div > .Lottie {
    display: block;
    position: absolute;
    top: -230px;
    left: 0;
    width: ${YETIBEAVER_WIDTH}px;
  }
`

const Content = styled.div``

const AContent = a(Content)

export const YetiBeaverArea = ({
  visible = true,
  isYetiJamming = false,
  children,
  ...restProps
}) => {
  const { infiniteSpring } = useInfiniteSpringContext()
  const [isJamming, setIsJamming] = useState(false)

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
    <SYetiBeaverArea {...restProps}>
      <AContent
        style={{
          ...spring,
          ...jammingSpring,
        }}
      >
        {visible ? children : null}
      </AContent>
    </SYetiBeaverArea>
  )
}
