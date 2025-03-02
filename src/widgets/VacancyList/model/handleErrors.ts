import { AlertsStore, createAlert } from '@shared/model';
import { errorMessages } from '@shared/lib/errorMessages';

export const handleErrors = (
  errorCodes: Set<string>, 
  alertsStore: AlertsStore,
  onFavoritesNotFound?: () => void
) => {
  errorCodes.forEach((errorCode) => {
    if (errorCode === 'FAVORITES_NOT_FOUND') {
      if (onFavoritesNotFound) onFavoritesNotFound();
      alertsStore.addAlert(createAlert(errorMessages['FAVORITES_NOT_FOUND'], 'warning'));
    } else {
      const message = errorMessages[errorCode] || `${errorMessages['UNKNOWN_ERROR']} ${errorCode}`;
      alertsStore.addAlert(createAlert(message, 'error'));
    }
  });
};
