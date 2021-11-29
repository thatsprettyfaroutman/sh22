import styled from 'styled-components'
import { a } from 'react-spring'

const StyledArrow = styled(a.svg)`
  > path {
    stroke: ${({ theme }) => theme.color.link.fg};
  }
`

export const Arrow = (props) => {
  return (
    <StyledArrow width={20} height={16} fill="none" {...props}>
      <path
        d="M2 7.944h15.093M12.383 2.383l1.16 1.817A10.028 10.028 0 0018 8v0a10.028 10.028 0 00-4.457 3.8l-1.16 1.817"
        stroke="#5462DB"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledArrow>
  )
}
