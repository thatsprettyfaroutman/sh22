import { getHomeSections } from '@util/contentfulPosts'

import styled from 'styled-components'
import { Text } from '@components/Text'
import { SwingyFrame } from '@components/SwingyFrame'
import { Section } from '@components/Section'

import { Hero } from '@sections/Hero'
import { About } from '@sections/About'
import { Tracks } from '@sections/Tracks'
import { Footer } from '@sections/Footer'

const SApp = styled.main``

const SECTION_MAP = {
  hero: Hero,
  about: About,
  tracks: Tracks,
  alumn: ({ section }) => (
    <Section>
      <Text.Heading1>{section.title}</Text.Heading1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <SwingyFrame />
      </div>
    </Section>
  ),
  contacts: ({ section }) => (
    <Footer>
      <Text.Heading1>{section.title}</Text.Heading1>
      <p>1 some content</p>
      <p>2 some content</p>
      <p>3 some content</p>
      <p>4 some content</p>
      <p>5 some content</p>
    </Footer>
  ),
}

export default function Home({ sections, ...restProps }) {
  console.log(sections)

  return (
    <SApp {...restProps}>
      {sections.map((section) => {
        const Section = SECTION_MAP[section.link]
        if (!Section) {
          return null
        }
        return <Section key={section.contentType} section={section} />
      })}
    </SApp>
  )
}

export async function getStaticProps() {
  const sections = await getHomeSections()
  console.log(sections)
  return {
    props: {
      sections,
    },
  }
}
