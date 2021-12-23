import { getSection, getSubpages, getSeo } from '@util/contentfulPosts'

import Head from 'next/head'
import styled from 'styled-components'
import chroma from 'chroma-js'

import { SeoHead } from '@components/SeoHead'
import { TrackHead } from '@sections/TrackHead'
import { TrackBody } from '@sections/TrackBody'
import { Contacts } from '@sections/Contacts'

const StyledSubpage = styled.div``

const SubpageHead = styled(TrackHead)`
  background-color: ${(p) => p.theme.color.section.hero.bg};
  color: ${(p) => p.theme.color.section.hero.fg};
  > div {
    padding-bottom: 64px;
  }
`

const SubpageBody = styled(TrackBody)`
  > div {
    padding-top: 64px;
    padding-bottom: 64px;

    p {
      opacity: 1;
      color: ${(p) => chroma(p.theme.color.main.fg).alpha(0.8).css()};
    }
  }
`

export default function Subpage({
  subpage,
  contactsSection,
  seo,
  ...restProps
}) {
  return (
    <>
      <SeoHead {...seo} />
      <Head>
        <title>{subpage.title} | Summer Hunters 2022</title>
      </Head>
      <StyledSubpage {...restProps}>
        <SubpageHead track={subpage}></SubpageHead>
        <SubpageBody track={subpage}></SubpageBody>
        <Contacts
          section={contactsSection}
          isBfodaasDisabled
          isFooterEatingDisabled
        />
      </StyledSubpage>
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible subpages
  const items = await getSubpages()
  return {
    paths: items.map((x) => ({
      params: { subpageRoute: x.route.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params: { subpageRoute } }) {
  const [contactsSection, subpages, seo] = await Promise.all([
    getSection('sectionContacts'),
    getSubpages(),
    getSeo(),
  ])

  return {
    props: {
      subpage: subpages.find((x) => x.route.toLowerCase() === subpageRoute),
      contactsSection,
      seo,
    },
  }
}
