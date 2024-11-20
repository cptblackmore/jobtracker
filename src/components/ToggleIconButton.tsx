import { ReactNode, useRef } from "react";
import { Transition } from "react-transition-group";
import { css, Fade, IconButton, Tooltip } from "@mui/material";

const duration = 200;
const size = 1.2;
const tooltipEnterDelay = 500;
const tooltipLeaveDelay = 300;

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
  isToggled: boolean;
  onToggle: () => void;
  defaultIcon: ReactNode;
  toggledIcon: ReactNode;
  defaultTooltip?: string;
  toggledTooltip?: string;
}

const ToggleIconButton: React.FC<Props> = ({ 
  isToggled, 
  onToggle, 
  defaultIcon, 
  toggledIcon,
  defaultTooltip,
  toggledTooltip
}) => {
  const firstIconRef = useRef(null);
  const secondIconRef = useRef(null);

  return (
    <Tooltip
      title={isToggled ? toggledTooltip : defaultTooltip}
      TransitionComponent={Fade}
      enterDelay={tooltipEnterDelay}
      leaveDelay={tooltipLeaveDelay}
      arrow
    >
      <IconButton
        css={wrapperStyle}
        onClick={() => onToggle()}
      >
        <Transition 
          nodeRef={firstIconRef} 
          in={!isToggled} 
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
              {defaultIcon}
            </div>
          )}
        </Transition>
        <Transition 
          nodeRef={secondIconRef} 
          in={isToggled} 
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
              {toggledIcon}
            </div>
          )}
        </Transition>
      </IconButton>
    </Tooltip>
  )
}

export default ToggleIconButton;