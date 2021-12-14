import window from 'handle-window-undefined'
import { useEffect } from 'react'
import { basePath } from '@util/basePath'

const SH_BANNER = `
       __   ___  ___
  ___ / /  |_  ||_  |
 (_-</ _ \\/ __// __/
/___/_//_/____/____/

SUMMER HUNTERS 2022
`

const getPorcuAndDucky = () => {
  const ROOT = `${window.location.origin}${basePath}`
  return `background-image: url(${ROOT}/images/pixel-porcuboi.gif), url(${ROOT}/images/pixel-duckyduck.gif);
  background-position: 0 0, ${80 * 1.25}px 0;`
}

const getSnekAndPopsicle = () => {
  const ROOT = `${window.location.origin}${basePath}`
  return `background-image: url(${ROOT}/images/pixel-snek.gif), url(${ROOT}/images/pixel-popsicle.gif);
  background-position: 0 0, ${80 * 1.25}px 0;`
}

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
  }, [currentTrack])

  useEffect(() => {
    window.tracks = () => {
      const now = new Date()
      console.log(
        `\n\nWe have ${tracks.length} tracks available for you:\n\n`,
        tracks
          ?.filter((track) => new Date(track.opensAt) <= now)
          .map((track) => {
            const link = track.type.toLowerCase()
            window[link] = () => {
              window.location.search = `?track=${link}`
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
        window.location = currentTrack.href
      }, 1000)
      return `🦔 Executing -- apply()`
    }
  }, [currentTrack])
}
