import { useEffect, useState } from "react";
import { typedKeys } from "@shared/lib";
import { getOnlineStatuses, Sources, sourcesRegistry } from "@entities/Vacancy";
import { sourcesIdsMapping } from "@entities/Vacancy/model/Sources";
import axios from "axios";

export const useSourcesStatus = () => {
  function initializeStatuses() {
    return Object.fromEntries(
      typedKeys(sourcesRegistry).map((key) => [key, "pending"]),
    ) as Record<Sources, "pending">;
  }
  const [statuses, setStatuses] =
    useState<Record<Sources, "success" | "error" | "pending">>(
      initializeStatuses(),
    );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchStatuses() {
      const entries: [Sources, "success" | "error" | "pending"][] =
        await Promise.all(
          typedKeys(sourcesRegistry).map(async (source) => {
            try {
              const result = await getOnlineStatuses(
                sourcesIdsMapping[source],
                signal,
              );
              return [source, result ? "success" : "error"];
            } catch (e) {
              if (axios.isCancel(e)) return [source, "pending"];
              return [source, "error"];
            }
          }),
        );

      setStatuses(
        Object.fromEntries(entries) as Record<
          Sources,
          "success" | "error" | "pending"
        >,
      );
    }

    fetchStatuses();

    return () => {
      controller.abort();
    };
  }, []);

  return { statuses };
};
