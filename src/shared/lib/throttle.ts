export const throttle = <T extends (...args: unknown[]) => unknown>(callback: T, delay: number, debounce=0) => {
  let wait = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function () {
    if (!wait) {
      clearTimeout(timeout);
      callback();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, delay);
    } else if (debounce !== 0) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        callback();
      }, debounce);
    }
  }
}
