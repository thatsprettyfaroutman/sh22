import { useEffect, forwardRef } from 'react'
import styled from 'styled-components'
import mergeRefs from 'react-merge-refs'
import { useInView } from 'react-intersection-observer'
import { useThemeColorContext } from '@contexts/themeColor'
import { media } from '@styles/theme'

const StyledSection = styled.section`
  min-height: max(768px, 100vh);

  ${media.phone} {
    min-height: max(667px, 100vh);
  }
`

export const Section = forwardRef(({ name, ...restProps }, forwardedRef) => {
  const { ref: inViewRef, inView } = useInView()
  const { setSection } = useThemeColorContext()

  useEffect(() => {
    setSection(name, inView)
  }, [setSection, name, inView])

  return (
    <StyledSection ref={mergeRefs([forwardedRef, inViewRef])} {...restProps} />
  )
})
Section.displayName = 'Section'
