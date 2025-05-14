import { Fab, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

interface Props {
  onClick?: () => void;
}

export const ScrollToTopButton: React.FC<Props> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Fab
      color="primary"
      size={isMdUp ? "large" : "medium"}
      onClick={onClick ?? scrollToTop}
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 32 },
        right: { xs: 16, md: 32 },
        transition: "opacity 0.2s ease-in-out, background 0.2s ease-in",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-label="Переместиться наверх"
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};
