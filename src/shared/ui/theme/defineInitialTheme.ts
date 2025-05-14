export const defineInitialTheme = (): "light" | "dark" => {
  const savedThemeMode = localStorage.getItem("themeMode");
  const preferredThemeMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  if (savedThemeMode) {
    return savedThemeMode === "dark" ? "dark" : "light";
  } else {
    localStorage.setItem("themeMode", preferredThemeMode);
    return preferredThemeMode === "dark" ? "dark" : "light";
  }
};
