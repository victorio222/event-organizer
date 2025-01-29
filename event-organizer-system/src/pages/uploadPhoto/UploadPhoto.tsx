import Grid from '@mui/material/Grid';
import PhotoUpload from 'components/sections/uploadPhotos';

const UploadPhoto = () => {
  return (
    <Grid spacing={2.5} >
      <Grid item xs={12} md={12} lg={100}>
        <PhotoUpload />
      </Grid>
    </Grid>
  );
};

export default UploadPhoto;
