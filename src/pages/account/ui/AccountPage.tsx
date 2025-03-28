import { Box, Card, Container, Divider } from '@mui/material';
import { AccountInfo } from '@widgets/AccountInfo';
import { PageTitle } from '@widgets/PageTitle';
import { AccountActions } from '@widgets/AccountActions';
import { AccountActivation } from '@widgets/AccountActivation';

export const AccountPage: React.FC = () => {
  return (
    <>
      <Container maxWidth='md' >
        <Box py={4} >
          <PageTitle title='Личный кабинет' />
          <Card>
            <Box display='flex' >
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
