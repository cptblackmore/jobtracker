import { ReactNode } from "react";

export interface ToggleIconButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  defaultIcon: ReactNode;
  toggledIcon: ReactNode;
  defaultTooltip?: string;
  toggledTooltip?: string;
  options?: {
    duration?: number;
    size?: number;
    wrapperSize?: number;
    tooltipEnterDelay?: number;
    tooltipLeaveDelay?: number;
    ariaLabel?: string;
    ariaPressable?: boolean;
    tabIndex?: number;
    ariaHidden?: boolean;
  };
}
