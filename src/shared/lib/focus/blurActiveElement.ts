export const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement && document.activeElement?.blur) {
    document.activeElement.blur();
  }
}
