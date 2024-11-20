import React, { useState } from 'react';
import { Typography, Collapse, Box, css } from '@mui/material';
import { ToggleIconButton } from '@shared/ToggleIconButton'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Props {
  text: string;
  maxLength: number;
}

const ExpandableText: React.FC<Props> = ({ text, maxLength }) => {
  const isOverflowing = text.length > maxLength;
  const [isExpanded, setIsExpanded] = useState(!isOverflowing);
  const [isSliced, setIsSliced] = useState(isOverflowing);
  
  function toggleCollapse() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      setIsSliced(false);
    }
  }

  return (
    <Box
      css={css`
        display: flex;
      `}
    >
      <Collapse
        in={isExpanded}
        timeout='auto'
        collapsedSize={75}
        onExited={() => setIsSliced(true)}
      >
        <Typography variant='body1' component='div'>
          {isOverflowing && isSliced
            ? `${text.slice(0, maxLength)}...`
            : text}
        </Typography>
      </Collapse>
      {isOverflowing 
      &&
      <ToggleIconButton
        isToggled={isExpanded}
        onToggle={toggleCollapse}
        defaultIcon={<ExpandMore />}
        toggledIcon={<ExpandLess />}
        defaultTooltip='Развернуть'
        toggledTooltip='Свернуть'
      />}
    </Box>
  );
};

export default ExpandableText;