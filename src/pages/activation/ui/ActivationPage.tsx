import { Box, Card, CardContent, Container } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router";
import { PageTitle } from "@widgets/PageTitle";
import { ActivationMessage } from "@widgets/ActivationMessage";
import { VisuallyHiddenTypography } from "@shared/ui";

export const ActivationPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code") ?? "";

  if (!code) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Container maxWidth="md">
        <Box py={{ xs: 2, sm: 4 }}>
          <PageTitle title="Активация аккаунта" />
          <Card>
            <VisuallyHiddenTypography>
              Сообщение об активации аккаунта
            </VisuallyHiddenTypography>
            <CardContent>
              <ActivationMessage code={code} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};
