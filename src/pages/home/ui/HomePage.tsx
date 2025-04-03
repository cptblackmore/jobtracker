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
import { SxProps } from '@mui/material';

export const HomePage: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const infoSectionStyle: SxProps = {py: {xs: 4, md: 8}};
  const ctaSectionStyle: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: {xs: 2, md: 0}
  }

  return (
    <>
      <HeroSection sectionStyle={ctaSectionStyle} />
      <RevealOnScroll >
        <FeaturesSection sectionStyle={infoSectionStyle} />
      </RevealOnScroll>
      {authStore.isInit ? (
        !authStore.isAuth ? (
          <RegistrationSection sectionStyle={ctaSectionStyle} />
        ) : (
          <StatusSection sectionStyle={infoSectionStyle} />
        )
      ) : (
        <LoadingSection />
      )}
      <RevealOnScroll threshold={0.1} >
        <DemoSection sectionStyle={infoSectionStyle} />
      </RevealOnScroll>
      {authStore.isInit ? (
        !authStore.isAuth && (
          <StatusSection sectionStyle={infoSectionStyle} />
        )
      ) : null}
    </>
  );
});
