import { getHomeSections } from '@util/contentfulPosts'

import styled from 'styled-components'
import { Text } from '@components/Text'
import { Hero } from '@components/Hero'
import { Section } from '@components/Section'
import { Footer } from '@components/Footer'

const AppStyled = styled.main``

const SECTION = {
  hero: Hero,
  about: ({ section }) => (
    <Section>
      <Text.Heading1>{section.title}</Text.Heading1>
    </Section>
  ),
  tracks: ({ section }) => (
    <Section>
      <Text.Heading1>{section.title}</Text.Heading1>
    </Section>
  ),
  alumn: ({ section }) => (
    <Section>
      <Text.Heading1>{section.title}</Text.Heading1>
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
    <AppStyled {...restProps}>
      {sections.map((section) => {
        const Section = SECTION[section.link]
        if (!Section) {
          return null
        }
        return <Section key={section.id} section={section} />
      })}
    </AppStyled>
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
