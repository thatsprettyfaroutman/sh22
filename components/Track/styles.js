import styled, { css } from 'styled-components'
import { a } from 'react-spring'

import { media } from '@styles/theme'
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
    gap: 24px;
    padding: 24px 32px;
    align-items: center;
    justify-items: start;
    border-radius: inherit;
    background-color: ${(p) => p.theme.color.track.bg};
    color: ${(p) => p.theme.color.track.fg};
    border: 3px solid ${(p) => p.theme.color.track.fg};
    pointer-events: none;

    ${media.tablet} {
      grid-template-columns: 1fr auto;

      ${(p) =>
        !p.$isOpen &&
        css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          > :nth-child(3) {
            margin-top: -24px;
          }
        `};
    }
  }
`

export const TrackIcon = styled(a.div)`
  display: flex;
  align-items: center;
  min-width: 70px;
  min-height: 70px;

  :empty {
    background-color: ${(p) => p.theme.color.track.fg};
    opacity: 0.05;
  }

  @media (max-width: 780px) {
    grid-column: 1/3;
    margin-right: auto;
  }
`

export const Title = styled(Text.Heading2)`
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
