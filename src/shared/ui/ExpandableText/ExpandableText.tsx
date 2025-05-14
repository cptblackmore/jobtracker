import React, { useEffect, useRef, useState } from "react";
import {
  Typography as T,
  Collapse,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AriaInformer,
  ToggleIconButton,
  VisuallyHiddenTypography,
} from "@shared/ui";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { throttle } from "@shared/lib";
import { getFadedCollapseStyle } from "./styles";
import { updateDimensions } from "./updateDimensions";
import { useExpandable } from "./useExpandable";

interface Props {
  text: string;
  options?: {
    maxRows?: number;
    minRows?: number;
    rowHeight?: number;
    fadingColor?: string;
    timeout?: number | "auto" | { enter?: number; exit?: number };
    ariaLabel?: string;
  };
}

export const ExpandableText: React.FC<Props> = ({
  text,
  options: {
    maxRows = 3,
    minRows = 1,
    rowHeight = 24,
    fadingColor = "#fff",
    timeout,
    ariaLabel,
  } = {},
}) => {
  const maxHeight = rowHeight * maxRows;
  const minHeight = rowHeight * minRows;
  const textRef = useRef<HTMLDivElement | null>(null);
  const [collapsedHeight, setCollapsedHeight] = useState(maxHeight);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const { isFaded, isExpanded, toggleCollapse, handleExited } = useExpandable();
  const dimensionsConfig = {
    textRef,
    heights: { maxHeight, minHeight, collapsedHeight },
    setters: { setCollapsedHeight, setIsOverflowed },
  };
  const throttledUpdateDimensions = throttle(
    () => updateDimensions(dimensionsConfig),
    500,
    250,
  );
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    updateDimensions(dimensionsConfig);

    window.addEventListener("resize", throttledUpdateDimensions);
    return () => {
      window.removeEventListener("resize", throttledUpdateDimensions);
    };
  }, []);

  return (
    <Box
      tabIndex={0}
      sx={{
        display: "flex",
        outline: `2px solid transparent`,
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 0.1,
          outlineOffset: 4,
          transition: "outline 0.2s",
        },
        cursor: isOverflowed ? "pointer" : "default",
      }}
      onClick={isOverflowed ? toggleCollapse : undefined}
      aria-expanded={isExpanded}
      aria-labelledby="test"
    >
      <VisuallyHiddenTypography variant="p">
        {isOverflowed
          ? isExpanded
            ? ariaLabel + "Свернуть"
            : ariaLabel + "Развернуть"
          : ""}
      </VisuallyHiddenTypography>
      <AriaInformer id="test">
        {isOverflowed
          ? isExpanded
            ? ariaLabel + text
            : "Описание свернуто"
          : ariaLabel + text}
      </AriaInformer>
      <Collapse
        in={isExpanded}
        timeout={timeout ?? "auto"}
        collapsedSize={collapsedHeight}
        css={getFadedCollapseStyle(isFaded, isOverflowed, fadingColor)}
        onExited={handleExited}
        aria-hidden={!isExpanded}
      >
        <T
          variant="body1"
          ref={textRef}
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: theme.typography.body1.fontSize,
            },
          }}
        >
          {text}
        </T>
      </Collapse>
      {isOverflowed && isSmUp && (
        <ToggleIconButton
          isToggled={isExpanded}
          onToggle={() => {}}
          defaultIcon={<ExpandMore color="primary" />}
          toggledIcon={<ExpandLess color="primary" />}
          defaultTooltip="Развернуть"
          toggledTooltip="Свернуть"
          options={{
            size: 1.2,
            wrapperSize: 1.5,
            tooltipEnterDelay: 500,
            tooltipLeaveDelay: 300,
            tabIndex: -1,
            ariaHidden: true,
          }}
        />
      )}
    </Box>
  );
};
