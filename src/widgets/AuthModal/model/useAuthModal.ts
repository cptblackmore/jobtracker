import { focusElementById } from '@shared/lib';
import { AuthContext } from '@shared/model';
import { useContext, useState } from 'react';
import { authModalElementsIds } from '../lib/authModalElementsIds';
import { validateAuthForm } from './validateAuthForm';
import { PassthroughError } from '@shared/api';

export const useAuthModal = (triggerShakeAnim: () => void) => {
  const { authStore } = useContext(AuthContext);
  const [errors, setErrors] = useState<
  {
    email?: string;
    password?: string;
    serverValidation?: string;
  }>({
    email: '',
    password: '',
    serverValidation: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const email = formJson.email as string;
    const password = formJson.password as string;

    const newErrors = validateAuthForm(email, password);
    if (newErrors) {
      if (newErrors.email) {
        focusElementById(authModalElementsIds.emailInput);
      } else if (newErrors.password) {
        focusElementById(authModalElementsIds.passwordInput);
      }
      setErrors((prev) => ({...prev, ...newErrors}));
      triggerShakeAnim();
      return;
    }

    try {
      if (authStore.isModalLoginForm) {
        await authStore.login(email, password);
      } else {
        await authStore.registration(email, password);
      }
    } catch (e) {
      if (e instanceof PassthroughError) {
        focusElementById(authModalElementsIds.emailInput);
        setErrors((prev) => ({...prev, serverValidation: e.message}));
        setTimeout(() => {
        triggerShakeAnim();
        }, 10);
      }
    }
  };

  const setOpen = (bool: boolean) => {
    setErrors({email: '', password: '', serverValidation: ''});
    authStore.setModalOpen(bool);
  }

  function toggleForm() {
    setErrors({email: '', password: '', serverValidation: ''});
    authStore.setModalLoginForm(!authStore.isModalLoginForm);
  };

  return { 
    open: authStore.isModalOpen, 
    setOpen, 
    isLoginForm: authStore.isModalLoginForm, 
    toggleForm, 
    handleSubmit,
    errors,
    setErrors,
    authStore
  };
} 
