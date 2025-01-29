import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import UploadPhotos from './UploadPhotos';
import IconifyIcon from 'components/base/IconifyIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Activity = () => {
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/colleges`);
        const departmentTotal = response.data; 
        setDepartmentCount(departmentTotal.length);
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
        background: `linear-gradient(135deg, ${theme.palette.gradients.primary.state} 0%, ${theme.palette.gradients.primary.main} 100%)`,
      })}
    >
      <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.gradients.primary.main} 20%, ${theme.palette.info.light} 100%)`,
          })}
          borderRadius="50%"
        >
          <IconifyIcon icon="ic:baseline-image" color="info.light" fontSize="h3.fontSize" />
        </Stack>
      <Box
        marginLeft={-2}
        width={'30%'}
      >
        <Typography variant="body2" color="info.dark" fontWeight={500}>
          Departments
        </Typography>
        <Typography mt={1} variant="h3" color="info.light">
          {departmentCount}
        </Typography>
      </Box>

      <Box
        paddingTop={8}
        >
      {/* <UploadPhotos data={[15, 50, 30, 45, 50]} sx={{ width: 75, height: '68px !important' }} /> */}
      
      <Typography color={'white'}>
          VIEW DETAILS
        </Typography>
      </Box>
    </Paper>
  );
};

export default Activity;
