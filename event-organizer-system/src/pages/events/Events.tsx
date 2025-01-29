import Grid from '@mui/material/Grid';
import Event from 'components/sections/dashboard/events';

const Events = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12} lg={12}>
        <Event />
      </Grid>
    </Grid>
  );
};

export default Events;
