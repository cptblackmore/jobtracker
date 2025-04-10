export const broadcastRequestWithFallback = async (
  channel: BroadcastChannel,
  requestType: string,
  responseType: string,
  responseAction: () => void,
  fallbackAction: () => void,
  timeout = 2000
) => {
  return new Promise((resolve, reject) => {
    let answered = false;

    const handleResponse = async (event: MessageEvent) => {
      if (event.data.type === responseType) {
        try {
          channel.removeEventListener('message', handleResponse);
          answered = true;
          const result = await responseAction();
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    };

    channel.addEventListener('message', handleResponse);
    channel.postMessage({ type: requestType });

    setTimeout(async () => {
      if (!answered) {
        try {
          channel.removeEventListener('message', handleResponse);
          answered = true;
          const result = await fallbackAction();
          resolve(result);
        } catch (e) {
          reject(e)
        }
      }
    }, timeout);
  });
}
