import { Box, Button, Container, SxProps } from "@mui/material";
import { AuthContext } from "@features/Auth";
import { useContext } from "react";
import { CtaTitle } from "./CtaTitle";
import { homePageElementsIds } from "@shared/ui";

interface Props {
  sectionStyle: SxProps;
}

export const RegistrationSection: React.FC<Props> = ({ sectionStyle }) => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box
      component="section"
      sx={{ minHeight: { xs: "90vh", md: "40vh" }, ...sectionStyle }}
      role="region"
      aria-labelledby={homePageElementsIds.registationHeading}
      aria-describedby={homePageElementsIds.registationDescription}
    >
      <Container maxWidth="sm">
        <h2
          id={homePageElementsIds.registationHeading}
          style={{ margin: 0, fontSize: 0 }}
        >
          Регистрация
        </h2>
        <CtaTitle
          id={homePageElementsIds.registationDescription}
          title="Заведите аккаунт и избранные вакансии будут доступны с любого устройства"
        />
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => authStore.setModalOpen(true, "registration")}
          aria-label="Открыть форму регистрации"
        >
          Пройти регистрацию
        </Button>
      </Container>
    </Box>
  );
};
