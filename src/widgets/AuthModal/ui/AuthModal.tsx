import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAuthModal } from '../model/useAuthModal';

export const AuthModal = observer(() => {
  const { open, setOpen, isLoginForm, toggleForm, handleSubmit } = useAuthModal();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{isLoginForm ? 'Вход' : 'Регистрация'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isLoginForm ? 'Введите свой email и пароль для входа:' : 'Создайте аккаунт, введя email и пароль:'}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin='dense'
          id='email'
          name='email'
          label='E-mail адрес'
          type='email'
          fullWidth
          variant='standard'
        />
        <TextField
          required
          margin='dense'
          id='password'
          name='password'
          label='Пароль'
          type='password'
          fullWidth
          variant='standard'
        />
        <DialogContentText>
          {isLoginForm ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <Button size='small' type='button' onClick={toggleForm}>
            {isLoginForm ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Отмена</Button>
        <Button variant="contained" type="submit">{isLoginForm ? 'Войти' : 'Зарегистрироваться'}</Button>
      </DialogActions>
    </Dialog>
  );
});
