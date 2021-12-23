import { getSection, getSeo } from '@util/contentfulPosts'

import Head from 'next/head'
import styled from 'styled-components'
import { pick } from 'ramda'

import { useConsoleNavigation } from '@hooks/useConsoleNavigation'
import { SeoHead } from '@components/SeoHead'
import { TrackHead } from '@sections/TrackHead'
import { TrackBody } from '@sections/TrackBody'
import { Tracks } from '@sections/Tracks'
import { Contacts } from '@sections/Contacts'

const StyledTrack = styled.div``

export default function Track({
  track,
  trackList,
  contactsSection,
  tracksSection,
  seo,
  ...restProps
}) {
  useConsoleNavigation(trackList, track)

  return (
    <>
      <SeoHead {...seo} />
      <Head>
        <title>{track.title} | Summer Hunters 2022</title>
      </Head>
      <StyledTrack {...restProps}>
        <TrackHead track={track} key={track.type} />
        <TrackBody track={track} />
        <Tracks isSimple section={tracksSection} omitTrack={track} />
        <Contacts
          section={contactsSection}
          isBfodaasDisabled
          isFooterEatingDisabled
        />
      </StyledTrack>
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const { tracks } = await getSection('tracksSection')
  return {
    paths: tracks.map((x) => ({
      params: { type: x.type.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params: { type } }) {
  const [contactsSection, tracksSection, seo] = await Promise.all([
    getSection('sectionContacts'),
    getSection('tracksSection'),
    getSeo(),
  ])

  const { tracks } = tracksSection

  return {
    props: {
      trackList: tracks.map(pick(['type', 'title', 'link', 'opensAt'])),
      track: tracks.find((x) => x.type.toLowerCase() === type),
      contactsSection,
      tracksSection,
      seo,
    },
  }
}
