import { getHomeSections } from '@util/contentfulPosts'

import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { useThemeColorContext } from '@contexts/themeColor'
import { useConsoleNavigation } from '@hooks/useConsoleNavigation'

import { Hero } from '@sections/Hero'
import { About } from '@sections/About'
import { Tracks } from '@sections/Tracks'
import { Alumni } from '@sections/Alumni'
import { Contacts } from '@sections/Contacts'

const StyledApp = styled.main``

const SECTION_MAP = {
  hero: Hero,
  about: About,
  tracks: Tracks,
  alumni: Alumni,
  contacts: Contacts,
}

export default function Home({ sections, ...restProps }) {
  const router = useRouter()
  const { setSectionOrder } = useThemeColorContext()

  useConsoleNavigation(
    useMemo(() => sections.find((x) => x.link === 'tracks')?.tracks, [sections])
  )

  useEffect(() => {
    setSectionOrder(sections.map((x) => x.link))
  }, [sections])

  // Handle initial routing
  useEffect(() => {
    const tracks = sections
      .find((x) => x.link === 'tracks')
      ?.tracks?.map((x) => x.type.toLowerCase())

    const params = new URLSearchParams(window.location.search)
    const track = params.get('track')

    if (!track) {
      return
    }

    if (tracks.includes(track.toLowerCase())) {
      router.push(
        {
          pathname: '/track/[type]',
          query: { type: track },
        },
        `?track=${track}`,
        { shallow: true }
      )
    }
  }, [sections, router])

  return (
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
  )
}

export async function getStaticProps() {
  const sections = await getHomeSections()
  return {
    props: {
      sections,
    },
  }
}
