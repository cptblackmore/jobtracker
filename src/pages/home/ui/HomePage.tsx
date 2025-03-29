import React, { useContext } from 'react';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { StatusSection } from './sections/StatusSection';
import { DemoSection } from './sections/DemoSection';
import { RevealOnScroll } from '@shared/ui';
import { RegistrationSection } from './sections/RegistrationSection';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { LoadingSection } from './sections/LoadingSection';

export const HomePage: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <>
      <HeroSection />
      <RevealOnScroll >
        <FeaturesSection />
      </RevealOnScroll>
      {authStore.isInit ? (
        !authStore.isAuth ? (
          <RegistrationSection />
        ) : (
          <StatusSection />
        )
      ) : (
        <LoadingSection />
      )}
      <RevealOnScroll>
        <DemoSection />
      </RevealOnScroll>
      {authStore.isInit ? (
        !authStore.isAuth && (
          <StatusSection />
        )
      ) : null}
    </>
  );
});
