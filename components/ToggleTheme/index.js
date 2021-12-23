import { useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSpring } from 'react-spring'

import { event } from '@util/ga'
import { Lottie } from '@components/Lottie'

import toggleTheme from '@lotties/toggle-theme.lottie.json'

export const THEME_CHANGING_CLASS_NAME = 'theme-changing'

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
  const [lottieTimeTarget, setLottieTimeTarget] = useState(toggled ? 1000 : 0)
  const isMounted = useRef(false)
  const onRestClearThemeChangingClassNameTimeout = useRef()

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  useEffect(() => {
    if (lottieTimeTarget !== 0) {
      return
    }
    setLottieTimeTarget((s) => (toggled ? s + 1000 : s))
  }, [toggled, lottieTimeTarget])

  useSpring({
    config: { duration: 1000 },
    from: { time: 0 },
    time: lottieTimeTarget,
    onStart: useCallback(() => {
      clearTimeout(onRestClearThemeChangingClassNameTimeout.current)
      document.body.classList.add(THEME_CHANGING_CLASS_NAME)
    }, []),
    onChange: useCallback(
      ({ value: { time } }) => {
        if (lottieAnimation) {
          lottieAnimation.goToAndStop(time % 2000)
        }
      },
      [lottieAnimation]
    ),
    onRest: useCallback(() => {
      onRestClearThemeChangingClassNameTimeout.current = setTimeout(() => {
        document.body.classList.remove(THEME_CHANGING_CLASS_NAME)
      }, 500)
    }, []),
  })

  return (
    <StyledToggleTheme
      onClick={useCallback(() => {
        setLottieTimeTarget((s) => {
          const nextTime = s + 1000
          if (typeof onChange === 'function') {
            setTimeout(() => {
              if (isMounted.current) {
                const enabled = nextTime % 2000 === 1000
                onChange(enabled)
                event('theme_toggle', {
                  dark: enabled,
                  darkEnabled: enabled ? 'yes' : 'no',
                })
              }
            }, 500)
          }
          return nextTime
        })
      }, [onChange, lottieTimeTarget])}
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
