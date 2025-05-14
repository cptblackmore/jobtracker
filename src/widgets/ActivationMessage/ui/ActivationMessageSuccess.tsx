import { Box } from "@mui/material";
import { ActivationAlert } from "./ActivationAlert";
import { Typography as T } from "@mui/material";

export const ActivationMessageSuccess: React.FC = () => {
  return (
    <>
      <ActivationAlert severity="success" title="Успех!">
        Ваш аккаунт успешно активирован.
      </ActivationAlert>
      <Box mt={3}>
        <T>
          Теперь избранные вакансии сохраняются на вашем аккаунте и доступны с
          любого устройства.
        </T>
      </Box>
    </>
  );
};
