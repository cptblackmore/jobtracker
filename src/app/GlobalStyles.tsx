import { css, Global } from "@emotion/react";

export const GlobalStyles: React.FC = () => {
  return (
    <Global styles={css`
      body {
        background-color:#f5f4ff;
      }
    `} />
  );
}
