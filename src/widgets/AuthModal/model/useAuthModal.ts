import { focusElementById } from '@shared/lib';
import { AuthContext } from '@shared/model';
import { ChangeEvent, FormEvent, useCallback, useContext, useState } from 'react';
import { authModalElementsIds } from '../lib/authModalElementsIds';
import { PassthroughError } from '@shared/api';
import { useValidateAuth } from './useValidateAuth';
import { debounce } from '@mui/material';

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
  const { validateInput, validateForm } = useValidateAuth(setErrors);

  const debouncedValidateInput = useCallback((debounce((input: 'email' | 'password', value: string) => {
    validateInput(input, value);
  }, 1000)), [validateInput]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, input: 'email' | 'password') => {
    setErrors((prev) => ({...prev, [input]: '', serverValidation: ''}));
    if (event.target.value === '') {
      debouncedValidateInput.clear();
      return;
    }
    
    debouncedValidateInput(input, event.target.value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const email = formJson.email as string;
    const password = formJson.password as string;

    const inputWithError = validateForm(email, password);
    if (inputWithError) {
      if (inputWithError === 'email') {
        focusElementById(authModalElementsIds.emailInput);
      } else if (inputWithError === 'password') {
        focusElementById(authModalElementsIds.passwordInput);
      }
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
    handleOnChange,
    authStore
  };
} 
