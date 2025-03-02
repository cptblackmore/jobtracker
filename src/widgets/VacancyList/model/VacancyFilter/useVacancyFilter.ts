import { VacancyParams, VacancyPeriod, VacancyType, Sources } from '@entities/Vacancy';
import { isEqual, urlParametrizeEntries } from '@shared/lib';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { parseUrlSearch } from '../VacancyFilter/parseUrlSearch';

export const useVacancyFilter = (
  filters: VacancyParams['filters'], 
  setFilters: (filters: VacancyParams['filters']) => void
) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [text, setText] = useState(filters?.text ?? '');
  const location = useLocation();
  const navigate = useNavigate();
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newFilters: VacancyParams['filters'] = {
      text: formData.get('text') as string,
      period: Number(formData.get('period')) as VacancyPeriod,
      salary: formData.get('salary') === 'on' ? {from: Number(formData.get('salaryFrom')), to: Number(formData.get('salaryTo'))} : undefined,
      type: formData.get('type') !== 'none' ? formData.get('type') as VacancyType : undefined,
      excludedSources: formData.getAll('excludedSource').map((source) => source as Sources)
    };

    setFilters(newFilters);

    const periodAsParam = newFilters?.period === 0 ? null : newFilters?.period;
    const updatedParams = urlParametrizeEntries({...newFilters, period: periodAsParam});
    const currentUrl = new URL(window.location.href);
    const newPathnameAndSearch = `${location.pathname}?${updatedParams}`;
    const newUrl = new URL(newPathnameAndSearch, window.location.origin);
    if (!isEqual(parseUrlSearch(currentUrl.search), parseUrlSearch(newUrl.search))) {
      if (updatedParams) {
        navigate(newPathnameAndSearch);
      } else {
        navigate(location.pathname);
      }
    }
  }

  useEffect(() => {
    setText(filters?.text ?? '');
  }, [filters])

  return {
    showAdditional,
    setShowAdditional,
    text,
    setText,
    handleSubmit
  }
}
