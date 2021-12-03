import chroma from 'chroma-js'
import { isNil } from 'ramda'

export const BREAKPOINT = {
  tabletWide: 1024,
  tablet: 768,
  phone: 767,
}

export const SCALE = {
  tabletWide: 1,
  tablet: 0.8,
  phone: 0.6,
}

export const themeLight = {
  breakpoints: BREAKPOINT,
  scale: SCALE,
  color: {
    logo: { bg: chroma('#1F1D1D').alpha(0).css('rgba'), fg: '#1F1D1D' },
    main: { bg: '#ffffff', fg: '#101010' },
    section: {
      hero: { bg: '#E5FBFF', fg: '#101010' },
      about: { bg: '#ffffff', fg: '#101010' },
      tracks: { bg: '#FFFAE5', fg: '#101010' },
      alumni: { bg: '#ffffff', fg: '#101010' },
      contacts: { bg: '#1D1D1B', fg: '#ffffff' },
    },
    track: { bg: '#ffffff', fg: '#1D1D1B' },
    footer: { bg: '#1D1D1B', fg: '#ffffff' },
    button: { bg: '#ffd31a', fg: '#101010' },
    link: { bg: chroma('#5462DB').alpha(0).css('rgba'), fg: '#5462DB' },

    trackHead: { bg: '#FFFAE5', fg: '#1D1D1B' },
  },
}

export const themeDark = {
  breakpoints: BREAKPOINT,
  scale: SCALE,
  color: {
    logo: { bg: chroma('#ffffff').alpha(0).css('rgba'), fg: '#ffffff' },
    main: { bg: '#000008', fg: '#ffffff' },
    section: {
      hero: { bg: '#000010', fg: '#E5FBFF' },
      about: { bg: '#000008', fg: '#ffffff' },
      tracks: { bg: '#100010', fg: '#FFFAE5' },
      alumni: { bg: '#000008', fg: '#ffffff' },
      contacts: { bg: '#000820', fg: '#ffffff' },
    },
    track: { bg: '#100010', fg: '#ffffff' },
    footer: { bg: '#000820', fg: '#ffffff' },
    button: { bg: '#101010', fg: '#ffd31a' },
    link: { bg: chroma('#5462DB').alpha(0).css('rgba'), fg: '#5462DB' },

    trackHead: { bg: '#FFFAE5', fg: '#1D1D1B' },
  },
}

export const media = Object.keys(BREAKPOINT)
  .map((breakpoint) => [
    breakpoint,
    ({ theme }) => `@media (max-width: ${theme.breakpoints[breakpoint]}px)`,
  ])
  .reduce((acc, [breakpoint, maxWidthFn]) => {
    acc[breakpoint] = maxWidthFn
    return acc
  }, {})

export const scale = Object.keys(SCALE)
  .map((key) => [
    key,
    (num) => {
      if (isNil(num)) {
        throw new Error(`scale, \`num\` cannot be nil ${num}`)
      }
      return ({ theme }) => theme.scale[key] * num
    },
  ])
  .reduce((acc, [key, scaleFn]) => {
    acc[key] = scaleFn
    return acc
  }, {})
