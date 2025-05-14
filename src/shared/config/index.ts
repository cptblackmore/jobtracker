export type { Page, Pages, PagesState } from "./PagesContext";
export { PagesContext, pages } from "./PagesContext";

export const VACANCIES_COUNT_PER_SOURCE = 5;
export const SALARY_MIN = 0;
export const SALARY_MAX = 500_000;
export const SALARY_STEP = 1000;
export const FAVORITES_CHUNK_SIZE = 5;
export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
