import { css } from "@emotion/react"

export const wrapperStyle = (size: number) => css`
  position: relative;
  cursor: pointer;
  height: ${size}em;
  width: ${size}em;
`

export const iconStyle = (size: number, duration: number) => css`
  transition: opacity ${duration}ms ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: ${size}em;
  width: ${size}em;

  & svg {
    height: ${size}em;
    width: ${size}em;
  }
`

export const transitionStyles = {
  entering: css`
    opacity: 1; 
  `,
  entered: css`
    opacity: 1;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
  unmounted: css`
    opacity: 0;
  `
}
