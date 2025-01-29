import Grid from '@mui/material/Grid';
import TopCards from 'components/sections/dashboard/top-cards';
import EventsHistory from 'components/sections/dashboard/events-history';

const Dashbaord = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
      <Grid item xs={12} md={12} lg={100}>
        <EventsHistory />
      </Grid>
    </Grid>
  );
};

export default Dashbaord;
