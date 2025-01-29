import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import Swal from 'sweetalert2';
import { useUserContext } from 'contexts/UserContext';
import axios from 'axios';
import emailjs from 'emailjs-com';

const infobipApiKey = import.meta.env.VITE_INFOBIP_API_KEY;
const infobipBaseUrl = import.meta.env.VITE_INFOBIP_BASE_URL;
// const infobipBaseUrl = import.meta.env.VITE_INFOBIP_BASE_URL;

interface User {
  userID: number;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string | null;
  colleges: {
    departmentID: number;
    departmentName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface Action {
  id: number;
  icon: string;
  title: string;
}

const actions: Action[] = [
  {
    id: 1,
    icon: 'ic:baseline-edit',
    title: 'Approve',
  },
  {
    id: 2,
    icon: 'ic:baseline-delete-outline',
    title: 'Reject',
  },
  {
    id: 3,
    icon: 'ic:baseline-cancel',
    title: 'Cancel',
  },
];

const ActionMenu = ({ eventId, title, organizerID, email, location, startDate, description, status }: { eventId: number, title: string, organizerID: number, email: string, location: string, startDate: string, description: string, status: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useUserContext();
  const [availableActions, setAvailableActions] = useState<Action[]>([]);
  useEffect(() => {
    if (status === 'Approved') {
      // If the event is approved, only the cancel action should be available
      setAvailableActions([
        {
          id: 3,
          icon: 'ic:baseline-cancel',
          title: 'Cancel',
        },
      ]);
    } else if (status === 'Pending') {
      // If the event is pending, both approve and reject actions should be available
      setAvailableActions(actions.slice(0, 2));
    }
  }, [status]);

  const handleActionButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionItemClick = async (actionId: number) => {
    handleActionMenuClose();
    try {
      let apiUrl = '';

      // Based on the actionId, define the API URL
      if (actionId === 1) {
        apiUrl = `http://localhost:8080/api/events/${eventId}/approve`; // Approve
      } else if (actionId === 2) {
        apiUrl = `http://localhost:8080/api/events/${eventId}/decline`; // Reject
      } else if (actionId === 3) {
        apiUrl = `http://localhost:8080/api/events/${eventId}/cancel`; // Cancel
      }

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        let successMessage = '';
        let statusMode = '';
        
        if (actionId === 1) {
          successMessage = 'Event approved successfully!';
          statusMode = 'Approved';
        } else if (actionId === 2) {
          successMessage = 'Event rejected successfully!';
          statusMode = 'Declined';
        } else if (actionId === 3) {
          successMessage = 'Event cancelled successfully!';
          statusMode = 'Cancelled';
        }

        // Update the status in the table and in the user's notifications
        const data = {
          notificationDescription: `Your Event ${title} has been ${statusMode.toLowerCase()}!`,
          status: statusMode,
          eventID: {
            eventID: eventId,
          },
          organizerID: {
            eventID: organizerID,
          },
        };

        if (actionId === 1) {
          // Send email only if the event is approved
          sendEmailNotification(title); // Notify organizer
          sendEmailNotificationToAll(title, startDate, location, description); // Notify all users
        }

        await axios.post(`http://localhost:8080/api/notification/${user.userID}/add`, data);

        Swal.fire({
          title: 'Success',
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Refresh the event list after successful update
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update event status',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating event status:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating event status',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const sendEmailNotification = async (eventTitle: string) => {
    try {
      const templateParams = {
        from_name: "Event Organizer - Admin",
        to_email: `${email}`, // Get the organizer's email
        event_name: eventTitle,
        event_date: startDate,
        event_time: "7:30 AM",
        event_location: location,
        university_name: "University of Eastern Philippines - UEP"
      };

      emailjs.send('service_r512kp5', 'template_50299rh', templateParams, 'hOecpI-dsytrfPtbb')
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });

    } catch (error) {
      console.error('Error fetching organizer email:', error);
    }
  };

  const sendEmailNotificationToAll = async (
    eventTitle: string,
    startDate: string,
    location: string,
    description: string
  ) => {
    try {
      const res = await axios.get<User[]>(`http://localhost:8080/api/users`);
  
      for (const user of res.data) {
        const templateParams = {
          to_email: user.email,
          user_name: user.firstName,
          from_name: `UEP - Event Coordinator`,
          event_name: eventTitle,
          event_date: startDate,
          event_time: "7:30 AM",
          event_location: location,
          event_description: description,
          school_email: "uep.edu@gmail.com",
          event_organizer_link: "www.google.com",
          school_name: "University of Eastern Philippines - UEP",
        };
  
        await emailjs
          .send("service_r512kp5", "template_k2xx7pm", templateParams, "hOecpI-dsytrfPtbb")
          .then((response) => {
            console.log(`Email sent to ${user.email}:`, response);
          })
          .catch((error) => {
            console.error(`Error sending email to ${user.email}:`, error);
          });

        // console.log(`${user.phoneNumber}`);
        
        // const response = await axios.post(
        //   'https://4e1l1n.api.infobip.com/sms/2/text/advanced',
        //   {
        //     messages: [
        //       {
        //         from: "UEP Event",
        //         destinations: [{ to: user.phoneNumber }],
        //         text: `Good day! A new event is coming in our university.`,
        //       },
        //     ],
        //   },
        //   {
        //     headers: {
        //       Authorization: `App ${infobipApiKey}`,
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
        // console.log('SMS sent successfully:', response.data);
      }

      for (const user of res.data) {
        const message = `
          Good day! A new event is coming at the University of Eastern Philippines.
          Event Title: ${eventTitle}
          Date: ${startDate}
          Time: 7:30 AM
          Location: ${location}
          Description: ${description}
  
          Stay tuned for more details and updates.
        `;
  
        // Send SMS using Infobip API
        const response = await axios.post(
          `${infobipBaseUrl}/sms/2/text/advanced`,
          {
            messages: [
              {
                from: "UEP Event",
                destinations: [{ to: user.phoneNumber }],
                text: message,
              },
            ],
          },
          {
            headers: {
              Authorization: `App ${infobipApiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log('SMS sent successfully to:', user.phoneNumber);
        console.log('Response:', response.data);
      }
    } catch (error) {
      console.error("Error fetching users or sending emails:", error);
    }
  };

  return (
    <Box pr={2}>
      <IconButton
        onClick={handleActionButtonClick}
        sx={{ p: 0.75, border: 'none', bgcolor: 'transparent !important' }}
        size="medium"
      >
        <IconifyIcon icon="solar:menu-dots-bold" color="text.primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleActionMenuClose}
        onClick={handleActionMenuClose}
        sx={{
          mt: 0.5,
          '& .MuiList-root': {
            width: 140,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableActions.map((actionItem) => (
          <MenuItem
            key={actionItem.id}
            onClick={() => handleActionItemClick(actionItem.id)}
          >
            <ListItemIcon sx={{ mr: 1, fontSize: 'h5.fontSize' }}>
              <IconifyIcon
                icon={actionItem.icon}
                color={actionItem.id === 2 ? 'error.main' : 'text.primary'}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography color={actionItem.id === 2 ? 'error.main' : 'text.primary'}>
                {actionItem.title}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ActionMenu;
