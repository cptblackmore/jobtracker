import { waitForCondition } from "@shared/lib";
import { UserData } from "../types/UserData";
import { AuthStore } from "./AuthStore";

export const authChannel = new BroadcastChannel('auth');

export const setupAuthChannelListener = (authStore: AuthStore) => {
  authChannel.onmessage = async (event) => {
    const type = event.data.type;

    if (type === 'ping') authChannel.postMessage({type: 'pong'});

    if (type === 'request_auth') {
      await waitForCondition(() => authStore.isInit);
      authChannel.postMessage(
        {type: 'response_auth', payload: {...authStore.user}}
      ); 
    }

    if (type === 'response_auth' || type === 'login') {
      authStore.setUser(event.data.payload);
      authStore.setInit(true);
    }

    if (type === 'logout') {
      authStore.setUser({} as UserData);
    }
  }
}
