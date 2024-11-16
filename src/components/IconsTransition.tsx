import { ReactNode, useRef } from "react";
import { Transition } from "react-transition-group";
import { css, IconButton } from "@mui/material";

const duration = 200;
const size = 1.2;

const wrapperStyle = css`
  position: relative;
  cursor: pointer;
  height: ${size}em;
  width: ${size}em;
  `
const iconStyle = css`
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
const transitionStyles = {
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

interface Props {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  firstIcon: ReactNode;
  secondIcon: ReactNode;
}

const IconsTransition: React.FC<Props> = ({ 
  isActive, 
  setIsActive, 
  firstIcon, 
  secondIcon
}) => {
  const firstIconRef = useRef(null);
  const secondIconRef = useRef(null);

  return (
    <IconButton
      css={wrapperStyle}
      onClick={() => setIsActive(!isActive)}
    >
      <Transition 
        nodeRef={firstIconRef} 
        in={!isActive} 
        timeout={duration}
      >
        {state => (
          <div
            ref={firstIconRef} 
            css={[
              iconStyle,
              transitionStyles[state]
            ]}
          >
            {firstIcon}
          </div>
        )}
      </Transition>
      <Transition 
        nodeRef={secondIconRef} 
        in={isActive} 
        timeout={duration}
      >
        {state => (
          <div
            ref={secondIconRef} 
            css={[
              iconStyle,
              transitionStyles[state]
            ]}
          >
            {secondIcon}
          </div>
        )}
      </Transition>
    </IconButton>
  )
}

export default IconsTransition;