import { useState, useEffect, useRef } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'
// Use this to detect dark mode from os
// import useDarkMode from 'use-dark-mode'
import { useDarkMode } from '@hooks/useDarkMode'
import { pageview } from '@util/ga'
import { themeDark, themeLight } from '@styles/theme'
import { combineComponents } from '@helpers/combineComponents'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'
import { ThemeColorProvider } from '@contexts/themeColor'
import { Hud } from '@components/Hud'
import { ToggleTheme, THEME_CHANGING_CLASS_NAME } from '@components/ToggleTheme'

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

   .${THEME_CHANGING_CLASS_NAME} {
     section, h1, h2, p, button > div {
      transition-property: background-color, color;
      transition-duration: 250ms;
       transition-timing-function: ease-in-out;
    }
   }
`

export default function App({ Component, pageProps }) {
  // Use this to detect dark mode from os
  // const { value: enabled } = useDarkMode(false, {
  //   storageKey: null,
  //   onChange: null,
  // })
  const [enabled, setEnabled] = useDarkMode()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const theme = mounted && enabled ? themeDark : themeLight

  useEffect(() => {
    document.body.classList.remove('no-js')
  }, [])

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Red+Hat+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Providers theme={theme}>
        <Hud>
          <ToggleTheme toggled={enabled} onChange={setEnabled} />
        </Hud>
        <GlobalStyle />
        <Component {...pageProps} />
      </Providers>
    </>
  )
}
