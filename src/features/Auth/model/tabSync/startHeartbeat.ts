import { AuthStore } from '@features/Auth';
import { isTabLeader } from './isThisTabLeader';
import { startHeartbeatCheck } from './startHeartbeatCheck';

export const startHeartbeat = (authStore: AuthStore, authChannel: BroadcastChannel) => {
  const heartbeat = setInterval(() => {
    if (!authStore.isLeader) {
      clearInterval(heartbeat);
      return;
    }
    if (isTabLeader(authStore.tabId)) {
      const updatedLeader = {
        id: authStore.tabId,
        time: Date.now()
      }
      localStorage.setItem('leader', JSON.stringify(updatedLeader));
    } else {
      authStore.setLeader(false);
      startHeartbeatCheck(authStore, authChannel);
      clearInterval(heartbeat);
    }
  }, authStore.LEADER_TIMEOUT - 1000);
}
