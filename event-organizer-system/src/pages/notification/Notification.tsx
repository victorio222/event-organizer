import Grid from '@mui/material/Grid';
import NotificationsList from 'components/sections/notification/NotificationList';

const Notification = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12} lg={100}>
        <NotificationsList />
      </Grid>
    </Grid>
  );
};

export default Notification;
