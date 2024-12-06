import { useState } from 'react';

export const useExpandable = () => {
  const [isFaded, setIsFaded] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleCollapse() {
    setIsExpanded(prev => {
      if (!prev) setIsFaded(false);
      return !prev
    })
  }
  function handleExited() {
    setIsFaded(true);
  }

  return {isFaded, isExpanded, toggleCollapse, handleExited}
}
