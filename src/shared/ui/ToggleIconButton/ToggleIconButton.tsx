import { useRef } from "react";
import { Transition } from "react-transition-group";
import { Fade, IconButton, Tooltip } from "@mui/material";
import { getIconStyle, transitionStyles, getWrapperStyle } from "./styles";
import { ToggleIconButtonProps } from "@shared/ui/ToggleIconButton/ToggledIconButtonProps";

export const ToggleIconButton: React.FC<ToggleIconButtonProps> = ({
  isToggled,
  onToggle,
  defaultIcon,
  toggledIcon,
  defaultTooltip,
  toggledTooltip,
  options: {
    duration = 200,
    size = 1,
    wrapperSize,
    tooltipEnterDelay = 0,
    tooltipLeaveDelay = 0,
    ariaLabel,
    ariaPressable = false,
    tabIndex,
    ariaHidden,
  } = {},
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
        tabIndex={tabIndex}
        css={getWrapperStyle(size, wrapperSize)}
        onClick={() => onToggle()}
        aria-label={
          ariaLabel
            ? `${ariaLabel}: ${isToggled ? toggledTooltip : defaultTooltip}`
            : isToggled
              ? toggledTooltip
              : defaultTooltip
        }
        aria-pressed={ariaPressable ? isToggled : undefined}
        aria-hidden={ariaHidden}
      >
        <Transition nodeRef={firstIconRef} in={!isToggled} timeout={duration}>
          {(state) => (
            <div
              ref={firstIconRef}
              css={[
                getIconStyle(duration, size, !isToggled),
                transitionStyles[state],
              ]}
            >
              {defaultIcon}
            </div>
          )}
        </Transition>
        <Transition nodeRef={secondIconRef} in={isToggled} timeout={duration}>
          {(state) => (
            <div
              ref={secondIconRef}
              css={[
                getIconStyle(duration, size, isToggled),
                transitionStyles[state],
              ]}
            >
              {toggledIcon}
            </div>
          )}
        </Transition>
      </IconButton>
    </Tooltip>
  );
};
