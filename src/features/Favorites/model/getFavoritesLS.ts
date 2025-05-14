export const getFavoritesLS = (): string[] =>
  JSON.parse(window.localStorage.getItem("favorites") || "[]");
