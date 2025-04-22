export const changeTextContentById = (id: string, newText: string): void => {
  const element = document.getElementById(id);
  if (element) element.textContent = newText;
}
