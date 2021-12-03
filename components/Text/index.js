import styled from 'styled-components'
import { media } from '@styles/theme'

const Heading1 = styled.h1`
  margin: 0;
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

const Heading2 = styled.h2`
  margin: 0;
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

const Body = styled.p`
  margin: 0;
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

const Button = styled.div`
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

const Tag = styled.div`
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

const Small = styled.div`
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

export const Text = {
  Heading1,
  Heading2,
  Body,
  Button,
  Tag,
  Small,
}
