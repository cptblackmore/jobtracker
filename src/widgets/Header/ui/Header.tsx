import { AppBar, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar } from '@mui/material';
import { useNavMenu } from '../model/useNavMenu';
import { HeaderMd } from './HeaderMd';
import { HeaderXs } from './HeaderXs';
import { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthContext } from '@shared/model';

interface Props {
  pages: Record<string, [string, string]>;
}

export const Header: React.FC<Props> = observer(({ pages }) => {
  const { handleCloseNavMenu, handleOpenNavMenu, anchorElNav } = useNavMenu();
  const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);
  const { authStore } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email as string;
    const password = formJson.password as string;

    if (isLogin) {
      authStore.login(email, password);
    } else {
      authStore.registration(email, password);
    }

    setAuthModalIsOpen(false);
  };

  function toggleForm() {
    setIsLogin(prev => !prev);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant='dense'>
          <HeaderMd pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
          <HeaderXs pages={pages} handleCloseNavMenu={handleCloseNavMenu} handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav} />
          <Box display='flex' justifyContent='center' alignItems='center' width='auto' >
            {authStore.isLoading ? (
              <CircularProgress size='2em' sx={{color: 'white', marginLeft: '1em', marginRight: '1em'}} />
            ) : (
              authStore.isAuth ? (
                <Button sx={{color: 'white'}} onClick={() => authStore.logout()}>Выход</Button>
              ) : (
                <Button sx={{color: 'white'}} onClick={() => setAuthModalIsOpen(true)}>Вход</Button>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={authModalIsOpen}
        onClose={() => setAuthModalIsOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{isLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isLogin ? 'Введите свой email и пароль для входа:' : 'Создайте аккаунт, введя email и пароль:'}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="E-mail адрес"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <Button size='small' type='button' onClick={toggleForm}>
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuthModalIsOpen(false)}>Отмена</Button>
          <Button variant="contained" type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
});
