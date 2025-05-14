import { AlertsStore, createAlert } from "@shared/ui";
import { errorMessages } from "@shared/lib/error/errorMessages";

export const handleErrors = (
  errorCodes: Set<string>,
  alertsStore: AlertsStore,
  onFavoritesNotFound?: () => void,
) => {
  errorCodes.forEach((errorCode) => {
    if (errorCode === "FAVORITES_NOT_FOUND") {
      if (onFavoritesNotFound) onFavoritesNotFound();
      alertsStore.addAlert(
        createAlert(errorMessages["FAVORITES_NOT_FOUND"], "warning"),
      );
    } else if (errorCode === "FAVORITES_NOT_AVAILABLE") {
      alertsStore.addAlert(
        createAlert(errorMessages["FAVORITES_NOT_AVAILABLE"], "warning"),
      );
    } else if (errorCode === "PLACE_NOT_FOUND") {
      // do nothing
    } else {
      const message =
        errorMessages[errorCode] ||
        `${errorMessages["UNKNOWN_ERROR"]} ${errorCode}`;
      alertsStore.addAlert(createAlert(message, "error"));
    }
  });
};
