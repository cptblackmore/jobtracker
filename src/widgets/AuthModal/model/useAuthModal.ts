import { changeTextContentById, focusElementById } from '@shared/lib';
import { AuthContext } from '@features/Auth';
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { authModalElementsIds, globalElementsIds } from '@shared/ui';
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
  const ariaInformerTextRef = useRef<HTMLDivElement>(null);
  const { validateInput, validateForm } = useValidateAuth(setErrors);

  const debouncedValidateInput = useCallback((debounce((input: 'email' | 'password', value: string) => {
    validateInput(input, value);
  }, 1000)), [validateInput]);

  useEffect(() => {
    if (ariaInformerTextRef.current) {
      ariaInformerTextRef.current.textContent = '';
    }
    setTimeout(() => {
      if (ariaInformerTextRef.current) {
        ariaInformerTextRef.current.textContent = `Ошибка: ${errors.email}${errors.password && ', ' + errors.password}${errors.serverValidation && ', ' + errors.serverValidation}`;
      }
    });
  }, [errors])

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
      changeTextContentById(globalElementsIds.ariaInformer, '');
      setTimeout(() => changeTextContentById(globalElementsIds.ariaInformer, 'Авторизация прошла успешно'), 500);
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
    ariaInformerTextRef,
    handleOnChange,
    authStore
  };
} 
