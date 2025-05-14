import { Entries } from "./Entries";

export function typedEntries<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as Entries<T>;
}
