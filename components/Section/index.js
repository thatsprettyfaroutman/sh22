import { useEffect } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { useThemeColorContext } from '@contexts/themeColor'

const StyledSection = styled.section`
  /* min-height: min(800px, calc(100vh - 64px)); */
  /* min-height: min(1024px, 100vh); */
  min-height: max(768px, 100vh);

  @media (max-width: 767px) {
    min-height: max(667px, 100vh);
  }
`

export const Section = ({ name, ...restProps }) => {
  const { ref: inViewRef, inView } = useInView()
  const { setSection } = useThemeColorContext()

  useEffect(() => {
    setSection(name, inView)
  }, [setSection, name, inView])

  return <StyledSection ref={inViewRef} {...restProps} />
}
