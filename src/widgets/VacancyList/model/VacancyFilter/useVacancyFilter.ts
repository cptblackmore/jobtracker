import { VacancyParams, VacancyPeriod, VacancyType, Sources } from '@entities/Vacancy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateUrlFilters } from './updateUrlFitlers';

export const useVacancyFilter = (
  filters: VacancyParams['filters'], 
  setFilters: (filters: VacancyParams['filters']) => void
) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [text, setText] = useState(filters?.text ?? '');
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

    updateUrlFilters(newFilters, navigate)
    setFilters(newFilters);
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
