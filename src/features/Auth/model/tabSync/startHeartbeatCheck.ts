import { AuthStore } from "@features/Auth";
import { electLeader } from "./electLeader";
import { isLeaderAlive } from "./isLeaderAlive";

export const startHeartbeatCheck = (
  authStore: AuthStore,
  authChannel: BroadcastChannel,
) => {
  const heartbeatCheck = setInterval(() => {
    if (authStore.isLeader) {
      clearInterval(heartbeatCheck);
      return;
    }
    if (!isLeaderAlive(authStore.LEADER_TIMEOUT)) {
      electLeader(authStore, authChannel);
      clearInterval(heartbeatCheck);
    }
  }, authStore.LEADER_TIMEOUT);
};
