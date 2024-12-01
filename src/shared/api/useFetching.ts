import { useState } from 'react'

type UseFetching = [
  () => Promise<void>,
  boolean,
  string
]

export const useFetching = (callback: () => Promise<void>): UseFetching => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
  try {
    setIsLoading(true);
    await callback();
  } catch (e) {
    if (typeof e === 'string') {
    setError(e);
    }
  } finally {
    setIsLoading(false);
  }
  }

  return [fetching, isLoading, error];
}
