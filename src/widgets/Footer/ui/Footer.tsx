import {
  Box,
  Container,
  Divider,
  Grid2,
  Link,
  Typography as T,
} from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.secondary,
        py: { xs: 2, sm: 3 },
        mt: "auto",
      }}
      role="contentinfo"
      aria-label="Футер"
    >
      <Container maxWidth="md">
        <Grid2 container spacing={{ xs: 1, sm: 2 }} justifyContent="center">
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <T component="h5" variant="subtitle1">
              О проекте
            </T>
            <T variant="body2">
              {
                "JobTracker - инструмент для удобного поиска вакансий одновременно с нескольких источников. "
              }
              <Link
                href="https://github.com/cptblackmore/jobtracker/blob/main/README.md"
                color="inherit"
              >
                Подробнее...
              </Link>
            </T>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <T component="h5" variant="subtitle1">
              Контакты
            </T>
            <Box display="flex">
              <T component="p" variant="subtitle2">
                {"Почта: "}
                <Link
                  variant="body2"
                  href="mailto:redshatterr@gmail.com"
                  color="inherit"
                >
                  redshatterr@gmail.com
                </Link>
              </T>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <T component="h5" variant="subtitle1">
              Социальные сети
            </T>
            <Link
              variant="subtitle2"
              href="https://github.com/cptblackmore/jobtracker"
              color="inherit"
            >
              GitHub
            </Link>
          </Grid2>
        </Grid2>
        <Divider sx={{ my: 2 }} />
        <T variant="body2" align="center">
          <Link href="https://opensource.org/licenses/MIT" color="inherit">
            MIT License
          </Link>
          {` © ${new Date().getFullYear()} `}
          <Link href="https://github.com/cptblackmore" color="inherit">
            cptblackmore
          </Link>
        </T>
      </Container>
    </Box>
  );
};
