import window from 'handle-window-undefined'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useInView, InView } from 'react-intersection-observer'
import mergeRefs from 'react-merge-refs'
import { useThemeColorContext } from '@contexts/themeColor'
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'

const StyledSection = styled.section`
  /* min-height: min(800px, calc(100vh - 64px)); */
  /* min-height: min(1024px, 100vh); */
  min-height: max(800px, 100vh);
`

export const Section = ({ name, ...restProps }) => {
  const ref = useRef()
  const { ref: inViewRef, inView } = useInView()
  const { setSection } = useThemeColorContext()

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }
    const color = window
      .getComputedStyle(el)
      .getPropertyValue('background-color')

    setSection(name, inView, color)
  }, [inView, name, setSection])

  return <StyledSection ref={mergeRefs([ref, inViewRef])} {...restProps} />
}
