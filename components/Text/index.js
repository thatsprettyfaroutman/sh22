import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'

import { media } from '@styles/theme'

const headingMegaStyle = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 77px;
  letter-spacing: 1px;
  ${media.phone} {
    font-size: 32px;
    line-height: 36px;
  }
`
const HeadingMega = styled.h1`
  margin: 0;
  ${headingMegaStyle};
`

const heading1Style = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 1px;
  ${media.phone} {
    font-size: 22px;
    line-height: 32px;
  }
`
const Heading1 = styled.h1`
  margin: 0;
  ${heading1Style};
`

const heading2Style = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.01em;
  ${media.phone} {
    font-size: 18px;
    line-height: 28px;
  }
`
const Heading2 = styled.h2`
  margin: 0;
  ${heading2Style};
`

const bodyStyle = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 36px;
  opacity: 0.8;
  ${media.phone} {
    font-size: 16px;
    line-height: 26px;
  }
`
const Body = styled.p`
  margin: 0;
  ${bodyStyle};
`

const buttonStyle = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0.01em;
  ${media.phone} {
    line-height: 26px;
  }
`
const Button = styled.div`
  ${buttonStyle};
`

const tagStyle = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.8;
  ${media.phone} {
    font-size: 12px;
    line-height: 19px;
  }
`
const Tag = styled.div`
  ${tagStyle};
`

const smallStyle = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0.01em;
  opacity: 0.7;
  ${media.phone} {
    font-size: 10px;
    line-height: 16px;
  }
`
const Small = styled.div`
  ${smallStyle};
`

const Markdown = styled(ReactMarkdown)`
  font-family: Inter, sans-serif;

  > * {
    margin: 0;
  }

  > :not(:last-child) {
    margin-bottom: 16px;
  }

  > h1 {
    :not(:first-child) {
      margin-top: 64px;
    }
    ${heading1Style};
  }

  > h2,
  > h3,
  > h4,
  > h5,
  > h6 {
    margin-top: 32px;
    ${heading2Style};
  }

  > p {
    ${bodyStyle};
  }
`

export const Text = {
  HeadingMega,
  Heading1,
  Heading2,
  Body,
  Button,
  Tag,
  Small,
  Markdown,
}
