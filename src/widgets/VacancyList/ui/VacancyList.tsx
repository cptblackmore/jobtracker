import { useVacancyList } from "../model/useVacancyList";
import { VacancyFilter } from "@widgets/VacancyFilter";
import { VacancyParams } from "@entities/Vacancy";
import { VirtualizedVacancyList } from "./VirtualizedVacancyList";
import { VACANCIES_COUNT_PER_SOURCE } from "@shared/config";
import { useEffectOnceByCondition, useIsTouchDevice } from "@shared/lib";
import { createAlert, VisuallyHiddenTypography } from "@shared/ui";
import { useTriggerByScroll } from "../lib/useTriggerByScroll";

interface Props {
  initialFilters?: VacancyParams["filters"];
}

export const VacancyList: React.FC<Props> = ({ initialFilters = {} }) => {
  const { state, toNextPage, alertsStore, setFilters, isLoading } =
    useVacancyList({
      page: 0,
      count: VACANCIES_COUNT_PER_SOURCE,
      filters: initialFilters,
    });
  const scrolledEnough = useTriggerByScroll();
  const isTouch = useIsTouchDevice();

  useEffectOnceByCondition(
    () => {
      alertsStore.addAlert(
        createAlert(
          "Прокручивайте страницу вниз, чтобы загрузить больше вакансий",
          "info",
          4000,
          "scroll-down-hint",
          "scroll-down-hint",
        ),
      );
    },
    [isLoading],
    !isLoading,
  );

  useEffectOnceByCondition(
    () => {
      alertsStore.addAlert(
        createAlert(
          'Для прокрутки наверх вы можете использовать сочетание клавиш "Alt+T", а для фокуса на панель навигации - "Alt+N"',
          "info",
          10000,
          "shortcuts-hint",
          "shortcuts-hint",
        ),
      );
    },
    [scrolledEnough],
    !isTouch && scrolledEnough,
  );

  return (
    <>
      <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      <VisuallyHiddenTypography>Список вакансий</VisuallyHiddenTypography>
      <VirtualizedVacancyList
        vacancies={state.vacancies}
        isLoading={isLoading}
        toNextPage={toNextPage}
      />
    </>
  );
};
