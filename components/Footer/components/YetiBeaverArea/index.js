import { useMemo, useState, forwardRef } from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'

import { media, scale } from '@styles/theme'
import { useSecondsPassedEffect } from '@hooks/useSecondsPassedEffect'
import { useDanceProgress } from '@hooks/useDanceProgress'

const StyledYetiBeaverArea = styled(a.div)`
  position: absolute;
  top: ${(p) => -p.$yetiBeaverHeight}px;
  ${media.tablet} {
    top: ${(p) => scale.tablet(-p.$yetiBeaverHeight)}px;
  }
  ${media.phone} {
    top: ${(p) => scale.phone(-p.$yetiBeaverHeight)}px;
  }
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;

  // yetibeaver
  > div > .Lottie {
    display: block;
    position: absolute;
    top: ${(p) => -p.$yetiBeaverHeight * 0.62}px;
    ${media.tablet} {
      top: ${(p) => scale.tablet(-p.$yetiBeaverHeight)(p) * 0.62}px;
    }
    ${media.phone} {
      top: ${(p) => scale.phone(-p.$yetiBeaverHeight)(p) * 0.62}px;
    }
    left: 0;
    width: ${(p) => p.$yetiBeaverWidth}px;
    ${media.tablet} {
      width: ${(p) => scale.tablet(p.$yetiBeaverWidth)}px;
    }
    ${media.phone} {
      width: ${(p) => scale.phone(p.$yetiBeaverWidth)}px;
    }
  }
`

const Content = styled(a.div)``

export const YetiBeaverArea = forwardRef(
  (
    {
      visible = true,
      isYetiJamming = false,
      children,
      animationData,
      yetiBeaverWidth = 0,
      yetiBeaverHeight = 0,
      ...restProps
    },
    forwardedRef
  ) => {
    const [isJamming, setIsJamming] = useState(false)
    const danceProgress = useDanceProgress({ enabled: visible && isJamming })

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
      <StyledYetiBeaverArea
        ref={forwardedRef}
        {...restProps}
        $yetiBeaverWidth={yetiBeaverWidth}
        $yetiBeaverHeight={yetiBeaverHeight}
      >
        <Content style={jammingSpring}>{visible ? children : null}</Content>
      </StyledYetiBeaverArea>
    )
  }
)
YetiBeaverArea.displayName = 'YetiBeaverArea'
