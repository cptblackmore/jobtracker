import { ReactNode } from "react";
import { StoresProvider } from "./StoresProvider";
import { PagesProvider } from "./PagesProvider";
import { ThemesProvider } from "./ThemesProvider";
import { ReduxProvider } from "./ReduxProvider";

interface Props {
  children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ReduxProvider>
      <StoresProvider>
        <PagesProvider>
          <ThemesProvider>{children}</ThemesProvider>
        </PagesProvider>
      </StoresProvider>
    </ReduxProvider>
  );
};
