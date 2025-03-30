  import React, { useEffect, useRef, useState } from 'react';
  import { Typography as T, Collapse, Box } from '@mui/material';
  import { ToggleIconButton } from '@shared/ui';
  import { ExpandLess, ExpandMore } from '@mui/icons-material';
  import { throttle } from '@shared/lib';
  import { getFadedCollapseStyle } from './styles';
  import { updateDimensions } from './updateDimensions';
  import { useExpandable } from './useExpandable';

  interface Props {
    text: string;
    options?: {
      maxRows?: number;
      minRows?: number;
      rowHeight?: number;
      fadingColor?: string;
      timeout?: number | 'auto' | { enter?: number; exit?: number };
    };
  }

  export const ExpandableText: React.FC<Props> = ({ 
    text, 
    options: {
      maxRows=3, 
      minRows=1, 
      rowHeight=24, 
      fadingColor='#fff',
      timeout
    } = {}
  }) => {
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
          timeout={timeout ?? 'auto'}
          collapsedSize={collapsedHeight}
          css={getFadedCollapseStyle(isFaded, isOverflowed, fadingColor)}
          onExited={handleExited}
        >
          <T variant='body1' ref={textRef} >
            {text}
          </T>
        </Collapse>
        {isOverflowed && (
          <ToggleIconButton
            isToggled={isExpanded}
            onToggle={toggleCollapse}
            defaultIcon={<ExpandMore color='primary' />}
            toggledIcon={<ExpandLess color='primary' />}
            defaultTooltip='Развернуть'
            toggledTooltip='Свернуть'
            options={{
              size: 1.2,
              wrapperSize: 1.5,
              tooltipEnterDelay: 500,
              tooltipLeaveDelay: 300
            }}
          />
        )}
      </Box>
    );
  };
