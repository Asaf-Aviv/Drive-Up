import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const slideIn = keyframes`
  0% {
    transform: translateY(0);
  }

  49% {
    transform: translateY(250%);
  }

  50% {
    transform: translateY(-250%);
  }

  100% {
    transform: translateY(0);
  }
`
