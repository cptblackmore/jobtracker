import { createContext } from 'react';

interface Page {
  id: number;
  name: string;
  path: string;
  inNav: boolean;
  inAccountNav: boolean;
}

interface PageNowhere extends Page {
  inNav: false;
  inAccountNav: false;
}

interface PageInNav extends Page {
  inNav: true;
  inAccountNav: false;
}

interface PageInAccountNav extends Page {
  inNav: false;
  inAccountNav: true;
}

type PageKeys = 'home' | 'search' | 'favorites' | 'activation' | 'account';

export type Pages = Record<PageKeys, PageNowhere | PageInNav | PageInAccountNav>;

export const pages: Pages = {
  home: {id: 0, name: 'Главная', path: '/home', inNav: true, inAccountNav: false},
  search: {id: 1, name: 'Поиск', path: '/search', inNav: true, inAccountNav: false},
  favorites: {id: 2, name: 'Избранное', path: '/favorites', inNav: true, inAccountNav: false},
  activation: {id: 3, name: 'Активация', path: '/activation', inNav: false, inAccountNav: false},
  account: {id: 4, name: 'Личный кабинет', path: '/account', inAccountNav: true, inNav: false}
} as const;

export const PagesContext = createContext<Pages>(pages);
