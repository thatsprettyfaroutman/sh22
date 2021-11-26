import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'

const GlobalStyle = createGlobalStyle`
 html, body {
     margin: 0;
     background-color: ${({ theme }) => theme.palette[0]};
     font-family: Montserrat, sans-serif;
     font-size: 16px;
     line-height: 1.6;
     color: ${({ theme }) => theme.palette[2]};
   }

   *, *::after, *::before {
     box-sizing: border-box;
   }
`

const theme = {
  palette: [
    '#E5FBFF', // bg
    '#171E3A', // card bg
    '#101010', // fg
    '#EE295C', // accent 1 pink
    '#FFD166', // accent 2 gold
    '#3459DC', //  accent 3 blue
  ],
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
        <InfiniteSpringProvider>
          <Component {...pageProps} />
        </InfiniteSpringProvider>
      </ThemeProvider>
    </>
  )
}
