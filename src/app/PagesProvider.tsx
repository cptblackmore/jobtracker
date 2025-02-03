import { pages, PagesContext } from '@shared/lib';

interface Props {
  children: React.ReactNode
}

export const PagesProvider: React.FC<Props> = ({ children }) => {
  return (
    <PagesContext.Provider value={pages} >
      {children}
    </PagesContext.Provider>
  );
};
