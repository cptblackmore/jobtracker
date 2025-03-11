import { waitForCondition } from '@shared/lib';
import { UserData } from '../types/UserData';
import { AuthStore } from './AuthStore';
import { toJS } from 'mobx';
import { electLeader } from './tabSynchronization/electLeader';

export const authChannel = new BroadcastChannel('auth');

export const setupAuthChannelListener = (authStore: AuthStore) => {
  authChannel.onmessage = async (event) => {
    const type = event.data.type;

    if (type === 'ping') authChannel.postMessage({type: 'pong'});

    if (type === 'request_auth') {
      await waitForCondition(() => authStore.isInit);
      if (authStore.isLeader) {
        authChannel.postMessage(
          {type: 'response_auth', payload: toJS(authStore.user)}
        ); 
      }
    }

    if (type === 'response_auth' || type === 'login') {
      authStore.setUser(event.data.payload);
      authStore.setInit(true);
    }

    if (type === 'logout') {
      authStore.setUser({} as UserData);
    }

    if (type === 'check_leader') {
      if (authStore.isLeader) {
        authChannel.postMessage({type: 'leader_here'});
      }
    }

    if (type === 'leader_left') {
      electLeader(authStore, authChannel);
    }
  }
}
