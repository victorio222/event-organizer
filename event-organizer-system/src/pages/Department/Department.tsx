import Grid from '@mui/material/Grid';
import Department from 'components/sections/department';

const Events = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12} lg={12}>
        <Department />
      </Grid>
    </Grid>
  );
};

export default Events;
