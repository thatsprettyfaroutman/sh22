import { useEffect } from 'react'

const SH_BANNER = `
       __   ___  ___
  ___ / /  |_  ||_  |
 (_-</ _ \\/ __// __/
/___/_//_/____/____/

SUMMER HUNTERS 2022
`

export const useConsoleNavigation = (tracks, currentTrack) => {
  // init
  useEffect(() => {
    const t = setTimeout(() => {
      if (process.env.NODE_ENV === 'production') {
        console.clear()
      }
      console.log(
        '%c ',
        ` background-image: url(${
          window.location.origin
        }/images/pixel-porcuboi.gif), url(${
          window.location.origin
        }/images/pixel-duckyduck.gif);
          padding-bottom: 64px;
          padding-left: ${64 * 2}px;
          margin: 20px;
          background-size: contain;
          background-position: -12px 0, 60px 0;
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
      console.log(
        `\n\nWe have ${tracks.length} tracks available for you:\n\n`,
        tracks
          ?.filter((track) => new Date(track.opensAt) <= now)
          .map((track) => {
            const link = track.type.toLowerCase()
            window[link] = () => {
              window.location.pathname = `/track/${link}`
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
