import Grid from '@mui/material/Grid';
import TotalEvents from './totalEvents';
import Organizations from './organizations';
import Approved from './approved';
import Pending from './pending';
import Rejected from './rejected';
import UploadPhotos from '../top-cards/departments';

const TopCards = () => {
  return (    
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={4} xl={4}>
        <TotalEvents />
      </Grid>
      <Grid item xs={12} sm={4} xl={4}>
        <UploadPhotos />
      </Grid>
      <Grid item xs={12} sm={4} xl={4}>
        <Organizations />
      </Grid>

      <Grid item xs={12} sm={4} xl={4}>
        <Approved />
      </Grid>
      <Grid item xs={12} sm={4} xl={4}>
        <Pending />
      </Grid>
      <Grid item xs={12} sm={4} xl={4}>
        <Rejected />
      </Grid>
    </Grid>
  );
};

export default TopCards;
