export function urlParametrizeObject(obj: object): string {
  return Object.entries(obj)
    .reduce<string[]>((acc, [key, value]) => {
      if (value === undefined || value === null || value === "") return acc;

      if (value instanceof Object && !(value instanceof Array)) {
        const nested = urlParametrizeObject(value);
        if (nested) acc.push(nested);
        return acc;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) return acc;

        acc.push(key + "=" + value.join());
        return acc;
      }

      acc.push(key + "=" + String(value));
      return acc;
    }, [])
    .join("&");
}
