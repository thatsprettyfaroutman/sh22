import styled from 'styled-components'
import { media } from '@styles/theme'
import * as NO_JS_ANIM from '@styles/noJsAnimations'

const StyledHud = styled.div`
  position: absolute;
  top: 69px;
  left: 0;
  right: 0;
  z-index: 1;

  display: grid;

  ${media.phone} {
    top: 16px;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-self: center;
  padding: 0 48px;
  max-width: 1250px;
  min-width: min(100vw, 1250px);

  > a {
    display: block;
    > svg {
      display: block;
    }
  }

  ${media.tablet} {
    padding: 0 16px;
  }

  ${media.phone} {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: center;
    align-content: center;

    > a {
      grid-column: 2/3;
    }

    > :not(a):last-child {
      justify-self: end;
    }
  }

  > a > svg {
    ${NO_JS_ANIM.appear};
  }

  .no-js & > a > svg {
    animation-delay: 2s;
  }

  > a > svg > path {
    fill: ${(p) => p.theme.color.logo.fg};
  }
`

export const Hud = ({ children, ...restProps }) => {
  return (
    <StyledHud {...restProps}>
      <Content>
        <a href="/">
          <svg width={132} height={28} fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.846 6.015a22.073 22.073 0 01-10.117 16.993A22.067 22.067 0 013.61 5.954a22.169 22.169 0 0120.237.06zm2.71-2.548A25.657 25.657 0 0013.67 0C9.19 0 4.778 1.174.912 3.394L0 3.916l.024 1.053c.2 9.023 4.993 17.114 12.82 21.642l.886.512.885-.512c7.802-4.513 12.595-12.577 12.82-21.57l.027-1.047-.907-.527zM43.452 14.985H39.09v4.654h-3.686V7.468h3.686v4.306h4.362V7.468h3.685v12.17h-3.685v-4.654zM56.032 10.514c-1.77 0-2.92 1.35-2.92 3.05 0 1.696 1.15 3.046 2.92 3.046 1.769 0 2.919-1.35 2.919-3.047 0-1.698-1.15-3.049-2.92-3.049zm0-3.247c3.76 0 6.66 2.553 6.66 6.296 0 3.74-2.9 6.294-6.66 6.294-3.76 0-6.661-2.554-6.661-6.294 0-3.743 2.901-6.296 6.66-6.296zM69.633 15.916l-2.226 3.722h-4.342l4.07-6.24-3.796-5.93h4.325l1.97 3.468 1.934-3.468h4.362l-3.796 5.912 4.068 6.258H71.86l-2.227-3.722zM85.827 14.985h-4.361v4.654h-3.687V7.468h3.687v4.306h4.361V7.468h3.685v12.17h-3.685v-4.654zM92.403 7.468h3.741v7.042c0 1.168.6 2.1 2.118 2.1 1.494 0 2.098-.932 2.098-2.1V7.468h3.741v7.152c0 3.03-1.734 5.237-5.84 5.237s-5.858-2.207-5.858-5.217V7.468zM110.677 13.106v6.532h-3.687V7.468h3.797l4.232 6.132V7.468h3.687v12.17h-3.54l-4.489-6.532zM124.207 10.68h-3.267V7.468h10.2v3.212h-3.247v8.959h-3.686v-8.96z"
              fill="#1F1D1D"
            />
          </svg>
        </a>
        {children}
      </Content>
    </StyledHud>
  )
}
