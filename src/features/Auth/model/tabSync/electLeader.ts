import { waitForCondition } from '@shared/lib';
import { AuthStore } from '@features/Auth';
import { isLeaderAlive } from './isLeaderAlive';
import { isTabLeader } from './isThisTabLeader';
import { startHeartbeat } from './startHeartbeat';
import { startHeartbeatCheck } from './startHeartbeatCheck';

export const electLeader = (authStore: AuthStore, authChannel: BroadcastChannel, onSuccess?: () => void) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (!isLeaderAlive(authStore.LEADER_TIMEOUT)) {
        localStorage.setItem('leader', JSON.stringify({id: authStore.tabId, time: Date.now()}));
        setTimeout(async () => {
          if (isTabLeader(authStore.tabId)) {
            authStore.setLeader(true);
            if (onSuccess) {
              try {
                await onSuccess();
              } catch (e) {
                reject(e);
              }
            }
            startHeartbeat(authStore, authChannel);
            await waitForCondition(() => authStore.isInit); 
            resolve(true);
          } else {
            authChannel.postMessage({type: 'request_auth'});
            startHeartbeatCheck(authStore, authChannel);
            await waitForCondition(() => authStore.isInit);
            resolve(true);
          }
        }, 200);
      } else {
        authChannel.postMessage({type: 'request_auth'});
        startHeartbeatCheck(authStore, authChannel);
        await waitForCondition(() => authStore.isInit);
        resolve(true);
      }
    }, 100 + (Math.random() * 1000));
  })
}
