import { useState } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'

import { Lottie } from '@components/Lottie'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'

import yetibeaver from '@lotties/yetibeaver2.lottie.json'

import { useGetBiteProps } from './hooks/useGetBiteProps'
import { useBiteClipPath } from './hooks/useBiteClipPath'
import { useYetiBeaverSpring } from './hooks/useYetiBeaverSpring'
import { YetiBeaverArea } from './components/YetiBeaverArea'

const Wrapper = styled.div`
  position: relative;
`

const StyledFooter = styled.footer`
  position: relative;
  background-color: ${(p) => p.theme.color.footer.bg};
  color: ${(p) => p.theme.color.footer.fg};
`

export const Footer = ({
  children,
  isEatingDisabled = false,
  ...restProps
}) => {
  const { secondsPassed } = useInfiniteSpringContext()
  const { ref: inViewRef, inView } = useInView()
  const [bitingStartedAtSecond, setBitingStartedAtSecond] = useState(-1)
  const [biteRef, getBiteProps] = useGetBiteProps(
    bitingStartedAtSecond,
    !isEatingDisabled
  )
  const biteClipPath = useBiteClipPath(
    getBiteProps,
    inView && !isEatingDisabled
  )
  const { spring: yetiBeaverSpring, isDoneEating } = useYetiBeaverSpring(
    getBiteProps,
    yetibeaver,
    inView && !isEatingDisabled
  )

  useIsomorphicLayoutEffect(() => {
    if (!inView || bitingStartedAtSecond !== -1) {
      return
    }
    setBitingStartedAtSecond(secondsPassed)
  }, [inView, bitingStartedAtSecond, secondsPassed])

  return (
    <Wrapper {...restProps}>
      <StyledFooter>
        {isEatingDisabled ? null : (
          <YetiBeaverArea
            ref={inViewRef}
            animationData={yetibeaver}
            visible={bitingStartedAtSecond !== -1}
            isYetiJamming={isDoneEating}
            yetiBeaverWidth={yetibeaver.crop.w}
            yetiBeaverHeight={yetibeaver.crop.h}
          >
            <Lottie
              animationData={yetibeaver}
              animationOffset={3000}
              animationStopped={isDoneEating}
              style={yetiBeaverSpring}
            />
          </YetiBeaverArea>
        )}
        <div ref={biteRef} style={{ clipPath: biteClipPath }}>
          {children}
        </div>
      </StyledFooter>
    </Wrapper>
  )
}
