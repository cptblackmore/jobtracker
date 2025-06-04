import { FavoriteBorder } from "@mui/icons-material";
import { Box, Typography as T, useMediaQuery, useTheme } from "@mui/material";

export const EmptyFavoritesListMessage: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      px={{ xs: 1, sm: 0 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={{ xs: 2, sm: 3 }}
      mt={{ xs: 3, sm: 5 }}
      mb={{ xs: 5, sm: 3 }}
    >
      <T component="h2" variant={isSmUp ? "h5" : "h6"} color="text.secondary">
        У вас пока нет избранных вакансий.
      </T>
      <T variant={isSmUp ? "body1" : "body2"} color="text.secondary">
        Чтобы добавить вакансию в избранные, нажмите на иконку пустого сердца
        <FavoriteBorder
          fontSize="small"
          aria-hidden="true"
          sx={{ 
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            verticalAlign: "middle",
            margin: "0 0.3em",
          }}
        />
        в карточке вакансии
      </T>
      <T variant={isSmUp ? "body1" : "body2"} color="text.secondary">
        ...или импортируйте вакансии из JSON файла.
      </T>
    </Box>
  );
};
