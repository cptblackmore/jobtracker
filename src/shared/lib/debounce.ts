export const debounce = (callback: () => void, delay: number) => {
  let timeout: NodeJS.Timeout | undefined;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, delay);
  };
};
