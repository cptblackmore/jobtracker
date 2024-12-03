import React, { useEffect, useRef, useState } from 'react';
import { Typography, Collapse, Box } from '@mui/material';
import { ToggleIconButton } from '@shared/ui'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { throttle } from '@shared/lib';
import { fadedCollapseStyle } from './styles';
import { updateDimensions } from './updateDimensions';

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
  { text, options: { maxRows=3, minRows=1, rowHeight=24, fadingColor='255, 255, 255' } = {} }
) => {
  const maxHeight = rowHeight * maxRows;
  const minHeight = rowHeight * minRows;
  const textRef = useRef<HTMLDivElement | null>(null);
  const [collapsedHeight, setCollapsedHeight] = useState(maxHeight);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isShaded, setIsShaded] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const throttledUpdateDimensions = throttle(() => {updateDimensions({ textRef, maxHeight, minHeight, collapsedHeight, setCollapsedHeight, setIsOverflowed })}, 500, 250);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', throttledUpdateDimensions);
    return () => {
      window.removeEventListener('resize', throttledUpdateDimensions);
    }
  }, [])

  function toggleCollapse() {
    if (isExpanded) {
      setIsExpanded(false);
    } 
    if (!isExpanded) {
      setIsExpanded(true);
      setIsShaded(false);
    }
  }

  return (
    <Box sx={{ display: 'flex' }} >
      <Collapse
        in={isExpanded}
        timeout='auto'
        collapsedSize={collapsedHeight}
        css={fadedCollapseStyle(isShaded, isOverflowed, fadingColor)}
        onExited={() => setIsShaded(true)}
      >
        <Typography variant='body1' component='div' ref={textRef} >
          {text}
        </Typography>
      </Collapse>
      {isOverflowed 
        &&
        <ToggleIconButton
          isToggled={isExpanded}
          onToggle={toggleCollapse}
          defaultIcon={<ExpandMore />}
          toggledIcon={<ExpandLess />}
          defaultTooltip='Развернуть'
          toggledTooltip='Свернуть'
        />
      }
    </Box>
  );
};
