export function validateValue<T>(
  value: unknown,
  allowedValues: T[],
  transform?: ((value: unknown) => T),
  options?: {
    range?: {
      min?: number; 
      max?: number
    }
  }
): T | undefined {
  let parsed: T;

  if (transform) {
    try {
      if (options?.range && value === null) return undefined; 
      parsed = transform(value);
    } catch {
      return undefined;
    }
  } else {
    parsed = value as T;
  }

  if (typeof parsed === 'number') {
    if (isNaN(parsed)) return undefined;
    if (options?.range) {
      if (options.range?.min !== undefined && parsed < options.range?.min) return undefined;
      if (options.range?.max !== undefined && parsed > options.range?.max) return undefined;
    }
  }

  if (allowedValues.length > 0 && !allowedValues.includes(parsed)) {
    return undefined;
  }

  return parsed;
}
