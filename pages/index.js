import { getHomeSections } from '@util/contentfulPosts'

import styled from 'styled-components'
import chroma from 'chroma-js'
import { InfiniteSpringProvider } from '@contexts/infiniteSpring'
import { Hero } from '@components/Hero'
import { Lottie } from '@components/Lottie'
import { Footer } from '@components/Footer'

import duckyduck from '@lotties/duckyduck2.lottie.json'
import porcuboi from '@lotties/porcuboi.lottie.json'

const AppStyled = styled.div`
  > section {
    position: relative;
    min-height: min(800px, calc(100vh - 64px));

    :nth-child(odd) {
      background-color: ${(p) =>
        chroma(p.theme.palette[0]).brighten(0.4).css()};
    }
  }
`

const Ducks = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  > * {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: -80px;
    width: 229px; // duckyduck width
  }

  > :nth-child(1) {
    width: 278px; // porcuboi width
    transform: scale(0.72);
    margin-bottom: -121px;
  }

  > :nth-child(1) {
    /* margin-left: 110px; */
  }

  > :nth-child(2),
  > :nth-child(3) {
    left: auto;
    right: 0;
  }

  > :nth-child(3) {
    margin-right: 110px;
  }
`

export default function Home(props) {
  // console.log(props)
  return (
    <AppStyled>
      <section>
        <Hero />
        <Ducks>
          <Lottie animationData={porcuboi} />
          <Lottie animationData={duckyduck} />
          <Lottie animationData={duckyduck} animationOffset={500} />
        </Ducks>
      </section>
      <section />
      <Footer>
        <p>1 some content</p>
        <p>2 some content</p>
        <p>3 some content</p>
        <p>4 some content</p>
        <p>5 some content</p>
      </Footer>
    </AppStyled>
  )
}

export async function getStaticProps() {
  const sections = await getHomeSections()
  return {
    props: {
      sections,
    },
  }
}
