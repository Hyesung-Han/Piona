import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Tooltip } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              계정이 있으신가요? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                로그인
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  피어나 ADMIN
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>모든 정보를 입력해주세요.</Typography>
              </Box>
              <Tooltip title={capitalCase(method)}>
                <>
                  <Image
                    disabledEffect
                    src="/assets/piona_logo.png" alt="logo"
                    sx={{ width: 100, height: 100 }}
                  />
                </>
              </Tooltip>
            </Box>

            <RegisterForm />

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                계정이 있으신가요?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  로그인
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
