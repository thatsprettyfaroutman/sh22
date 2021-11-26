import { useState } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { Lottie } from '@components/Lottie'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import yetiBeaver from '@lotties/yetibeaver2.lottie.json'
import { useGetBiteProps } from './hooks/useGetBiteProps'
import { useBiteClipPath } from './hooks/useBiteClipPath'
import { useYetiBeaverSpring } from './hooks/useYetiBeaverSpring'
import { YetiBeaverArea } from './components/YetiBeaverArea'

const Wrapper = styled.div`
  position: relative;
`

const StyledFooter = styled.footer`
  position: relative;
  min-height: 50vh;
  padding: 1rem;
  background-color: #1d1d1b;
  color: #fff;
`

export const Footer = ({ children, ...restProps }) => {
  const { secondsPassed } = useInfiniteSpringContext()
  const { ref: inViewRef, inView } = useInView()
  const [bitingStartedAtSecond, setBitingStartedAtSecond] = useState(-1)
  const [biteRef, getBiteProps] = useGetBiteProps(bitingStartedAtSecond)
  const biteClipPath = useBiteClipPath(getBiteProps)
  const { spring: yetiBeaverSpring, isDoneEating } =
    useYetiBeaverSpring(getBiteProps)

  useIsomorphicLayoutEffect(() => {
    if (!inView || bitingStartedAtSecond !== -1) {
      return
    }
    setBitingStartedAtSecond(secondsPassed)
  }, [inView, bitingStartedAtSecond, secondsPassed])

  return (
    <Wrapper {...restProps} ref={inViewRef}>
      <YetiBeaverArea
        visible={bitingStartedAtSecond !== -1}
        isYetiJamming={isDoneEating}
      >
        <Lottie
          animationData={yetiBeaver}
          animationOffset={3000}
          animationStopped={isDoneEating}
          style={yetiBeaverSpring}
        />
      </YetiBeaverArea>
      <StyledFooter ref={biteRef} style={{ clipPath: biteClipPath }}>
        {children}
      </StyledFooter>
    </Wrapper>
  )
}