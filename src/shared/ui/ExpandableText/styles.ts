import { css } from "@emotion/react";

const createGradient = (color: string) => `
  linear-gradient(to top, rgba(${color}, 0.7) 10%, rgba(${color}, 0.5) 13%, rgba(${color}, 0) 50%)
`;

export const fadedCollapseStyle = (
  isFaded: boolean, 
  isOverflowed: boolean, 
  fadingColor: string
) => css`
  position: relative;
  ::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: ${createGradient(fadingColor)};
    pointer-events: none;
    transition: opacity .5s ease-in-out;
  }
  ${isFaded && isOverflowed ?
    `
    &::after {
      opacity: 1;
    }`
      :
    `
    &::after {
      opacity: 0;  
    }`
  }
`