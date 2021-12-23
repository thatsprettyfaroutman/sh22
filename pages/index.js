import { getHomeSections, getSeo } from '@util/contentfulPosts'

import { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { useThemeColorContext } from '@contexts/themeColor'
import { useConsoleNavigation } from '@hooks/useConsoleNavigation'
import { SeoHead } from '@components/SeoHead'

import { Hero } from '@sections/Hero'
import { About } from '@sections/About'
import { Tracks } from '@sections/Tracks'
import { Alumni } from '@sections/Alumni'
import { Slack } from '@sections/Slack'
import { Contacts } from '@sections/Contacts'

const StyledApp = styled.main``

const SECTION_MAP = {
  hero: Hero,
  about: About,
  tracks: Tracks,
  alumni: Alumni,
  slack: Slack,
  contacts: Contacts,
}

export default function Home({ sections, seo, ...restProps }) {
  const { setSectionOrder } = useThemeColorContext()
  useConsoleNavigation(
    useMemo(() => sections.find((x) => x.link === 'tracks')?.tracks, [sections])
  )

  useEffect(() => {
    setSectionOrder(sections.map((x) => x.link))
  }, [sections])

  return (
    <>
      <SeoHead {...seo} />
      <StyledApp {...restProps}>
        {sections.map((section) => {
          const Section = SECTION_MAP[section.link]
          if (!Section) {
            return null
          }
          return (
            <Section
              key={section.contentType}
              section={section}
              // data-section-link is used for scrolling
              data-section-link={section.link}
              name={section.link}
            />
          )
        })}
      </StyledApp>
    </>
  )
}

export async function getStaticProps() {
  const [seo, sections] = await Promise.all([getSeo(), getHomeSections()])
  return {
    props: {
      sections,
      seo,
    },
  }
}
