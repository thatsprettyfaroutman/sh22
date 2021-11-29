import styled from 'styled-components'

const StyledBite = styled.svg`
  pointer-events: none;
`

const A = (props) => (
  <StyledBite width={74} height={16} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.98 14c2.738 0 5.303-.732 7.513-2.01A10.991 10.991 0 0030.995 16c2.215 0 4.278-.654 6.005-1.779A10.965 10.965 0 0043.005 16c3.424 0 6.483-1.561 8.502-4.01A14.955 14.955 0 0059.02 14C66.975 14 73.484 7.818 74 0H0c.515 7.818 7.025 14 14.98 14z"
      fill="#C4C4C4"
    />
  </StyledBite>
)

const B = (props) => (
  <StyledBite width={74} height={16} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M74 0H0c2.084 5.826 7.708 10 14.318 10 2.043 0 3.993-.399 5.772-1.122C21.677 13.04 25.744 16 30.512 16c2.936 0 5.606-1.123 7.595-2.957 1.39.615 2.93.957 4.55.957 2.838 0 5.428-1.049 7.394-2.776A15.238 15.238 0 0058.85 14C66.896 14 73.48 7.818 74 0z"
      fill="#C4C4C4"
    />
  </StyledBite>
)

export const Bite = {
  A,
  B,
}
