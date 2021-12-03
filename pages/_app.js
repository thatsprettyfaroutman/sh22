import window from 'handle-window-undefined'
import { useState, useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import chroma from 'chroma-js'
import Head from 'next/head'
// Use this to detect dark mode from os
// import useDarkMode from 'use-dark-mode'
import { useDarkMode } from '@hooks/useDarkMode'
import { combineComponents } from '@helpers/combineComponents'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'
import { ThemeColorProvider } from '@contexts/themeColor'
import { Logo } from '@components/Logo'

const Providers = combineComponents(
  ThemeProvider,
  InfiniteSpringProvider,
  ThemeColorProvider
)

const GlobalStyle = createGlobalStyle`
 html, body {
     margin: 0;
     background-color: ${({ theme }) => theme.color.main.bg};
     font-family: Montserrat, sans-serif;
     font-size: 16px;
     line-height: 1.6;
     color: ${({ theme }) => theme.color.main.fg};
   }

   *, *::after, *::before {
     box-sizing: border-box;
   }
`

const themeLight = {
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
  },
}

const themeDark = {
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
  },
}

export default function App({ Component, pageProps }) {
  // Use this to detect dark mode from os
  // const { value:enabled } = useDarkMode(false, { storageKey: null, onChange: null })
  const [enabled] = useDarkMode()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const theme = mounted && enabled ? themeDark : themeLight

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500&family=Raleway&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Providers theme={theme}>
        <Logo />
        <GlobalStyle />
        <Component {...pageProps} />
      </Providers>
    </>
  )
}
