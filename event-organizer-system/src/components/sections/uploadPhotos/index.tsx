import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PhotoUpload from './PhotoUpload';
const Photos = () => {
  return (
    <>
      <Paper sx={{ px: 0, height: '100%'}}>
        <Box sx={{ height: 630, mt: -7, flexGrow: 1 }} >
          <PhotoUpload />
        </Box>
      </Paper>
    </>
  );
};

export default Photos;
