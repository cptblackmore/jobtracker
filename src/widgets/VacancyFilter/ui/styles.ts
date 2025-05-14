import { Sources, VacancyParams } from "@entities/Vacancy";
import { Theme } from "@mui/material/styles";
import { disableKeyframes } from "@shared/ui";

export const getInputTypographyStyles = (theme: Theme) => ({
  "& .MuiInputBase-root": {
    fontSize: {
      xs: "0.9rem",
      sm: theme.typography.body1.fontSize,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: {
      xs: "0.9rem",
      sm: theme.typography.body1.fontSize,
    },
  },
});

export const getMenuItemStyle = (theme: Theme) => ({
  fontSize: { xs: "0.9rem", sm: theme.typography.body1.fontSize },
  minHeight: { xs: 40, sm: 48 },
});

export const getSelectTypographyStyle = (theme: Theme) => ({
  "& .MuiSelect-select": {
    fontSize: { xs: "0.9rem", sm: theme.typography.body1.fontSize },
  },
});

export const getHighlightedColorStyle = (
  highlightedFilters: Array<keyof VacancyParams["filters"]>,
  targetFilter: keyof VacancyParams["filters"],
) => {
  return highlightedFilters.includes(targetFilter)
    ? { color: "warning.main" }
    : {};
};

export const getHighlightedBorderStyle = (
  highlightedFilters: Array<keyof VacancyParams["filters"]>,
  targetFilter: keyof VacancyParams["filters"],
) => {
  return highlightedFilters.includes(targetFilter)
    ? { borderColor: "warning.main" }
    : {};
};

export const getHightlightAnimation = (
  highlightedSources: Sources[],
  targetSource: Sources,
) => {
  return highlightedSources.includes(targetSource)
    ? { animation: `${disableKeyframes} 0.5s ease` }
    : {};
};
