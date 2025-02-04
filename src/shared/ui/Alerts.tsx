import { observer } from 'mobx-react-lite';
import { Alert, Snackbar } from '@mui/material';
import { AlertsContext } from '@shared/model';
import { useContext } from 'react';

export const Alerts = observer(() => {
  const { alertsStore } = useContext(AlertsContext);

  return (
    alertsStore.currentAlert && (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!alertsStore.currentAlert}
        autoHideDuration={alertsStore.currentAlert.duration ?? 4000}
        onClose={() => alertsStore.closeAlert()}
        key={alertsStore.currentAlert.id}
        ClickAwayListenerProps={{
          onClickAway: () => {}
        }}
      >
        {alertsStore.currentAlert && (
          <Alert onClose={() => alertsStore.closeAlert()} severity={alertsStore.currentAlert.severity} variant='filled'>
            {alertsStore.currentAlert.message}
          </Alert>
        )}
      </Snackbar>
    )
  )
});
