import { AuthContext } from '@shared/model';
import { useContext } from 'react';

export const useAuthModal = () => {
  const { authStore } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email as string;
    const password = formJson.password as string;

    if (authStore.isModalLoginForm) {
      authStore.login(email, password);
    } else {
      authStore.registration(email, password);
    }
  };

  const setOpen = (bool: boolean) => {
    authStore.setModalOpen(bool);
  }

  function toggleForm() {
    authStore.setModalLoginForm(!authStore.isModalLoginForm);
  };

  return { 
    open: authStore.isModalOpen, 
    setOpen, 
    isLoginForm: authStore.isModalLoginForm, 
    toggleForm, 
    handleSubmit 
  };
} 
