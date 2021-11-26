import { createGlobalStyle, ThemeProvider } from 'styled-components'
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
    '#FFFFFF', // fg
    '#EE295C', // accent 1 pink
    '#FFD166', // accent 2 gold
    '#3459DC', //  accent 3 blue
  ],
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <InfiniteSpringProvider>
        <Component {...pageProps} />
      </InfiniteSpringProvider>
    </ThemeProvider>
  )
}
