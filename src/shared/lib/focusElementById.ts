export const focusElementById = (id: string) => {
  const accountMenuElement = document.getElementById(id);

  if (accountMenuElement instanceof HTMLElement) {
    accountMenuElement.focus();
  }
}
