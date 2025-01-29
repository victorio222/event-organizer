import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      alignItems="top"
      justifyContent="center"
      width='100%'
      minHeight="100vh"
    >
      <Paper sx={{ px: { xs: 2, sm: 3.5 }, py: 4, width: 1, maxWidth: 2000 }}>{children}</Paper>
    </Stack>
  );
};

export default AuthLayout;
