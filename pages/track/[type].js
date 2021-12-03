import { getSection } from '@util/contentfulPosts'

import styled from 'styled-components'

import { TrackHead } from '@components/TrackHead'

// TODO: visuals
// TODO: console nav

const StyledTrack = styled.div`
  display: grid;
`

export default function Track({ track, ...restProps }) {
  console.log(track)

  return (
    <StyledTrack {...restProps}>
      <TrackHead track={track} />
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
  return {
    props: {
      track: tracks.find((x) => x.type.toLowerCase() === type),
    },
  }
}
