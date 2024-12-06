import { css, Global } from "@emotion/react";

export const GlobalStyles: React.FC = () => {
  return (
    <Global styles={css`
      body {
        background-color:#36364d;
      }
    `} />
  );
}
