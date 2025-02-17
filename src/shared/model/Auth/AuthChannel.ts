import { waitForCondition } from "@shared/lib";
import { UserData } from "../types/UserData";
import { AuthStore } from "./AuthStore";

export const authChannel = new BroadcastChannel('auth');

export const setupAuthChannelListener = (authStore: AuthStore) => {
  authChannel.onmessage = async (event) => {
    const type = event.data.type;

    if (type === 'ping') authChannel.postMessage({type: 'pong'});

    if (type === 'request_auth') {
      await waitForCondition(() => authStore.isAuth !== null); // TODO reaplce isAuth by isInit after isInit implementation
      authChannel.postMessage(
        {type: 'response_auth', payload: {isAuth: authStore.isAuth, user: {...authStore.user}, isActivated: authStore.isActivated}} // TODO delete this.isActivated after replacing by user.isActivated
      ); 
    }

    if (type === 'response_auth' || type === 'login') {
      authStore.setActivated(event.data.payload.isActivated); // TODO delete after replacing by user.isActivated
      authStore.setUser(event.data.payload.user);
      authStore.setAuth(event.data.payload.isAuth);
    }

    if (type === 'logout') {
      authStore.setActivated(false); // TODO delete after replacing by user.isActivated
      authStore.setAuth(false);
      authStore.setUser({} as UserData);
    }
  }
}
