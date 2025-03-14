import { SourceId } from '@entities/Vacancy/model/Sources';

export const getSourceBatches = (idChunk: string[]) => {
  const batches = idChunk.reduce<Record<SourceId, string[]>>((acc, id) => {
    const matches = id.match('^([^_]+)_(.*)$') ?? [];
    const source = matches[1] as SourceId;
    const rest = matches[2];

    if (!source || !rest) return acc;
    if (!acc[source]) {
        acc[source] = [];
    }
    acc[source].push(rest);
    return acc;
  }, {} as Record<SourceId, string[]>);
  return batches;
}
