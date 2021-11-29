import { getHomeSections } from '@util/contentfulPosts'

import styled from 'styled-components'
import { Text } from '@components/Text'
import { SwingyFrame } from '@components/SwingyFrame'
import { Section } from '@components/Section'
import { Footer } from '@components/Footer'

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
        console.log(section.contentType)
        const Section = SECTION_MAP[section.link]
        if (!Section) {
          return null
        }
        return <Section key={section.contentType} section={section} />
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
