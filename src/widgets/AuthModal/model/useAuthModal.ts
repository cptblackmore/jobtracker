import { AuthContext } from '@shared/model';
import { useContext, useState } from 'react';

export const useAuthModal = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { authStore } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email as string;
    const password = formJson.password as string;

    if (isLoginForm) {
      authStore.login(email, password);
    } else {
      authStore.registration(email, password);
    }
  };

  const setOpen = (bool: boolean) => {
    authStore.setModalOpen(bool);
  }

  function toggleForm() {
    setIsLoginForm(prev => !prev);
  };

  return { open: authStore.isModalOpen, setOpen, isLoginForm, toggleForm, handleSubmit };
} 
