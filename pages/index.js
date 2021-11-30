import { getHomeSections } from '@util/contentfulPosts'

import styled from 'styled-components'

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
            data-section-link={section.link}
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
