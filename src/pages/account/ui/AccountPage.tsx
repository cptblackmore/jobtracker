import { Box, Card, Container, Divider } from '@mui/material';
import { Nav } from '@widgets/Nav';
import { AccountInfo } from '@widgets/AccountInfo';
import { PageTitle } from '@widgets/PageTitle';
import { AccountActions } from '@widgets/AccountActions';
import { AccountActivation } from '@widgets/AccountActivation';

export const AccountPage: React.FC = () => {
  return (
    <>
      <Nav />
      <Container maxWidth='md' >
        <Box my={4} >
          <PageTitle title='Личный кабинет' />
          <Card>
            <Box display='flex' alignItems='stretch' height='100%'>
              <AccountInfo />
              <Divider orientation='vertical' flexItem />
              <AccountActions />
            </Box>
            <AccountActivation />
          </Card>
        </Box>
      </Container>
    </>
  );
};
