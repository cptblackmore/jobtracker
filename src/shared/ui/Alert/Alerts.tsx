import { observer } from "mobx-react-lite";
import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { AlertsContext } from "@shared/ui";
import { useContext } from "react";
import { Close } from "@mui/icons-material";

export const Alerts = observer(() => {
  const { alertsStore } = useContext(AlertsContext);

  const handleDismiss = () => {
    if (alertsStore.currentAlert?.dismissedKey) {
      const newDismissedAlerts = new Set([
        ...JSON.parse(window.localStorage.getItem("dismissedAlerts") || "[]"),
        alertsStore.currentAlert.dismissedKey,
      ]);
      window.localStorage.setItem(
        "dismissedAlerts",
        JSON.stringify(Array.from(newDismissedAlerts)),
      );
    }

    alertsStore.closeAlert();
  };

  return (
    alertsStore.currentAlert && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!alertsStore.currentAlert}
        autoHideDuration={alertsStore.currentAlert.duration ?? 4000}
        onClose={() => alertsStore.closeAlert()}
        key={alertsStore.currentAlert.id}
        ClickAwayListenerProps={{
          onClickAway: () => {},
        }}
      >
        {alertsStore.currentAlert && (
          <Alert
            onClose={() => alertsStore.closeAlert()}
            severity={alertsStore.currentAlert.severity}
            variant="filled"
            sx={(theme) => ({
              backgroundColor:
                theme.palette[alertsStore.currentAlert?.severity ?? "info"]
                  .main,
              color:
                theme.palette[alertsStore.currentAlert?.severity ?? "info"]
                  .contrastText,
              "& .MuiAlert-action": {
                pl: alertsStore.currentAlert?.dismissedKey ? 0 : 2,
              },
            })}
            action={
              alertsStore.currentAlert.dismissedKey ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <IconButton
                    aria-label="Закрыть"
                    size="small"
                    onClick={() => alertsStore.closeAlert()}
                    sx={{ color: "inherit" }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                  <Button
                    size="small"
                    color="inherit"
                    onClick={handleDismiss}
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                      },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Не показывать
                  </Button>
                </Box>
              ) : null
            }
          >
            {alertsStore.currentAlert.message}
          </Alert>
        )}
      </Snackbar>
    )
  );
});
