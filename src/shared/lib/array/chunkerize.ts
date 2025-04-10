export const chunkerize = <T>(array: Array<T>, size: number) => {
  return array.reduce<Array<Array<T>>>(
    (acc, id, i) => (i % size === 0 ? [...acc, [id]] : [...acc.slice(0, -1), [...acc.slice(-1)[0], id]]),
    []
  );
}
