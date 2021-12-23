import window from 'handle-window-undefined'
import { useEffect } from 'react'

import { event } from '@util/ga'

import {
  PORCUBOI_GIF_URL,
  DUCKYDUCK_GIF_URL,
  SNEK_GIF_URL,
  POPSICLE_GIF_URL,
} from '@util/gifDataUrls'

const SH_BANNER = `
       __   ___  ___
  ___ / /  |_  ||_  |
 (_-</ _ \\/ __// __/
/___/_//_/____/____/

SUMMER HUNTERS 2022
`

const getPorcuAndDucky = () =>
  `background-image: url(${PORCUBOI_GIF_URL}), url(${DUCKYDUCK_GIF_URL});`

const getSnekAndPopsicle = () =>
  `background-image: url(${SNEK_GIF_URL}), url(${POPSICLE_GIF_URL});`

export const useConsoleNavigation = (tracks, currentTrack) => {
  // init
  useEffect(() => {
    const t = setTimeout(() => {
      if (process.env.NODE_ENV === 'production') {
        console.clear()
      }
      console.log(
        '%c ',
        `
          margin-top: 20px;
          ${currentTrack ? getSnekAndPopsicle() : getPorcuAndDucky()};
          background-position: 0 0, ${80 * 1.25}px 0;
          padding-top: 80px;
          padding-left: ${80 * 2.5}px;
          background-size: 80px 80px, 80px 80px;
          background-repeat: no-repeat;
        `,
        `

${
  currentTrack
    ? `Congratulations!

You've chosen the \`${currentTrack.title}\` track
    
${currentTrack.description}

To apply for this track, type:

-> apply()

To see other tracks, type:

-> tracks()

`
    : `So, you found the magical key-combination
that opens up the console! Excellent job!

Try typing:

-> tracks()`
}

${SH_BANNER}


`
      )
    }, 1000)

    return () => {
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    window.tracks = () => {
      const now = new Date()

      const openTracks =
        tracks?.filter((track) => new Date(track.opensAt) <= now) || []

      const isNoTracksAvailable = !openTracks.length

      try {
        event('console_cmd_tracks', {
          tracks: openTracks.map((x) => x.type).sort(),
        })
      } catch (err) {}

      if (isNoTracksAvailable) {
        console.log(`\n\nNo tracks available at this point.\n\n`)
        return '🦔 Completed -- tracks()'
      }

      console.log(
        `\n\nWe have ${openTracks.length} tracks available for you:\n\n`,
        openTracks
          .map((track) => {
            const link = track.type.toLowerCase()
            window[link] = () => {
              window.location.pathname = `/track/${link}`
              try {
                event(`console_cmd_${link}`, {
                  track: track.type,
                })
              } catch (err) {}
              return `🦔 Executing -- ${link}()`
            }

            return `
${track.title}
-> ${link}()`
          })
          .join('\n'),
        '\n\n'
      )
      return '🦔 Completed -- tracks()'
    }
  }, [tracks])

  useEffect(() => {
    if (!currentTrack) {
      return
    }
    window.apply = () => {
      setTimeout(() => {
        if (!currentTrack.href) {
          console.error('🦔 Unable to execute -- apply()')
          return
        }
        try {
          event(`console_cmd_apply`, {
            track: currentTrack.type,
          })
        } catch (err) {}
        window.location = currentTrack.href
      }, 1000)
      return `🦔 Executing -- apply()`
    }
  }, [currentTrack])
}
