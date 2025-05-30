import { FavoritesContext } from "@features/Favorites";
import { Button, Fade, Toolbar, Tooltip } from "@mui/material";
import { PagesContext } from "@shared/config";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link as RouterLink } from "react-router";

export const NavToolbar: React.FC = observer(() => {
  const { currentPage, pages } = useContext(PagesContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <Toolbar variant="dense" aria-label="Переход по страницам">
      {Object.values(pages).map(
        (page) =>
          page.inNav && (
            <Tooltip
              title={
                page.id === 2
                  ? `${favoritesStore.ids.length > 0 ? `Вакансий в избранном: ${favoritesStore.ids.length}` : "Список избранных вакансий пуст"}`
                  : ""
              }
              key={page.id}
              TransitionComponent={Fade}
            >
              <Button
                key={page.id}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 1,
                  display: "block",
                  color: (theme) => theme.palette.primary.contrastText,
                  backgroundColor: (theme) =>
                    currentPage?.id === page.id
                      ? theme.palette.primary.light
                      : "transparent",
                }}
                aria-label={
                  page.id === 2
                    ? `Избранное: Вакансий в избранном: ${favoritesStore.ids.length}`
                    : page.name
                }
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page.name}
              </Button>
            </Tooltip>
          ),
      )}
    </Toolbar>
  );
});
