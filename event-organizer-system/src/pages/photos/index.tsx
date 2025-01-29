import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PhotoUpload from './Images';
import Header from 'components/sections/user/header/header';
import Footer from 'components/sections/user/footer/footer';
const Photos = () => {
  return (
    <>
      <Paper sx={{ px: 0, height: '100%'}}>
        <Header />
        <Box sx={{ height: 630, mt: 5, flexGrow: 1, mx: 10 }} >
          <PhotoUpload />
        </Box>
        <Footer />
      </Paper>
    </>
  );
};

export default Photos;
