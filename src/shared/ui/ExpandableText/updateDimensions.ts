interface UpdateDimensionsType {
  textRef: React.RefObject<HTMLDivElement>,
  maxHeight: number,
  minHeight: number,
  collapsedHeight: number,
  setCollapsedHeight: React.Dispatch<React.SetStateAction<number>>,
  setIsOverflowed: React.Dispatch<React.SetStateAction<boolean>>,
}

export const updateDimensions = (
  { textRef, maxHeight, minHeight, collapsedHeight, setCollapsedHeight, setIsOverflowed }: UpdateDimensionsType
): void => {
  if (textRef.current) {
    if (textRef.current.scrollHeight <= maxHeight) {
      if (textRef.current.scrollHeight < minHeight) {
        setCollapsedHeight(minHeight);
      } else {
        setCollapsedHeight(textRef.current.scrollHeight);
      }
    }
    setIsOverflowed(textRef.current.scrollHeight > collapsedHeight);
  }
}
