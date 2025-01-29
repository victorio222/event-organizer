import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import IconifyIcon from 'components/base/IconifyIcon';

const Activity = () => {
  const [pendingEventsCount, setPendingEventsCount] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        const pendingEvents = response.data.filter((event: { status: string }) => event.status === 'Pending');    
        setPendingEventsCount(pendingEvents.length);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={(theme) => ({
        px: 3,
        py: 2.5,
        background: `linear-gradient(135deg, ${theme.palette.gradients.error.state} 0%, ${theme.palette.gradients.error.main} 100%)`,
      })}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        height={56}
        width={56}
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.palette.error.main} 20%, ${theme.palette.info.light} 100%)`,
        })}
        borderRadius="50%"
      >
        <IconifyIcon icon="ic:baseline-calendar-month" color="info.light" fontSize="h3.fontSize" />
      </Stack>

      <Box marginLeft={-8}>
        <Typography variant="body2" color="info.dark" fontWeight={500}>
          Pending
        </Typography>
        <Typography mt={1} variant="h3" color="info.light">
          {pendingEventsCount}
        </Typography>
      </Box>

      <Box>
        <Typography color={'white'} paddingTop={8}>
          VIEW DETAILS
        </Typography>
      </Box>
    </Paper>
  );
};

export default Activity;
