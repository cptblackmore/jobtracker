import { Box, Button, CardActions, CardHeader } from "@mui/material";
import { AuthContext } from "@features/Auth";
import { accountPageElementsIds, CardHeaderTitle } from "@shared/ui";
import { useContext } from "react";

export const AccountActions: React.FC = () => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box
      component="section"
      flexGrow={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      role="region"
      aria-labelledby={accountPageElementsIds.actionsSectionTitle}
    >
      <CardHeader
        title={
          <CardHeaderTitle
            id={accountPageElementsIds.actionsSectionTitle}
            title="Действия"
          />
        }
        sx={{ pb: { xs: 1, sm: 2 } }}
      />
      <CardActions
        sx={{
          p: 2,
          flexDirection: "column",
          gap: 1,
          "& > :not(:first-of-type)": { ml: 0 },
        }}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{ width: "100%" }}
          onClick={() => authStore.logout()}
        >
          Выход
        </Button>
      </CardActions>
    </Box>
  );
};
