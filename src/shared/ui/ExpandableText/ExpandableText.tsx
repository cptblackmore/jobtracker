  import React, { useEffect, useRef, useState } from 'react';
  import { Typography, Collapse, Box } from '@mui/material';
  import { ToggleIconButton } from '@shared/ui';
  import { ExpandLess, ExpandMore } from '@mui/icons-material';
  import { throttle } from '@shared/lib';
  import { fadedCollapseStyle } from './styles';
  import { updateDimensions } from './updateDimensions';
  import { useExpandable } from './useExpandable';

  interface Props {
    text: string;
    options?: {
      maxRows?: number;
      minRows?: number;
      rowHeight?: number;
      fadingColor?: string;
    }
  }

  export const ExpandableText: React.FC<Props> = (
    { text, options: {maxRows=3, minRows=1, rowHeight=24, fadingColor='255, 255, 255'} = {} }
  ) => {
    const maxHeight = rowHeight * maxRows;
    const minHeight = rowHeight * minRows;
    const textRef = useRef<HTMLDivElement | null>(null);
    const [collapsedHeight, setCollapsedHeight] = useState(maxHeight);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const { isFaded, isExpanded, toggleCollapse, handleExited } = useExpandable();
    const dimensionsConfig = {
      textRef,
      heights: {maxHeight, minHeight, collapsedHeight},
      setters: {setCollapsedHeight, setIsOverflowed}
    };
    const throttledUpdateDimensions = throttle(() => updateDimensions(dimensionsConfig), 500, 250);

    useEffect(() => {
      updateDimensions(dimensionsConfig);

      window.addEventListener('resize', throttledUpdateDimensions);
      return () => {
        window.removeEventListener('resize', throttledUpdateDimensions);
      }
    }, [])

    return (
      <Box sx={{display: 'flex'}} >
        <Collapse
          in={isExpanded}
          timeout='auto'
          collapsedSize={collapsedHeight}
          css={fadedCollapseStyle(isFaded, isOverflowed, fadingColor)}
          onExited={handleExited}
        >
          <Typography variant='body1' component='div' ref={textRef} >
            {text}
          </Typography>
        </Collapse>
        {isOverflowed && (
          <ToggleIconButton
            isToggled={isExpanded}
            onToggle={toggleCollapse}
            defaultIcon={<ExpandMore />}
            toggledIcon={<ExpandLess />}
            defaultTooltip='Развернуть'
            toggledTooltip='Свернуть'
          />
        )}
      </Box>
    );
  };
