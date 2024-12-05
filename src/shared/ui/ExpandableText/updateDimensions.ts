interface UpdateDimensionsType {
  textRef: React.RefObject<HTMLDivElement>,
  heights: {
    maxHeight: number,
    minHeight: number,
    collapsedHeight: number
  },
  setters: {
    setCollapsedHeight: React.Dispatch<React.SetStateAction<number>>,
    setIsOverflowed: React.Dispatch<React.SetStateAction<boolean>>
  }
}

function calculateCollapsedHeight(scrollHeight: number, maxHeight: number, minHeight: number): number | void {
  if (scrollHeight < minHeight) return minHeight;
  if (scrollHeight <= maxHeight) return scrollHeight;
}

export const updateDimensions = ({textRef, heights, setters}: UpdateDimensionsType): void => {
  const { maxHeight, minHeight, collapsedHeight } = heights;
  const { setCollapsedHeight, setIsOverflowed } = setters;

  if (textRef.current) {
    const scrollHeight = textRef.current.scrollHeight;
    setCollapsedHeight(calculateCollapsedHeight(scrollHeight, maxHeight, minHeight) ?? collapsedHeight);
    setIsOverflowed(scrollHeight > collapsedHeight);
  }
}
