import { keyframes } from "@emotion/react";

export const shakeKeyframes = keyframes`
  0% { transform: translateX(0) }
  20% { transform: translateX(-5px) }
  40% { transform: translateX(5px) }
  60% { transform: translateX(-5px) }
  80% { transform: translateX(5px) }
  100% { transform: translateX(0) }
`;
