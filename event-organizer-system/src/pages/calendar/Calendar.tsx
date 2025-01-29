import Grid from '@mui/material/Grid';
import EventCalendar from 'components/sections/calendar/EventCalendar';

const Calendar = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12} lg={100}>
        <EventCalendar />
      </Grid>
    </Grid>
  );
};

export default Calendar;
