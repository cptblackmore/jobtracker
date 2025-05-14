export const focusElementById = (id: string) => {
  const element = document.getElementById(id);

  if (element instanceof HTMLElement) {
    element.focus();
  }
};
