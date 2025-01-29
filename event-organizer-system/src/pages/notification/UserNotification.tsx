import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Container, List, ListItem, ListItemText, ListItemIcon, Divider, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Header from 'components/sections/user/header/header';
import Footer from 'components/sections/user/footer/footer';

// Define types for notification and event
interface Event {
  eventID: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
}

interface Notification {
  notificationID: number;
  notificationDescription: string;
  status: string;
  dateCreated: string;
  eventID: Event;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Set type for notifications state
  const [error, setError] = useState<string | null>(null); // Error state can be string or null

  // Helper function to calculate the label based on event start date
  const getEventLabel = (startDate: string, eventStatus: string) => {
    // Skip 'Upcoming' for cancelled events
    if (eventStatus === 'Cancelled') return 'Event Cancelled';

    const now = new Date();
    const eventStartDate = new Date(startDate);
    const timeDiff = eventStartDate.getTime() - now.getTime();
    const daysUntilEvent = timeDiff / (1000 * 3600 * 24);

    if (daysUntilEvent > 2) {
      return 'Upcoming';
    } else if (daysUntilEvent <= 2 && daysUntilEvent > 0) {
      return 'Reminder: Event is near';
    } else {
      return 'Event Passed';
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>('http://localhost:8080/api/notification'); // Type for response
        // Filter notifications to only show Approved or Cancelled events
        const filteredNotifications = response.data.filter(
          (notification) => notification.eventID.status === 'Approved' || notification.eventID.status === 'Cancelled'
        );

        // Generate the notification descriptions based on the event title and status
        const updatedNotifications = filteredNotifications.map((notification) => {
          const eventStatus = notification.eventID.status;
          const eventTitle = notification.eventID.title;
          const eventLabel = getEventLabel(notification.eventID.startDate, eventStatus);

          // Custom description based on event status and label
          notification.notificationDescription = `${eventTitle} event is ${eventStatus.toLowerCase()} - ${eventLabel}`;
          return notification;
        });

        // Sort notifications by dateCreated (latest first)
        const sortedNotifications = updatedNotifications.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

        setNotifications(sortedNotifications);
      } catch (err) {
        setError('Failed to fetch notifications');
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box sx={{ m: -3.5, mt: -4 }}>
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Container sx={{ mt: 4, py: 6, maxWidth: 'lg' }}>
        <Paper sx={{ mt: 4, p: 3, borderRadius: '1px', backgroundColor: '#ffffff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
          {/* Notification List */}
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#2C3E50', letterSpacing: '1px', textAlign: 'left' }}>
            Notifications
          </Typography>
          <List>
            {/* {notifications.map((notification) => (
              <Box key={notification.notificationID}>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faBell} style={{ fontSize: '16px', color: '#3498db', paddingRight: 10 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{fontWeight: 700, textTransform: 'capitalize'}}>
                        {notification.notificationDescription}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Event Name: {notification.eventID.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{display: 'flex', justifyContent: 'end'}}>
                          {new Date(notification.dateCreated).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider sx={{ my: -0.6 }} />
              </Box>
            ))} */}




            {notifications.length === 0 ? (
               <Box sx={{height: 270, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
                No notifications available.
              </Typography>
               </Box>
            ) : (
              notifications.map((notification) => (
                <Box key={notification.notificationID}>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faBell} style={{ fontSize: '16px', color: '#3498db', paddingRight: 10 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                          {notification.notificationDescription}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            Event Name: {notification.eventID.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', justifyContent: 'end' }}>
                            {new Date(notification.dateCreated).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider sx={{ my: -0.6 }} />
                </Box>
              ))
            )}
          </List>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default NotificationPage;
