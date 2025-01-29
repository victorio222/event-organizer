import { useEffect, useState } from 'react';
import {
  Box,
  Menu,
  Divider,
  MenuItem,
  Typography,
  ButtonBase,
  ListItemIcon,
  IconButton,
  Badge,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserContext } from 'contexts/UserContext';

dayjs.extend(relativeTime);

interface Notification {
  notificationID: number;
  notificationTitle: string;
  notificationDescription: string;
  status: string;
  dateCreated: string;
}

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { user } = useUserContext();

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notification/event/${user.userID}`);

      console.log(`http://localhost:8080/api/notification/event/${user.userID}`);
      
      // Sort notifications by dateCreated in descending order
      const sortedNotifications = response.data.sort(
        (a: Notification, b: Notification) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );

      setNotifications(sortedNotifications);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Notification Button */}
      <ButtonBase
        sx={{ ml: 1 }}
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <IconButton size="large">
          <Badge badgeContent={notifications.length} color="error">
            <IconifyIcon icon="ic:outline-notifications-none" />
          </Badge>
        </IconButton>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 400,
          },
        }}
        PaperProps={{
          style: {
            maxHeight: 500, // Set max height to control the menu size
            overflowY: 'auto', // Add scroll behavior
            boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
            borderRadius: 8,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Notification Header */}
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Notifications
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Mark All as Read
          </Typography>
        </Box>

        <Divider sx={{ my: 0 }} />

        {/* Notification Items */}
        {notifications.map((notification) => (
          <MenuItem
            key={notification.notificationID}
            sx={{
              py: 1.2,
              px: 2,
              alignItems: 'flex-start',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            
            <ListItemIcon sx={{ minWidth: 40 }}>
              <IconifyIcon
                icon={notification.status === 'Approved' ? "mdi:calendar-check" : "material-symbols:event-busy-rounded"}
                style={{
                  color: '#1976d2',
                  fontSize: 24,
                }}
              />
            </ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                sx={{
                  maxWidth: 300,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {notification.status === 'Approved' ? 'Event Approved' : 'Event Declined'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
              >
                {notification.notificationDescription}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ mt: 0.5 }}
              >
                {dayjs(notification.dateCreated).fromNow()}
              </Typography>
            </Box>
          </MenuItem>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <Box p={3} py={10} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              No new notifications.
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Notification;








// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Menu,
//   Divider,
//   MenuItem,
//   Typography,
//   ButtonBase,
//   ListItemIcon,
//   IconButton,
//   Badge,
// } from '@mui/material';
// import IconifyIcon from 'components/base/IconifyIcon';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { useUserContext } from 'contexts/UserContext';

// dayjs.extend(relativeTime);

// interface Notification {
//   notificationID: number;
//   notificationTitle: string;
//   notificationDescription: string;
//   status: string;
//   dateCreated: string;
//   eventID: Event;
// }

// interface Event {
//   eventID: number;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   organizer: Organizer;
//   createdAt: string;
//   updatedAt: string;
//   status: string;
// }

// interface Organizer {
//   userID: number;
//   username: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   role: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const Notification = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [organizerUserID, setOrganizerUserID] = useState(0);
//   const [organizerData, setOrganizerData] = useState<Notification[]>([]);

//   const { user } = useUserContext();

//   useEffect(() => {
//     getNotifications();
//   }, []);

//   const getNotifications = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/notification`);

//       const notificationData = response.data;

//       // Save notifications
//       setOrganizerData(notificationData);

//       const firstOrganizerUserID = organizerData[0]?.eventID?.organizer?.userID;
//       if (firstOrganizerUserID) {
//         setOrganizerUserID(firstOrganizerUserID);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchOrganizerData = async () => {
//       if (organizerUserID) {
//         try {
//           const response = await axios.get(`http://localhost:8080/api/notification/${organizerUserID}/organizer`);
//           // setNotifications(response.data);

//           // Sort notifications by dateCreated in descending order
//           const sortedNotifications = response.data.sort(
//             (a: Notification, b: Notification) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
//           );

//           setNotifications(sortedNotifications);
//           console.log(`http://localhost:8080/api/notification/${user.userID}/organizer`);

//           console.log(response.data);
//         } catch (err) {
//           console.error("Error fetching organizer data:", err);
//         }
//       }
//     };

//     fetchOrganizerData();
//   }, [organizerUserID]);

//   const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       {/* Notification Button */}
//       <ButtonBase
//         sx={{ ml: 1 }}
//         onClick={handleProfileClick}
//         aria-controls={open ? 'account-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         disableRipple
//       >
//         <IconButton size="large">
//           <Badge badgeContent={notifications.length} color="error">
//             <IconifyIcon icon="ic:outline-notifications-none" />
//           </Badge>
//         </IconButton>
//       </ButtonBase>

//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleProfileMenuClose}
//         onClick={handleProfileMenuClose}
//         sx={{
//           mt: 1.5,
//           '& .MuiList-root': {
//             p: 0,
//             width: 400,
//           },
//         }}
//         PaperProps={{
//           style: {
//             maxHeight: 500, // Set max height to control the menu size
//             overflowY: 'auto', // Add scroll behavior
//             boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
//             borderRadius: 8,
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         {/* Notification Header */}
//         <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" fontWeight="bold" color="text.primary">
//             Notifications
//           </Typography>
//           <Typography
//             variant="caption"
//             sx={{
//               color: 'primary.main',
//               cursor: 'pointer',
//               '&:hover': { textDecoration: 'underline' },
//             }}
//           >
//             Mark All as Read
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 0 }} />

//         {/* Notification Items */}
//         {organizerData.map((notification) => (
//           <MenuItem
//             key={notification.notificationID}
//             sx={{
//               py: 1.2,
//               px: 2,
//               alignItems: 'flex-start',
//               '&:hover': { backgroundColor: 'action.hover' },
//             }}
//           >

//             <ListItemIcon sx={{ minWidth: 40 }}>
//               <IconifyIcon
//                 icon={notification.status === 'Approved' ? "mdi:calendar-check" : "material-symbols:event-busy-rounded"}
//                 style={{
//                   color: '#1976d2',
//                   fontSize: 24,
//                 }}
//               />
//             </ListItemIcon>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//               }}
//             >
//               <Typography
//                 variant="body1"
//                 fontWeight="bold"
//                 color="text.primary"
//                 sx={{
//                   maxWidth: 300,
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 {notification.status === 'Approved' ? 'Event Approved' : 'Event Declined'}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
//               >
//                 {notification.notificationDescription}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 color="text.disabled"
//                 sx={{ mt: 0.5 }}
//               >
//                 {dayjs(notification.dateCreated).fromNow()}
//               </Typography>
//             </Box>
//           </MenuItem>
//         ))}

//         {/* Empty State */}
//         {notifications.length === 0 && (
//           <Box p={3} py={10} textAlign="center">
//             <Typography variant="body2" color="text.secondary">
//               No new notifications.
//             </Typography>
//           </Box>
//         )}
//       </Menu>
//     </>
//   );
// };

// export default Notification;