import { getSection } from '@util/contentfulPosts'

import styled from 'styled-components'

import { TrackHead } from '@sections/TrackHead'
import { TrackBody } from '@sections/TrackBody'
import { Contacts } from '@sections/Contacts'

// TODO: visuals
// TODO: console nav

const StyledTrack = styled.div``

export default function Track({ track, contactsSection, ...restProps }) {
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
      track: tracks.find((x) => x.type.toLowerCase() === type),
      contactsSection,
    },
  }
}
