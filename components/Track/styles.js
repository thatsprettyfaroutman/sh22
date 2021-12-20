import styled, { css } from 'styled-components'
import { a } from 'react-spring'

import { media } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'
import { Text } from '@components/Text'
import { Bite } from '@components/Bite'

export const Track = styled.a`
  display: block;
  background-color: ${(p) => p.theme.color.track.fg};
  border-radius: 8px;
  text-decoration: none;

  > div {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 24px;
    grid-row-gap: 8px;
    padding: 24px 32px;
    align-items: center;
    justify-items: start;
    border-radius: inherit;
    background-color: ${(p) => p.theme.color.track.bg};
    color: ${(p) => p.theme.color.track.fg};
    border: 3px solid ${(p) => p.theme.color.track.fg};
    pointer-events: none;

    ${media.phone} {
      grid-template-columns: auto 1fr;
    }
  }

  .no-js & {
    > div {
      transition: transform 120ms ease-in-out;
      transform: translate3d(0, -4px, 0) !important;
    }
    :hover > div {
      transform: translate3d(0, -8px, 0) !important;

      > :first-child {
        ${NO_JS_ANIM.danceRolly};
        animation-delay: 0s;
      }
    }
  }
`

export const TrackIcon = styled(a.div)`
  display: flex;
  align-items: center;

  :empty {
    background-color: ${(p) => p.theme.color.track.fg};
    opacity: 0.05;
  }

  ${media.phone} {
    grid-row: 1/3;
  }
`

export const Title = styled(Text.Heading2)`
  text-align: left;
`

export const OpensAtText = styled(Text.Small)`
  text-align: left;
`

export const BiteMarks = styled(Bite.B)`
  display: none;
  > path {
    fill: ${(p) => p.theme.color.track.fg};
  }
  a:last-child > div > & {
    position: absolute;
    display: block;
    bottom: -1px;
    right: 20%;
    transform: rotate(180deg);
  }
`

export const BiteMarksOuter = styled(BiteMarks)`
  > path {
    fill: ${(p) => p.theme.color.section.tracks.bg};
  }
  a:last-child > div > & {
    bottom: -10px;
    transform: rotate(180deg) scale(0.95, 1.4);
  }
`
