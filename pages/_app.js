import { useState, useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
// Use this to detect dark mode from os
// import useDarkMode from 'use-dark-mode'
import { useDarkMode } from '@hooks/useDarkMode'
import { combineComponents } from '@helpers/combineComponents'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'
import { ThemeColorProvider } from '@contexts/themeColor'

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
    main: { bg: '#fff', fg: '#101010' },
    section: {
      hero: { bg: '#E5FBFF', fg: '#101010' },
      about: { bg: '#fff', fg: '#101010' },
      tracks: { bg: '#FFFAE5', fg: '#101010' },
      alumni: { bg: '#fff', fg: '#101010' },
      contacts: { bg: '#1D1D1B', fg: '#fff' },
    },
    track: { bg: '#fff', fg: '#1D1D1B' },
    footer: { bg: '#1D1D1B', fg: '#fff' },
    button: { bg: '#ffd31a', fg: '#101010' },
    link: { bg: 'transparent', fg: '#5462DB' },
  },
}

const themeDark = {
  color: {
    main: { bg: '#000008', fg: '#fff' },
    section: {
      hero: { bg: '#000010', fg: '#E5FBFF' },
      about: { bg: '#000008', fg: '#fff' },
      tracks: { bg: '#100010', fg: '#FFFAE5' },
      alumni: { bg: '#000008', fg: '#fff' },
      contacts: { bg: 'transparent', fg: 'transparent' },
    },
    track: { bg: '#100010', fg: '#fff' },
    footer: { bg: '#000820', fg: '#fff' },
    button: { bg: '#101010', fg: '#ffd31a' },
    link: { bg: 'transparent', fg: '#5462DB' },
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
        <GlobalStyle />
        <Component {...pageProps} />
      </Providers>
    </>
  )
}
