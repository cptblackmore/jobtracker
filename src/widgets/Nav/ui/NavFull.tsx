import { Box } from "@mui/material";
import { AuthContext } from "@features/Auth";
import { Logo } from "@widgets/Logo";
import { observer } from "mobx-react-lite";
import { AccountMenu } from "./AccountMenu";
import { useContext } from "react";
import { NavToolbar } from "./NavToolbar";
import { LoginButton } from "./LoginButton";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { focusElementById } from "@shared/lib";
import { navElementsIds } from "@shared/ui";

export const NavFull: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  const handleOnAccountMenuClose = () => {
    setTimeout(() => focusElementById(navElementsIds.loginMenuButton));
  };

  return (
    <Box flexGrow={1} display="flex" justifyContent="space-between">
      <Box display="flex">
        <Logo id={navElementsIds.firstElement} />
        <NavToolbar />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <ToggleThemeButton />
        {authStore.isAuth ? (
          <AccountMenu onClose={handleOnAccountMenuClose} />
        ) : (
          <LoginButton />
        )}
      </Box>
    </Box>
  );
});
