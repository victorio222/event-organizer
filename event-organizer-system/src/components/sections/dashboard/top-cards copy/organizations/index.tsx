import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import Organizations from './Organizations';
import IconifyIcon from 'components/base/IconifyIcon';

const Activity = () => {
  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={(theme) => ({
        px: 3,
        py: 2.5,
        background: `linear-gradient(135deg, ${theme.palette.gradients.green.state} 0%, ${theme.palette.gradients.green.main} 100%)`,
      })}
    >
      <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.gradients.green.state} 20%, ${theme.palette.info.light} 100%)`,
          })}
          borderRadius="50%"
        >
          <IconifyIcon icon="ic:round-people-alt" color="info.light" fontSize="h3.fontSize" />
        </Stack>
      <Box
        marginLeft={-7}
        >
        <Typography variant="body2" color="info.dark" fontWeight={500}>
          Organizations
        </Typography>
        <Typography mt={1} variant="h3" color="info.light">
          120
        </Typography>
      </Box>

      <Box
        paddingTop={8}>
      {/* <Organizations data={[15, 50, 30, 45, 50]} sx={{ width: 75, height: '68px !important' }} /> */}
      
      <Typography color={'white'}>
          VIEW DETAILS
        </Typography>
      </Box>
    </Paper>
  );
};

export default Activity;
