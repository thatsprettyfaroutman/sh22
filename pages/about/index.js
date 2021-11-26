import { getSection } from '@util/contentfulPosts'
import Head from 'next/head'
import Link from 'next/link'

export default function About(props) {
  return (
    <div className="container">
      <Head>
        <title>ABOUT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <Link href="/">home</Link>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const props = await getSection('aboutSection')
  return {
    props,
  }
}
