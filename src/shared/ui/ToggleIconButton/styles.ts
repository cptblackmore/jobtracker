import { css } from '@emotion/react'

export const getWrapperStyle = (size: number, wrapperSize?: number) => css`
  position: relative;
  cursor: pointer;
  height: ${wrapperSize ?? (size * 1.5)}em;
  width: ${wrapperSize ?? (size * 1.5)}em;
`

export const getIconStyle = (duration: number, size: number, isToggled: boolean) => css`
  transition: opacity ${duration}ms ease-in-out;
  opacity: 0;
  position: ${isToggled ? 'absolute' : 'relative'};
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
