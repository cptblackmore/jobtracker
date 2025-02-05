import { createContext } from "react";

export const pages: Record<string, [string, string]> = {
  home: ['Главная', '/home'],
  feed: ['Вакансии', '/feed'],
  favorites: ['Избранное', '/favorites'],
  activation: ['', '/activation'],
  account: ['', '/account']
}

export const PagesContext = createContext<Record<string, [string, string]>>(pages);
