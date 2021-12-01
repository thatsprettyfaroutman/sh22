import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'
import { ThemeColorProvider } from '@contexts/themeColor'

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

const theme = {
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500&family=Raleway&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ThemeColorProvider>
          <InfiniteSpringProvider>
            <Component {...pageProps} />
          </InfiniteSpringProvider>
        </ThemeColorProvider>
      </ThemeProvider>
    </>
  )
}
