import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring } from 'react-spring'

import { Lottie } from '@components/Lottie'

import toggleTheme from '@lotties/toggle-theme.lottie.json'

const StyledToggleTheme = styled.div`
  cursor: pointer;

  > div > div > svg path {
    transition: fill 60ms ease-in-out;
    fill: ${(p) => p.theme.color.main.fg};

    .dark-mode & {
      fill: ${(p) => p.theme.color.button.fg};
    }
  }
`

export const ToggleTheme = ({ toggled = false, onChange, ...restProps }) => {
  const [lottieAnimation, setLottieAnimation] = useState()
  const [clicked, setClicked] = useState(toggled)

  useEffect(() => {
    setClicked(toggled)
  }, [toggled])

  useSpring({
    config: { duration: 1000 },
    from: { p: 0 },
    p: clicked ? 1 : 0,
    onChange: ({ value: { p } }) => {
      if (lottieAnimation) {
        lottieAnimation.goToAndStop(p * 1000)
      }
    },
    onRest: () => {
      if (typeof onChange === 'function') {
        onChange(clicked)
      }
    },
  })

  return (
    <StyledToggleTheme
      onClick={useCallback(() => {
        setClicked((s) => !s)
      }, [])}
      {...restProps}
    >
      <Lottie
        animationData={toggleTheme}
        onControlledAnimation={setLottieAnimation}
        overrideScale={0.5}
      />
    </StyledToggleTheme>
  )
}
