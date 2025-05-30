import { Box, Button, Menu } from "@mui/material";
import { AuthContext } from "@features/Auth";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useMenu } from "../model/useMenu";
import { AccountMenuItems } from "./AccountMenuItems";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { PagesContext } from "@shared/config";
import { navElementsIds } from "@shared/ui";

interface Props {
  onClose?: () => void;
}

export const AccountMenu: React.FC<Props> = observer(({ onClose }) => {
  const { authStore } = useContext(AuthContext);
  const { handleCloseMenu, handleOpenMenu, anchorElMenu } = useMenu();
  const { currentPage, pages } = useContext(PagesContext);

  return (
    <Box display="flex" alignItems="center">
      <Button
        id={navElementsIds.accountMenuButton}
        onClick={handleOpenMenu}
        endIcon={
          <Box display="flex">
            {anchorElMenu ? <ArrowDropUp /> : <ArrowDropDown />}
          </Box>
        }
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          backgroundColor: (theme) =>
            currentPage?.id === pages.account.id
              ? theme.palette.primary.light
              : "transparent",
        }}
        aria-label="Открыть меню пользователя"
        aria-haspopup="menu"
        aria-expanded={!!anchorElMenu}
        aria-controls={navElementsIds.accountMenu}
      >
        {authStore.user.email.split("@")[0]}
      </Button>
      <Menu
        id={navElementsIds.accountMenu}
        anchorEl={anchorElMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElMenu)}
        onClose={handleCloseMenu}
      >
        {AccountMenuItems({ handleCloseMenu, onClose })}
      </Menu>
    </Box>
  );
});
