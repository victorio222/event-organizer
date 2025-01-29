import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Box, Divider, Stack } from '@mui/material';
import { useUserContext } from 'contexts/UserContext';
import IconifyIcon from 'components/base/IconifyIcon';

interface Notification {
  id: number;
  notificationDescription: string;
  dateCreated: string;
}

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/notification/event/${user.userID}`); // Adjust the API endpoint
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Notifications
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading notifications...</Typography>
      ) : notifications.length === 0 ? (
        <Stack sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh'}}>
          <IconifyIcon icon={'ic:round-notifications-off'} sx={{fontSize: 230, color: '#003262', opacity: '0.6', stroke: 1}} /> <br />
          <Typography variant="body1">No notifications available.</Typography>
        </Stack>
      ) : (
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={notification.notificationDescription}
                  secondary={`Created at: ${new Date(notification.dateCreated).toLocaleString()}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationsList;
