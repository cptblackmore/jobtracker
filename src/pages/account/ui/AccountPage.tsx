import {
  Box,
  Card,
  Container,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountInfo } from "@widgets/AccountInfo";
import { PageTitle } from "@widgets/PageTitle";
import { AccountActions } from "@widgets/AccountActions";
import { AccountActivation } from "@widgets/AccountActivation";

export const AccountPage: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Container maxWidth="md">
        <Box py={{ xs: 2, sm: 4 }}>
          <PageTitle title="Личный кабинет" />
          <Card>
            <Box display="flex" flexDirection={isSmUp ? "row" : "column"}>
              <AccountInfo />
              <Divider
                orientation={isSmUp ? "vertical" : "horizontal"}
                flexItem
              />
              <AccountActions />
            </Box>
            <AccountActivation />
          </Card>
        </Box>
      </Container>
    </>
  );
};
