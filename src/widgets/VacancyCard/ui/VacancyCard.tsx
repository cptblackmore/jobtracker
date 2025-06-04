import {
  Box,
  Card,
  CardActions,
  Divider,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { sourcesRegistry, Vacancy } from "@entities/Vacancy";
import { VacancyFeatures } from "./VacancyFeatures";
import { VacancyDetails } from "./VacancyDetails";
import { VacancyAdditional } from "./VacancyAdditional";
import { ExternalLinkButton } from "@shared/ui";
import { memo } from "react";

interface Props {
  vacancy: Vacancy;
}

export const VacancyCard: React.FC<Props> = memo(({ vacancy }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Fade in timeout={200}>
      <Card
        component="article"
        sx={{ display: isSmUp ? "flex" : "block", width: "100%" }}
      >
        <Box display="flex" flexGrow={1}>
          {isSmUp && <VacancyFeatures vacancy={vacancy} />}
          {isSmUp && (
            <Divider orientation="vertical" flexItem variant="middle" />
          )}
          <VacancyDetails vacancy={vacancy} />
        </Box>
        {isSmUp && <Divider orientation="vertical" flexItem variant="middle" />}
        {isSmUp && <VacancyAdditional vacancy={vacancy} />}
        {!isSmUp && (
          <>
            <Divider variant="middle" />
            <CardActions sx={{ justifyContent: "center", py: 0.5 }}>
              <ExternalLinkButton
                text="Подробнее"
                variant="text"
                size="small"
                link={vacancy.link}
                sx={{ width: "100%" }}
                ariaLabel={`Переход на страницу вакансии ${sourcesRegistry[vacancy.source].url.frontendDomain}`}
              />
            </CardActions>
          </>
        )}
      </Card>
    </Fade>
  );
});
