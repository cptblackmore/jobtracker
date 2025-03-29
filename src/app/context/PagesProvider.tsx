import { Page, pages, PagesContext } from '@shared/lib';
import { useState } from 'react';

interface Props {
  children: React.ReactNode
}

export const PagesProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  function updateCurrentPage(path: string) {
    const matchedPage = Object.values(pages).find(page => page.path === path);
    setCurrentPage(matchedPage || null);
  }

  return (
    <PagesContext.Provider value={{pages, currentPage, updateCurrentPage}} >
      {children}
    </PagesContext.Provider>
  );
};
