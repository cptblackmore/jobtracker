import { useState } from 'react'

type UseFetching<T> = [
  () => Promise<T>,
  boolean,
  string
]

export const useFetching = <T>(callback: () => Promise<T>): UseFetching<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (): Promise<T> => {
    try {
      setIsLoading(true);
      const result = await callback();
      return result;
    } catch (e) {
      if (typeof e === 'string') {
      setError(e);
      }
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}
