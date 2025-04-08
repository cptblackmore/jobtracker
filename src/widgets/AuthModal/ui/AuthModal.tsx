import { alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAuthModal } from '../model/useAuthModal';
import { focusElementById } from '@shared/lib';
import { navElementsIds } from '@widgets/Nav';

export const AuthModal = observer(() => {
  const { open, setOpen, isLoginForm, toggleForm, handleSubmit, authStore } = useAuthModal();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition={false}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: {
          px: isSmUp ? 0 : 2,
          py: isSmUp ? 0 : 4,
          ...(!isSmUp && {
            backgroundColor: alpha(theme.palette.background.default, 0.95),
            backdropFilter: 'blur(1px)'
          })
        }
      }}
      fullScreen={!isSmUp}
      onTransitionExited={() => authStore.isInit && authStore.isAuth && focusElementById(navElementsIds.accountMenuButton)}
    >
      <DialogTitle
        sx={{textAlign: 'center', mb: 1}}
      >
        {isLoginForm ? 'Вход' : 'Регистрация'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2, textAlign: 'center' }} >
          {isLoginForm 
            ? 'Введите свой email и пароль для входа:' 
            : 'Создайте аккаунт, введя email и пароль:'}
        </DialogContentText>
        <Stack spacing={2} >
          <TextField
            autoFocus
            required
            id='email'
            name='email'
            label='E-mail адрес'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            required
            id='password'
            name='password'
            label='Пароль'
            type='password'
            fullWidth
            variant='standard'
          />
        </Stack>
        <Box mt={2} textAlign='center' >
          <DialogContentText component='span' >
            {isLoginForm ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </DialogContentText>
          <Button size='small' type='button' onClick={toggleForm} >
            {isLoginForm ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: isSmUp ? 'row' : 'column',
          alignItems: 'stretch',
          gap: isSmUp ? 1 : 1.5,
          pt: 3,
          px: {xs: 3, sm: 1},
          '& > :not(:first-of-type)': {ml: 0}
        }}
      >
        <Button 
          onClick={() => setOpen(false)}
          fullWidth={!isSmUp}
        >
          Отмена
        </Button>
        <Button 
          sx={{...(!isSmUp && {flexGrow: 1})}} 
            variant='contained' 
            type='submit'
            fullWidth={!isSmUp}
          >
            {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
          </Button>
      </DialogActions>
    </Dialog>
  );
});
