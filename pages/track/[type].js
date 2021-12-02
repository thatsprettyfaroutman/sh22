import { getSection } from '@util/contentfulPosts'

export default function Track({ track, ...restProps }) {
  return <div {...restProps}>track page {track.type}</div>
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
