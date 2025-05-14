import { useEffect, useRef } from "react";

export const useEffectOnceByCondition = (
  callback: () => void,
  dependency: React.DependencyList,
  condition: boolean,
) => {
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (condition && !hasExecuted.current) {
      callback();
      hasExecuted.current = true;
    }
  }, [dependency]);
};
