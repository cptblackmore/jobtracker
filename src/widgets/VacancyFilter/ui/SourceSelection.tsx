import { Info } from "@mui/icons-material";
import {
  alpha,
  Box,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  lighten,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { VacancySource } from "@widgets/VacancySource/ui/VacancySource";
import { useContext } from "react";
import { filterLabelsMap } from "../model/filterLabelsMap";
import { SourceFilter } from "../model/useSourcesFilter";
import {
  AriaInformer,
  ThemesContext,
  VisuallyHiddenTypography,
} from "@shared/ui";
import { Sources, sourcesRegistry } from "@entities/Vacancy";
import { getHightlightAnimation } from "./styles";

interface Props {
  sources: SourceFilter[];
  handleSourceChange: (source: SourceFilter) => void;
  highlightedSources: Sources[];
}

export const SourceSelection: React.FC<Props> = ({
  sources,
  handleSourceChange,
  highlightedSources,
}) => {
  const { themeMode } = useContext(ThemesContext);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <FormControl component="fieldset" fullWidth>
      <legend style={{ fontSize: 0 }}>{filterLabelsMap.sources}</legend>
      <AriaInformer>
        {sources
          .filter((s) => s.incompatible)
          .map(
            (s) =>
              `Источник ${sourcesRegistry[s.source].styles.name} отключён из-за несовместимости`,
          )
          .join(". ")}
      </AriaInformer>
      <FormGroup sx={{ flexDirection: "row", gap: 1 }}>
        {sources.map((source) => (
          <Box
            key={source.source}
            sx={{
              opacity: source.incompatible ? 0.5 : 1,
              border: `1px solid ${themeMode === "light" ? source.color : lighten(source.color, 0.4)}`,
              ...getHightlightAnimation(highlightedSources, source.source),
              borderRadius: 1,
              backgroundColor: `
                ${
                  source.checked && !source.incompatible
                    ? themeMode === "light"
                      ? alpha(source.color, 0.1)
                      : alpha(lighten(source.color, 0.4), 0.2)
                    : "transparent"
                }
              `,
              transition: "background-color 0.2s",
            }}
          >
            {(!source.checked || source.incompatible) && (
              <input
                type="hidden"
                name="excludedSource"
                value={source.source}
              />
            )}

            <FormControlLabel
              sx={{ ml: 0, mr: source.incompatibleFilters ? 0.4 : 1.4 }}
              control={
                <Checkbox
                  name="source"
                  size="small"
                  value={source.source}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color:
                        themeMode === "light"
                          ? source.color
                          : lighten(source.color, 0.4),
                      fontSize: isSmUp ? "1.25rem" : "1.1rem",
                    },
                  }}
                  checked={source.checked && !source.incompatible}
                  onChange={() => handleSourceChange(source)}
                />
              }
              label={
                <>
                  <VacancySource
                    source={source.source}
                    size={isSmUp ? 1 : 0.9}
                  />
                  <VisuallyHiddenTypography variant="p">
                    {source.checked && !source.incompatible
                      ? "Активен"
                      : "Не активен"}
                    {source.incompatibleFilters
                      ? "Имеет особенности - изучите справку"
                      : ""}
                  </VisuallyHiddenTypography>
                </>
              }
            />
            {source.incompatibleFilters && (
              <Tooltip
                arrow
                TransitionComponent={Fade}
                title={
                  `Сервис «${sourcesRegistry[source.source].styles.name}» несовместим со следующими фильтрами: ` +
                  source.incompatibleFilters
                    .map((filter) => filterLabelsMap[filter])
                    .join(", ")
                }
                aria-label={
                  `Справка: Сервис «${sourcesRegistry[source.source].styles.name}» несовместим со следующими фильтрами: ` +
                  source.incompatibleFilters
                    .map((filter) => filterLabelsMap[filter])
                    .join(", ")
                }
              >
                <IconButton
                  sx={{ p: 0.5, ml: 0, my: 0.5, mr: 0.5 }}
                  size={isSmUp ? "medium" : "small"}
                >
                  <Info sx={{ fontSize: "0.8em" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ))}
      </FormGroup>
    </FormControl>
  );
};
