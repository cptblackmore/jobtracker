import { alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAuthModal } from '../model/useAuthModal';
import { blurActiveElement, focusElementById, useTriggerAnimation } from '@shared/lib';
import { navElementsIds } from '@widgets/Nav';
import { authModalElementsIds } from '../lib/authModalElementsIds';
import { shakeKeyframes } from '@shared/ui';
import { getAuthInputAnim } from './getAuthInputAnim';

export const AuthModal = observer(() => {
  const [shakeAnim, triggerShakeAnim] = useTriggerAnimation(shakeKeyframes, '0.5s', 'ease');
  const { 
    open, 
    setOpen, 
    isLoginForm, 
    toggleForm, 
    handleSubmit, 
    errors,
    handleOnChange,
    authStore 
  } = useAuthModal(triggerShakeAnim);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={open}
      onClose={() => {
        blurActiveElement();
        setOpen(false)
      }}
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
        },
        noValidate: true
      }}
      fullScreen={!isSmUp}
      onTransitionEnter={() => focusElementById(authModalElementsIds.emailInput)}
      onTransitionExited={() => {
        if (authStore.isInit && authStore.isAuth) {
          focusElementById(navElementsIds.accountMenuButton);
        } else {
          focusElementById(navElementsIds.loginMenuButton);
        }
      }}
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
            error={!!errors.email || !!errors.serverValidation}
            helperText={errors.email}
            id={authModalElementsIds.emailInput}
            onChange={(e) => handleOnChange(e, 'email')}
            sx={getAuthInputAnim(errors, 'email', shakeAnim)}
            name='email'
            label='E-mail адрес'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            required
            error={!!errors.password || !!errors.serverValidation}
            helperText={errors.password}
            id={authModalElementsIds.passwordInput}
            onChange={(e) => handleOnChange(e, 'password')}
            sx={getAuthInputAnim(errors, 'password', shakeAnim)}
            name='password'
            label='Пароль'
            type='password'
            fullWidth
            variant='standard'
          />
          <FormHelperText sx={{fontSize: '0.9rem'}} error={!!errors.serverValidation} >{errors.serverValidation}</FormHelperText>
        </Stack>
        <Box mt={2} textAlign='center' >
          <DialogContentText component='span' >
            {isLoginForm ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </DialogContentText>
          <Button 
            size='small' 
            type='button' 
            onClick={() => {
              toggleForm();
              focusElementById(authModalElementsIds.emailInput);
            }}
          >
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
