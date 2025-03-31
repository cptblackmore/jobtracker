export const debounce = (callback: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, delay);
  };
};
