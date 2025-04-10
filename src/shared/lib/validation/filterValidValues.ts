export function filterValidValues<T>(values: unknown[], allowedValues: T[]): T[] {
  const allowedSet = new Set(allowedValues);
  return values.filter((value): value is T => allowedSet.has(value as T));
}
