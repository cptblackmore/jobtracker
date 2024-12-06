import { ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Fade, IconButton, Tooltip } from '@mui/material';
import { iconStyle, transitionStyles, wrapperStyle } from './styles';


interface Props {
  isToggled: boolean;
  onToggle: () => void;
  defaultIcon: ReactNode;
  toggledIcon: ReactNode;
  defaultTooltip?: string;
  toggledTooltip?: string;
  options?: {
    duration?: number;
    size?: number;
    tooltipEnterDelay?: number;
    tooltipLeaveDelay?: number;
  }
}

export const ToggleIconButton: React.FC<Props> = ({ 
  isToggled, 
  onToggle, 
  defaultIcon, 
  toggledIcon,
  defaultTooltip,
  toggledTooltip,
  options: {
    duration = 200,
    size = 1.2,
    tooltipEnterDelay = 500,
    tooltipLeaveDelay = 300
  } = {}
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
      <IconButton css={wrapperStyle(size)} onClick={() => onToggle()} >
        <Transition nodeRef={firstIconRef} in={!isToggled} timeout={duration} >
          {state => (
            <div ref={firstIconRef} css={[iconStyle(size, duration), transitionStyles[state]]} >
              {defaultIcon}
            </div>
          )}
        </Transition>
        <Transition nodeRef={secondIconRef} in={isToggled} timeout={duration} >
          {state => (
            <div ref={secondIconRef} css={[iconStyle(size, duration), transitionStyles[state]]} >
              {toggledIcon}
            </div>
          )}
        </Transition>
      </IconButton>
    </Tooltip>
  );
}
