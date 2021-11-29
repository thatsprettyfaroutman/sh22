import styled from 'styled-components'

const Heading1 = styled.h1`
  margin: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 1px;
`

const Body = styled.p`
  margin: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 36px;
  opacity: 0.8;
`

const Button = styled.div`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0.01em;
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
`

export const Text = {
  Heading1,
  Body,
  Button,
  Tag,
}
