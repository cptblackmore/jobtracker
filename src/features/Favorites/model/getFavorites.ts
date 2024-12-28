export const getFavorites = (): string[] => JSON.parse(window.localStorage.getItem('favorites') || '[]');
