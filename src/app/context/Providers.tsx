import { ReactNode } from "react";
import { StoresProvider } from "./StoresProvider";
import { PagesProvider } from "./PagesProvider";
import { ThemesProvider } from "./ThemesProvider";

interface Props {
  children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <StoresProvider>
      <PagesProvider>
        <ThemesProvider>{children}</ThemesProvider>
      </PagesProvider>
    </StoresProvider>
  );
};
