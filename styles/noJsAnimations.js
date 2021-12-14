import { css, keyframes } from 'styled-components'

export const dance = css`
  animation-name: ${keyframes`
    0%, 100% {
      transform: translate3d(0, 0px, 0);
    }
    50% {
      transform: translate3d(0, 5px, 0);
    }
  `};
  animation-duration: 0.333333s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 2s;
`

export const danceRolly = css`
  animation-name: ${keyframes`
    0% {
      transform: translate3d(0, 0px, 0) rotate3d(0, 0, 1, 0deg);
    }
    25% {
      transform: translate3d(0, -5px, 0) rotate3d(0, 0, 1, 5deg);
    }
    50% {
      transform: translate3d(0, 0px, 0) rotate3d(0, 0, 1, 0deg);
    }
    75% {
      transform: translate3d(0, -5px, 0) rotate3d(0, 0, 1, -5deg);
    }
    100% {
      transform: translate3d(0, 0px, 0) rotate3d(0, 0, 1, 0deg);
    }
  `};
  animation-duration: 0.666666s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 2s;
`

export const danceScale = css`
  ${dance};
  animation-name: ${keyframes`
  0%, 100% {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(0.98, 0.98, 1);
    }
  `};
  animation-delay: 2s;
`

export const appear = css`
  animation-name: ${keyframes`
    0% {
      transform: translate3d(0, -32px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0px, 0);
      opacity: 1;
    }
  `};
  animation-fill-mode: backwards;
  animation-duration: 0.333333s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0, 0.18, 0.23, 1);
`

export const appearScale = css`
  animation-name: ${keyframes`
    0% {
      transform: scale3d(0, 0, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  `};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0, 0.18, 0.23, 1);
  animation-fill-mode: both;
`

export const appearSlow = css`
  animation-name: ${keyframes`
    0% {
      transform: translate3d(0, 230px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  `};
  animation-duration: 5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-fill-mode: backwards;
`

export const appearBelow = css`
  animation-name: ${keyframes`
    0% {
      transform: translate3d(0, 32px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  `};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-fill-mode: backwards;
`

export const swingyFrame = css`
  animation-name: ${keyframes`
    0%, 100% {
      transform:  rotate3d(0, 0, 1, 10deg);
    }
    
    50% {
      transform:  rotate3d(0, 0, 1, -10deg);
    }
  `};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`
