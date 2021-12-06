import { getSection } from '@util/contentfulPosts'

import styled from 'styled-components'
import { pick } from 'ramda'

import { useConsoleNavigation } from '@hooks/useConsoleNavigation'
import { TrackHead } from '@sections/TrackHead'
import { TrackBody } from '@sections/TrackBody'
import { Contacts } from '@sections/Contacts'

// TODO: visuals
// TODO: console nav

const StyledTrack = styled.div``

export default function Track({
  track,
  trackList,
  contactsSection,
  ...restProps
}) {
  useConsoleNavigation(trackList, track)

  return (
    <StyledTrack {...restProps}>
      <TrackHead track={track} />
      <TrackBody track={track} />
      <Contacts
        section={contactsSection}
        isBfodaasDisabled
        isFooterEatingDisabled
      />
    </StyledTrack>
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
  const { tracks } = await getSection('tracksSection')
  const contactsSection = await getSection('sectionContacts')

  return {
    props: {
      trackList: tracks.map(pick(['type', 'title', 'link', 'opensAt'])),
      track: tracks.find((x) => x.type.toLowerCase() === type),
      contactsSection,
    },
  }
}
