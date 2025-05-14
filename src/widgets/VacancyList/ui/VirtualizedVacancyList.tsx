import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { Vacancy } from "../../../entities/Vacancy/model/Vacancy";
import { VacancyCard } from "@widgets/VacancyCard";
import { Box, CircularProgress } from "@mui/material";
import { useRef } from "react";
import { ScrollToTopButton } from "@shared/ui";

interface Props {
  vacancies: Vacancy[];
  isLoading: boolean;
  toNextPage: () => void;
}

export const VirtualizedVacancyList: React.FC<Props> = ({
  vacancies,
  isLoading,
  toNextPage,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  function scrollToTop() {
    virtuosoRef.current?.scrollToIndex({
      index: 0,
      align: "end",
      behavior: "smooth",
    });
  }

  return (
    <>
      <Virtuoso
        useWindowScroll
        ref={virtuosoRef}
        increaseViewportBy={1200}
        data={vacancies}
        itemContent={(_, vacancy) => (
          <div style={{ paddingBottom: "0.5em" }}>
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          </div>
        )}
        endReached={() => toNextPage()}
        components={{
          Footer: () =>
            isLoading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress size="5em" />
              </Box>
            ) : null,
        }}
      />
      <ScrollToTopButton onClick={scrollToTop} />
    </>
  );
};
