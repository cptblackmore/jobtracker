import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { ActivationMessageSuccess } from './ActivationMessageSuccess';
import { ActivationMessageAlready } from './ActivationMessageAlready';
import { ActivationMessageNotFound } from './ActivationMessageNotFound';
import { ActivationMessageUnknown } from './ActivationMessageUnknown';

interface Props {
  code: string;
}

export const ActivationMessage: React.FC<Props> = observer(({ code }) => {
  const { authStore } = useContext(AuthContext);

  useEffect(() => {
    authStore.updateCurrentTime();
    if (code === 'ACTIVATION_SUCCESS') {
      authStore.authChannel.postMessage({type: 'update_user'});
    }
  }, [authStore, code]);

  const activationMessagesMapping: Record<string, JSX.Element> = {
    ACTIVATION_SUCCESS: <ActivationMessageSuccess />,
    USER_ALREADY_ACTIVATED: <ActivationMessageAlready />,
    ACTIVATION_LINK_NOT_FOUND: <ActivationMessageNotFound authStore={authStore} />
  };

  if (code !== 'ACTIVATION_SUCCESS' && authStore.user.isActivated) {
    return activationMessagesMapping['USER_ALREADY_ACTIVATED'];
  }

  return activationMessagesMapping[code] || <ActivationMessageUnknown code={code} />;
});
