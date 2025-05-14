import {
  AppBar,
  Box,
  Container,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavCompact } from "./NavCompact";
import { NavFull } from "./NavFull";
import { useHideNav } from "../model/useHideNav";

export const Nav: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { isVisible } = useHideNav();

  return (
    <Slide appear={false} direction="down" in={isSmUp ? true : isVisible}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          visibility: "visible !important",
        }}
        role="navigation"
        aria-label="Навигация по сайту"
      >
        <Container maxWidth="xl" sx={{ px: 1 }}>
          {isMdUp ? (
            <Box flexGrow={1} display="display">
              <NavFull />
            </Box>
          ) : (
            <Box flexGrow={1} display="display">
              <NavCompact />
            </Box>
          )}
        </Container>
      </AppBar>
    </Slide>
  );
};
