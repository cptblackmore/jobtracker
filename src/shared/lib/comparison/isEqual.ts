export const isEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const keysA: string[] = Object.keys(aObj);
    const keysB: string[] = Object.keys(bObj);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
      if (!isEqual(aObj[key], bObj[key])) return false;
    }
    return true;
  }

  return false;
};
