import { useState } from 'react'

type UseFetching<Args extends unknown[], T> = [
  (...args: Args) => Promise<T>,
  boolean,
  string
]

export const useFetching = <T, Args extends unknown[] = []>(callback: (...args: Args) => Promise<T>): UseFetching<Args, T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args: Args): Promise<T> => {
    try {
      setIsLoading(true);
      const result = await callback(...args);
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
