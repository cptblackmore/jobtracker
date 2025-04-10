export const waitForCondition = (condition: () => boolean, ms = 100): Promise<void> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval);
        resolve();
      }
    }, ms);
  });
}
